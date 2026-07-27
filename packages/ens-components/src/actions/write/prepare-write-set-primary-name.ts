import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import type { EnsNetwork } from "#/data";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { err, ok, type Result } from "neverthrow";
import {
  encodeFunctionData,
  type Address,
  type ContractFunctionParameters,
} from "viem";

import { defaultReverseRegistrarAdapterAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";
import { parseNameInput } from "#/lib/parse-name-input";

export type PrepareSetPrimaryNameWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_OWNER_ADDRESS"
  | "INVALID_REVERSE_REGISTRAR_ADDRESS"
  | ParseNameInputError;

export interface PrepareSetPrimaryNameWriteProps {
  /** Account authorized to name `owner`. */
  readonly account: Address;
  /** ENS name or `.eth` label to use as the primary name. */
  readonly input: string | null | undefined;
  /** Network associated with the reverse registrar. */
  readonly network: EnsNetwork;
  /** Address whose default primary name will be updated. */
  readonly owner: Address;
  /** ENS v2 DefaultReverseRegistrarAdapter address. */
  readonly reverseRegistrarAddress: Address;
}

type SetPrimaryNameRequest = ContractFunctionParameters<
  typeof defaultReverseRegistrarAdapterAbi,
  "nonpayable",
  "setName",
  readonly [Address, string]
>;

export interface PrepareSetPrimaryNameWriteMetadata {
  readonly name: string;
  readonly owner: Address;
}

export type PreparedSetPrimaryNameWrite = PreparedContractWrite<
  SetPrimaryNameRequest,
  "set-primary-name",
  PrepareSetPrimaryNameWriteMetadata
>;

/** Prepares an ENS v2 default reverse-name update. */
export function prepareSetPrimaryNameWrite(
  props: PrepareSetPrimaryNameWriteProps,
): Result<PreparedSetPrimaryNameWrite, PrepareSetPrimaryNameWriteError> {
  const { account, input, owner, reverseRegistrarAddress } = props;

  if (!isNonZeroAddress(account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isNonZeroAddress(owner)) {
    return err("INVALID_OWNER_ADDRESS");
  }

  if (!isNonZeroAddress(reverseRegistrarAddress)) {
    return err("INVALID_REVERSE_REGISTRAR_ADDRESS");
  }

  const parsedInput = parseNameInput(input);
  if (parsedInput.isErr()) return err(parsedInput.error);

  const name = parsedInput.value.normalizedName;
  const request = {
    address: reverseRegistrarAddress,
    abi: defaultReverseRegistrarAdapterAbi,
    functionName: "setName",
    args: [owner, name],
  } as const satisfies SetPrimaryNameRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: reverseRegistrarAddress,
      value: 0n,
    },
    kind: "set-primary-name" as const,
    metadata: { name, owner },
    request,
  });
}
