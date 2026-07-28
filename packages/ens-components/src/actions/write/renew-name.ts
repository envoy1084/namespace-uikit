import { err, errAsync, ok, type Result, type ResultAsync } from "neverthrow";
import {
  encodeFunctionData,
  type Address,
  type ContractFunctionParameters,
  type Hex,
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
import { ethRegistrarAbi } from "#/data/abi";
import { isBytes32, isNonZeroAddress, isUint64Duration } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";

export type PrepareRenewNameWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_DURATION"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_REFERRER"
  | "INVALID_REGISTRAR_ADDRESS"
  | "UNSUPPORTED_NAME";

export interface PrepareRenewNameWriteParameters {
  /** Account paying for and submitting the renewal. */
  readonly account: Address;
  /** Number of seconds added to the current expiry. */
  readonly duration: bigint;
  /** Label or second-level `.eth` name to normalize and renew. */
  readonly input: string | null | undefined;
  /** ERC-20 token used to pay for renewal. */
  readonly paymentTokenAddress: Address;
  /** Optional bytes32 referral identifier. */
  readonly referrer: Hex;
  /** ENS v2 ETHRegistrar address. */
  readonly registrarAddress: Address;
}

type RenewNameRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "nonpayable",
  "renew",
  readonly [string, bigint, Address, Hex]
>;

export interface RenewNameWriteMetadata {
  readonly duration: bigint;
  readonly label: string;
  readonly paymentTokenAddress: Address;
  readonly referrer: Hex;
}

export type PreparedRenewNameWrite = PreparedContractWrite<
  RenewNameRequest,
  "renew-name",
  RenewNameWriteMetadata
>;

export type RenewNameParameters = PrepareRenewNameWriteParameters & ExecuteContractWriteParameters;
export type RenewNameReturnType = ExecuteContractWritesResult;
export type RenewNameErrorType =
  | PrepareRenewNameWriteError
  | ParseNameInputError
  | ExecuteContractWritesError;

export function prepareRenewNameWrite(
  parameters: PrepareRenewNameWriteParameters,
): Result<PreparedRenewNameWrite, PrepareRenewNameWriteError | ParseNameInputError> {
  const { account, duration, paymentTokenAddress, referrer, registrarAddress } = parameters;
  if (!isNonZeroAddress(account)) return err("INVALID_ACCOUNT_ADDRESS");
  if (!isUint64Duration(duration)) return err("INVALID_DURATION");
  if (!isNonZeroAddress(paymentTokenAddress)) {
    return err("INVALID_PAYMENT_TOKEN_ADDRESS");
  }
  if (!isNonZeroAddress(registrarAddress)) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }
  if (!isBytes32(referrer)) return err("INVALID_REFERRER");

  const parsedInput = parseNameInput(parameters.input);
  if (parsedInput.isErr()) return err(parsedInput.error);
  if (parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth") {
    return err("UNSUPPORTED_NAME");
  }

  const label = parsedInput.value.label;
  const request = {
    address: registrarAddress,
    abi: ethRegistrarAbi,
    functionName: "renew",
    args: [label, duration, paymentTokenAddress, referrer],
  } as const satisfies RenewNameRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: registrarAddress,
      value: 0n,
    },
    kind: "renew-name",
    metadata: { duration, label, paymentTokenAddress, referrer },
    request,
  });
}

/** Renews a second-level `.eth` name. */
export function renewName(
  walletClient: WalletClient,
  publicClient: PublicClient,
  parameters: RenewNameParameters,
): ResultAsync<RenewNameReturnType, RenewNameErrorType> {
  const prepared = prepareRenewNameWrite(parameters);
  if (prepared.isErr()) return errAsync(prepared.error);
  return executeContractWrite(walletClient, publicClient, prepared.value, parameters);
}
