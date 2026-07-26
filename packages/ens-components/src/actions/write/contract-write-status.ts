import { errAsync, ResultAsync } from "neverthrow";
import { type Hex, type WalletClient } from "viem";
import { getCallsStatus, waitForCallsStatus } from "viem/actions";

export type ContractCallsStatusError =
  | "CONTRACT_CALLS_STATUS_FAILED"
  | "INVALID_CALLS_ID";

export type ContractCallsState = "FAILURE" | "PENDING" | "SUCCESS" | "UNKNOWN";

export interface ContractCallsStatus {
  readonly state: ContractCallsState;
  readonly statusCode: number;
  readonly transactionHashes: readonly Hex[];
}

export interface GetContractCallsStatusProps {
  readonly callsId: string;
}

export interface WaitForContractCallsProps extends GetContractCallsStatusProps {
  readonly timeout?: number;
}

function mapStatus(
  result: Awaited<ReturnType<typeof getCallsStatus>>,
): ContractCallsStatus {
  const state =
    result.status === "failure"
      ? "FAILURE"
      : result.status === "pending"
        ? "PENDING"
        : result.status === "success"
          ? "SUCCESS"
          : "UNKNOWN";

  return {
    state,
    statusCode: result.statusCode,
    transactionHashes:
      result.receipts?.map((receipt) => receipt.transactionHash) ?? [],
  };
}

export function getContractCallsStatus(
  walletClient: WalletClient,
  props: GetContractCallsStatusProps,
): ResultAsync<ContractCallsStatus, ContractCallsStatusError> {
  if (props.callsId.trim() === "") {
    return errAsync("INVALID_CALLS_ID");
  }

  return ResultAsync.fromPromise(
    getCallsStatus(walletClient, { id: props.callsId }),
    () => "CONTRACT_CALLS_STATUS_FAILED" as const,
  ).map(mapStatus);
}

export function waitForContractCalls(
  walletClient: WalletClient,
  props: WaitForContractCallsProps,
): ResultAsync<ContractCallsStatus, ContractCallsStatusError> {
  if (props.callsId.trim() === "") {
    return errAsync("INVALID_CALLS_ID");
  }

  return ResultAsync.fromPromise(
    waitForCallsStatus(walletClient, {
      id: props.callsId,
      throwOnFailure: false,
      ...(props.timeout === undefined ? {} : { timeout: props.timeout }),
    }),
    () => "CONTRACT_CALLS_STATUS_FAILED" as const,
  ).map(mapStatus);
}
