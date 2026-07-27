import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import type { EnsNetwork } from "#/data";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { err, ok, type Result } from "neverthrow";
import {
  encodeFunctionData,
  type Address,
  type ContractFunctionParameters,
} from "viem";

import { l2ReverseRegistrarAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";
import { parseNameInput } from "#/lib/parse-name-input";

export type PrepareSetL2PrimaryNameWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_L2_REVERSE_REGISTRAR_ADDRESS"
  | ParseNameInputError;

export interface PrepareSetL2PrimaryNameWriteProps {
  /** Account whose primary name will be updated. */
  readonly account: Address;
  /** ENS name or `.eth` label to use as the primary name. */
  readonly input: string | null | undefined;
  /** Network associated with the reverse registrar. */
  readonly network: EnsNetwork;
  /** ENS L2ReverseRegistrar address. */
  readonly l2ReverseRegistrarAddress: Address;
}

type SetL2PrimaryNameRequest = ContractFunctionParameters<
  typeof l2ReverseRegistrarAbi,
  "nonpayable",
  "setName",
  readonly [string]
>;

export interface PrepareSetL2PrimaryNameWriteMetadata {
  readonly name: string;
  readonly owner: Address;
}

export type PreparedSetL2PrimaryNameWrite = PreparedContractWrite<
  SetL2PrimaryNameRequest,
  "set-l2-primary-name",
  PrepareSetL2PrimaryNameWriteMetadata
>;

/** Prepares an ENS v2 reverse-name update for the submitting account. */
export function prepareSetL2PrimaryNameWrite(
  props: PrepareSetL2PrimaryNameWriteProps,
): Result<PreparedSetL2PrimaryNameWrite, PrepareSetL2PrimaryNameWriteError> {
  const { account, input, l2ReverseRegistrarAddress } = props;

  if (!isNonZeroAddress(account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isNonZeroAddress(l2ReverseRegistrarAddress)) {
    return err("INVALID_L2_REVERSE_REGISTRAR_ADDRESS");
  }

  const parsedInput = parseNameInput(input);
  if (parsedInput.isErr()) return err(parsedInput.error);

  const name = parsedInput.value.normalizedName;
  const request = {
    address: l2ReverseRegistrarAddress,
    abi: l2ReverseRegistrarAbi,
    functionName: "setName",
    args: [name],
  } as const satisfies SetL2PrimaryNameRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: l2ReverseRegistrarAddress,
      value: 0n,
    },
    kind: "set-l2-primary-name" as const,
    metadata: { name, owner: account },
    request,
  });
}
