import { err, errAsync, ok, type Result, type ResultAsync } from "neverthrow";
import {
  encodeFunctionData,
  type Address,
  type ContractFunctionParameters,
  type PublicClient,
  type WalletClient,
} from "viem";

import type {
  ExecuteContractWritesResult,
  PreparedContractWrite,
} from "#/actions/write/contract-writes";
import {
  executeContractWrite,
  type ExecuteContractWriteParameters,
  type ExecuteContractWritesError,
} from "#/actions/write/execute-contract-writes";
import { l1ReverseRegistrarAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";

export type PrepareSetL1PrimaryNameWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_L1_REVERSE_REGISTRAR_ADDRESS"
  | ParseNameInputError;

export interface PrepareSetL1PrimaryNameWriteParameters {
  /** Account whose primary name will be updated. */
  readonly account: Address;
  /** ENS name or `.eth` label to use as the primary name. */
  readonly input: string | null | undefined;
  /** ENS L1 ReverseRegistrar address. */
  readonly l1ReverseRegistrarAddress: Address;
}

type SetL1PrimaryNameRequest = ContractFunctionParameters<
  typeof l1ReverseRegistrarAbi,
  "nonpayable",
  "setName",
  readonly [string]
>;

export interface SetL1PrimaryNameWriteMetadata {
  readonly name: string;
  readonly owner: Address;
}

export type PreparedSetL1PrimaryNameWrite = PreparedContractWrite<
  SetL1PrimaryNameRequest,
  "set-l1-primary-name",
  SetL1PrimaryNameWriteMetadata
>;

export type SetL1PrimaryNameParameters = PrepareSetL1PrimaryNameWriteParameters &
  ExecuteContractWriteParameters;
export type SetL1PrimaryNameReturnType = ExecuteContractWritesResult;
export type SetL1PrimaryNameErrorType =
  | PrepareSetL1PrimaryNameWriteError
  | ExecuteContractWritesError;

/** Prepares the registry-backed L1 reverse-name update for the submitting account. */
export function prepareSetL1PrimaryNameWrite(
  parameters: PrepareSetL1PrimaryNameWriteParameters,
): Result<PreparedSetL1PrimaryNameWrite, PrepareSetL1PrimaryNameWriteError> {
  const { account, input, l1ReverseRegistrarAddress } = parameters;

  if (!isNonZeroAddress(account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isNonZeroAddress(l1ReverseRegistrarAddress)) {
    return err("INVALID_L1_REVERSE_REGISTRAR_ADDRESS");
  }

  const parsedInput = parseNameInput(input);
  if (parsedInput.isErr()) return err(parsedInput.error);

  const name = parsedInput.value.normalizedName;
  const request = {
    address: l1ReverseRegistrarAddress,
    abi: l1ReverseRegistrarAbi,
    functionName: "setName",
    args: [name],
  } as const satisfies SetL1PrimaryNameRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: l1ReverseRegistrarAddress,
      value: 0n,
    },
    kind: "set-l1-primary-name" as const,
    metadata: { name, owner: account },
    request,
  });
}

/** Sets an account's L1 reverse name. */
export function setL1PrimaryName(
  walletClient: WalletClient,
  publicClient: PublicClient,
  parameters: SetL1PrimaryNameParameters,
): ResultAsync<SetL1PrimaryNameReturnType, SetL1PrimaryNameErrorType> {
  const prepared = prepareSetL1PrimaryNameWrite(parameters);
  if (prepared.isErr()) return errAsync(prepared.error);
  return executeContractWrite(walletClient, publicClient, prepared.value, parameters);
}
