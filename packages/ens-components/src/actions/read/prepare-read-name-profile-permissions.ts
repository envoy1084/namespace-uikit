import { err, ok, type Result } from "neverthrow";
import {
  encodeAbiParameters,
  keccak256,
  stringToHex,
  toHex,
  zeroHash,
  type Address,
  type ContractFunctionParameters,
  type Hex,
} from "viem";
import { namehash } from "viem/ens";

import type {
  ContractReadResults,
  PreparedContractRead,
  PreparedContractReadPlan,
} from "#/actions/read/contract-reads";
import type { NameProfileRecordType } from "#/components/name-profile-editor/types";
import type { EnsNetwork } from "#/data";
import { permissionedResolverAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";

const PROFILE_RECORD_ROLES: Readonly<Record<NameProfileRecordType, bigint>> = {
  abi: 1n << 16n,
  address: 1n,
  contenthash: 1n << 8n,
  data: 1n << 36n,
  interface: 1n << 20n,
  name: 1n << 24n,
  pubkey: 1n << 12n,
  text: 1n << 4n,
};

export interface NameProfilePermissionRequest {
  /** Required for fine-grained address, data, and text permissions. */
  readonly key?: string;
  readonly type: NameProfileRecordType;
}

export interface NameProfilePermissions {
  readonly name: string;
  readonly node: Hex;
  readonly permissions: Readonly<Record<string, boolean>>;
  readonly resolverAddress: Address;
}

export type PrepareNameProfilePermissionsReadError =
  | "EMPTY_PERMISSION_REQUESTS"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_PERMISSION_KEY"
  | "INVALID_RESOLVER_ADDRESS"
  | "PROFILE_PERMISSION_READ_FAILED"
  | ParseNameInputError;

export interface PrepareNameProfilePermissionsReadParameters {
  readonly account: Address;
  readonly input: string | null | undefined;
  readonly network: EnsNetwork;
  readonly requests: readonly NameProfilePermissionRequest[];
  readonly resolverAddress: Address;
}

type HasRolesRequest = ContractFunctionParameters<
  typeof permissionedResolverAbi,
  "view",
  "hasRoles",
  readonly [bigint, bigint, Address]
>;

type PreparedPermissionRead = PreparedContractRead<
  HasRolesRequest,
  boolean,
  "name-profile-permission",
  {
    readonly id: string;
  }
>;

type PermissionReadTuple = readonly [PreparedPermissionRead, ...PreparedPermissionRead[]];

export type PreparedNameProfilePermissionsRead = PreparedContractReadPlan<
  PermissionReadTuple,
  NameProfilePermissions,
  "PROFILE_PERMISSION_READ_FAILED",
  "name-profile-permissions"
>;

function profileResource(node: Hex, part: Hex): bigint {
  if (node === zeroHash && part === zeroHash) return 0n;
  return BigInt(
    keccak256(encodeAbiParameters([{ type: "bytes32" }, { type: "bytes32" }], [node, part])),
  );
}

function permissionPart(request: NameProfilePermissionRequest): Hex | undefined {
  const key = request.key?.trim();
  if (key === undefined || key.length === 0) return undefined;

  if (request.type === "address") {
    if (!/^\d+$/.test(key)) return undefined;
    return keccak256(toHex(BigInt(key), { size: 32 }));
  }

  if (request.type === "data" || request.type === "text") {
    return keccak256(stringToHex(key));
  }

  return undefined;
}

export function getNameProfilePermissionId(request: NameProfilePermissionRequest): string {
  const key = request.key?.trim();
  return `${request.type}:${key === undefined || key.length === 0 ? "*" : key}`;
}

export function canEditNameProfileRecord(
  permissions: NameProfilePermissions | undefined,
  request: NameProfilePermissionRequest,
): boolean {
  if (permissions === undefined) return false;
  return permissions.permissions[getNameProfilePermissionId(request)] ?? false;
}

/** Prepares batched EAC reads for broad and fine-grained resolver permissions. */
export function prepareNameProfilePermissionsRead(
  parameters: PrepareNameProfilePermissionsReadParameters,
): Result<PreparedNameProfilePermissionsRead, PrepareNameProfilePermissionsReadError> {
  if (!isNonZeroAddress(parameters.account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }
  if (!isNonZeroAddress(parameters.resolverAddress)) {
    return err("INVALID_RESOLVER_ADDRESS");
  }
  if (parameters.requests.length === 0) {
    return err("EMPTY_PERMISSION_REQUESTS");
  }

  const parsed = parseNameInput(parameters.input);
  if (parsed.isErr()) return err(parsed.error);

  const node = namehash(parsed.value.normalizedName);
  const nameResource = profileResource(node, zeroHash);
  const normalizedRequests: NameProfilePermissionRequest[] = [];

  for (const request of parameters.requests) {
    const key = request.key?.trim();
    if (key !== undefined && key.length > 0 && request.type === "address" && !/^\d+$/.test(key)) {
      return err("INVALID_PERMISSION_KEY");
    }
    normalizedRequests.push({
      ...(key === undefined || key.length === 0 ? {} : { key }),
      type: request.type,
    });
  }

  const readsById = new Map<string, PreparedPermissionRead>();
  const requestReadIds = new Map<string, string[]>();

  const addRead = (resource: bigint, role: bigint) => {
    const id = `${resource.toString()}:${role.toString()}`;
    if (!readsById.has(id)) {
      readsById.set(id, {
        kind: "name-profile-permission",
        metadata: { id },
        request: {
          address: parameters.resolverAddress,
          abi: permissionedResolverAbi,
          functionName: "hasRoles",
          args: [resource, role, parameters.account],
        },
      });
    }
    return id;
  };

  for (const request of normalizedRequests) {
    const permissionId = getNameProfilePermissionId(request);
    const role = PROFILE_RECORD_ROLES[request.type];
    const readIds = [addRead(nameResource, role)];
    const part = permissionPart(request);

    if (
      part !== undefined &&
      (request.type === "address" || request.type === "data" || request.type === "text")
    ) {
      readIds.push(
        addRead(profileResource(node, part), role),
        addRead(profileResource(zeroHash, part), role),
      );
    }

    requestReadIds.set(permissionId, readIds);
  }

  const reads = [...readsById.values()] as unknown as PermissionReadTuple;

  return ok({
    kind: "name-profile-permissions",
    reads,
    select: (results: ContractReadResults<PermissionReadTuple>) => {
      const values = new Map<string, boolean>();

      for (const [index, read] of reads.entries()) {
        const result = results[index];
        if (result?.status !== "success") {
          return err("PROFILE_PERMISSION_READ_FAILED");
        }
        values.set(read.metadata.id, result.result);
      }

      const permissions: Record<string, boolean> = {};
      for (const [permissionId, readIds] of requestReadIds) {
        permissions[permissionId] = readIds.some((readId) => values.get(readId) === true);
      }

      return ok({
        name: parsed.value.normalizedName,
        node,
        permissions,
        resolverAddress: parameters.resolverAddress,
      });
    },
  });
}
