import { err, ok, type Result } from "neverthrow";
import {
  encodeFunctionData,
  encodePacked,
  type Address,
  type ContractFunctionParameters,
  type Hex,
} from "viem";
import { namehash } from "viem/ens";

import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import type { EnsNetwork } from "#/data";
import { permissionedResolverAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";

/** SLIP-44 coin type for Ethereum. */
export const ETH_COIN_TYPE = 60n;

export type PrepareSetAddressRecordWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_OWNER_ADDRESS"
  | "INVALID_RESOLVER_ADDRESS"
  | ParseNameInputError;

export interface PrepareSetAddressRecordWriteParameters {
  /** Account authorized to update the resolver. */
  readonly account: Address;
  /** ENS name or `.eth` label whose address record will be updated. */
  readonly input: string | null | undefined;
  /** Network associated with the resolver. */
  readonly network: EnsNetwork;
  /** Address that the ENS name should resolve to. */
  readonly owner: Address;
  /** Resolver assigned to the registered name. */
  readonly resolverAddress: Address;
}

type SetAddressRecordRequest = ContractFunctionParameters<
  typeof permissionedResolverAbi,
  "nonpayable",
  "setAddr",
  readonly [Hex, bigint, Hex]
>;

export interface SetAddressRecordWriteMetadata {
  readonly coinType: bigint;
  readonly name: string;
  readonly node: Hex;
  readonly owner: Address;
}

export type PreparedSetAddressRecordWrite = PreparedContractWrite<
  SetAddressRecordRequest,
  "set-address-record",
  SetAddressRecordWriteMetadata
>;

/** Prepares the Ethereum forward address record required for L1 reverse verification. */
export function prepareSetAddressRecordWrite(
  parameters: PrepareSetAddressRecordWriteParameters,
): Result<PreparedSetAddressRecordWrite, PrepareSetAddressRecordWriteError> {
  const { account, input, owner, resolverAddress } = parameters;

  if (!isNonZeroAddress(account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isNonZeroAddress(owner)) {
    return err("INVALID_OWNER_ADDRESS");
  }

  if (!isNonZeroAddress(resolverAddress)) {
    return err("INVALID_RESOLVER_ADDRESS");
  }

  const parsedInput = parseNameInput(input);
  if (parsedInput.isErr()) return err(parsedInput.error);

  const name = parsedInput.value.normalizedName;
  const node = namehash(name);
  const addressBytes = encodePacked(["address"], [owner]);
  const request = {
    address: resolverAddress,
    abi: permissionedResolverAbi,
    functionName: "setAddr",
    args: [node, ETH_COIN_TYPE, addressBytes],
  } as const satisfies SetAddressRecordRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: resolverAddress,
      value: 0n,
    },
    kind: "set-address-record" as const,
    metadata: {
      coinType: ETH_COIN_TYPE,
      name,
      node,
      owner,
    },
    request,
  });
}
