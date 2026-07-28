import { getCoderByCoinType } from "@ensdomains/address-encoder";
import { encode as encodeContentHash, type Codec } from "@ensdomains/content-hash";
import { errAsync, ok, ResultAsync } from "neverthrow";
import {
  encodeFunctionData,
  toHex,
  zeroAddress,
  zeroHash,
  type Address,
  type ContractFunctionParameters,
  type Hex,
  type PublicClient,
} from "viem";
import { namehash } from "viem/ens";

import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import type { NameProfileRecordChange } from "#/components/name-profile-editor/types";
import { permissionedResolverAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";

export type PrepareNameProfileRecordsWriteError =
  | "EMPTY_PROFILE_CHANGES"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_PROFILE_RECORDS"
  | "INVALID_RESOLVER_ADDRESS"
  | "PROFILE_UPDATE_SIMULATION_FAILED"
  | ParseNameInputError;

export interface PrepareNameProfileRecordsWriteParameters {
  readonly account: Address;
  readonly changes: readonly NameProfileRecordChange[];
  readonly input: string | null | undefined;
  readonly resolverAddress: Address;
}

type ProfileRecordsRequest = ContractFunctionParameters<
  typeof permissionedResolverAbi,
  "nonpayable",
  "multicallWithNodeCheck",
  readonly [Hex, readonly Hex[]]
>;

export interface NameProfileRecordsWriteMetadata {
  readonly changes: readonly NameProfileRecordChange[];
  readonly name: string;
  readonly node: Hex;
  readonly resolverAddress: Address;
}

export type PreparedNameProfileRecordsWrite = PreparedContractWrite<
  ProfileRecordsRequest,
  "update-name-profile-records",
  NameProfileRecordsWriteMetadata
>;

function contenthashBytes(value: string | null): Hex {
  if (value === null || value.length === 0) return "0x";
  const separator = value.indexOf("://");
  if (separator <= 0) throw new Error("Invalid contenthash");
  const codec = value.slice(0, separator) as Codec;
  const content = value.slice(separator + 3);
  const encoded = encodeContentHash(codec, content);
  return (encoded.startsWith("0x") ? encoded : `0x${encoded}`) as Hex;
}

function addressBytes(coinType: string, value: string | null): Hex {
  if (value === null || value.length === 0) return "0x";
  const numericCoinType = Number(BigInt(coinType));
  const coder = getCoderByCoinType(numericCoinType);
  return toHex(coder.decode(value));
}

function hexOrEmpty(value: string | null): Hex {
  return (value ?? "0x") as Hex;
}

function encodeProfileChange(node: Hex, change: NameProfileRecordChange): Hex {
  if (change.type === "abi") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "setABI",
      args: [node, BigInt(change.contentType), hexOrEmpty(change.value)],
    });
  }
  if (change.type === "address") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "setAddr",
      args: [node, BigInt(change.coinType), addressBytes(change.coinType, change.value)],
    });
  }
  if (change.type === "contenthash") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "setContenthash",
      args: [node, contenthashBytes(change.value)],
    });
  }
  if (change.type === "data") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "setData",
      args: [node, change.key, hexOrEmpty(change.value)],
    });
  }
  if (change.type === "interface") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "setInterface",
      args: [node, change.interfaceId as Hex, (change.value ?? zeroAddress) as Address],
    });
  }
  if (change.type === "name") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "setName",
      args: [node, change.value ?? ""],
    });
  }
  if (change.type === "pubkey") {
    return encodeFunctionData({
      abi: permissionedResolverAbi,
      functionName: "setPubkey",
      args: [node, (change.value?.x ?? zeroHash) as Hex, (change.value?.y ?? zeroHash) as Hex],
    });
  }

  return encodeFunctionData({
    abi: permissionedResolverAbi,
    functionName: "setText",
    args: [node, change.key, change.value ?? ""],
  });
}

/**
 * Encodes all profile changes into one atomic PermissionedResolver multicall
 * and simulates the exact transaction from the connected account.
 */
export function prepareNameProfileRecordsWrite(
  publicClient: PublicClient,
  parameters: PrepareNameProfileRecordsWriteParameters,
): ResultAsync<PreparedNameProfileRecordsWrite, PrepareNameProfileRecordsWriteError> {
  if (!isNonZeroAddress(parameters.account)) {
    return errAsync("INVALID_ACCOUNT_ADDRESS");
  }
  if (!isNonZeroAddress(parameters.resolverAddress)) {
    return errAsync("INVALID_RESOLVER_ADDRESS");
  }
  if (parameters.changes.length === 0) {
    return errAsync("EMPTY_PROFILE_CHANGES");
  }

  const parsed = parseNameInput(parameters.input);
  if (parsed.isErr()) return errAsync(parsed.error);

  const node = namehash(parsed.value.normalizedName);
  let calls: readonly Hex[];
  try {
    calls = parameters.changes.map((change) => encodeProfileChange(node, change));
  } catch {
    return errAsync("INVALID_PROFILE_RECORDS");
  }

  const request = {
    address: parameters.resolverAddress,
    abi: permissionedResolverAbi,
    functionName: "multicallWithNodeCheck",
    args: [node, calls],
  } as const satisfies ProfileRecordsRequest;

  return ResultAsync.fromPromise(
    publicClient.simulateContract({
      account: parameters.account,
      ...request,
    }),
    () => "PROFILE_UPDATE_SIMULATION_FAILED" as const,
  ).andThen(() =>
    ok({
      account: parameters.account,
      call: {
        data: encodeFunctionData(request),
        to: parameters.resolverAddress,
        value: 0n,
      },
      kind: "update-name-profile-records" as const,
      metadata: {
        changes: parameters.changes,
        name: parsed.value.normalizedName,
        node,
        resolverAddress: parameters.resolverAddress,
      },
      request,
    }),
  );
}
