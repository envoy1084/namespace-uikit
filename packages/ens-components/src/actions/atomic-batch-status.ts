import { errAsync, ResultAsync } from "neverthrow";
import { type Hex, type WalletClient } from "viem";
import { getCallsStatus, waitForCallsStatus } from "viem/actions";

export type AtomicBatchStatusError =
  | "ATOMIC_BATCH_STATUS_FAILED"
  | "INVALID_CALLS_ID";

export type AtomicBatchState = "FAILURE" | "PENDING" | "SUCCESS" | "UNKNOWN";

export interface AtomicBatchStatus {
  readonly state: AtomicBatchState;
  readonly statusCode: number;
  readonly transactionHashes: readonly Hex[];
}

export interface GetAtomicBatchStatusProps {
  readonly callsId: string;
}

export interface WaitForAtomicBatchProps extends GetAtomicBatchStatusProps {
  readonly timeout?: number;
}

function mapStatus(
  result: Awaited<ReturnType<typeof getCallsStatus>>,
): AtomicBatchStatus {
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

export function getAtomicBatchStatus(
  walletClient: WalletClient,
  props: GetAtomicBatchStatusProps,
): ResultAsync<AtomicBatchStatus, AtomicBatchStatusError> {
  if (props.callsId.trim() === "") {
    return errAsync("INVALID_CALLS_ID");
  }

  return ResultAsync.fromPromise(
    getCallsStatus(walletClient, { id: props.callsId }),
    () => "ATOMIC_BATCH_STATUS_FAILED" as const,
  ).map(mapStatus);
}

export function waitForAtomicBatch(
  walletClient: WalletClient,
  props: WaitForAtomicBatchProps,
): ResultAsync<AtomicBatchStatus, AtomicBatchStatusError> {
  if (props.callsId.trim() === "") {
    return errAsync("INVALID_CALLS_ID");
  }

  return ResultAsync.fromPromise(
    waitForCallsStatus(walletClient, {
      id: props.callsId,
      throwOnFailure: false,
      ...(props.timeout === undefined ? {} : { timeout: props.timeout }),
    }),
    () => "ATOMIC_BATCH_STATUS_FAILED" as const,
  ).map(mapStatus);
}
