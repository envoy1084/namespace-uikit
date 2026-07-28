import { err, ok, ResultAsync } from "neverthrow";
import type { Hex, PublicClient, TransactionReceipt } from "viem";

export type TransactionReceiptError = "TRANSACTION_CONFIRMATION_FAILED" | "TRANSACTION_REVERTED";

export interface WaitForSuccessfulTransactionReceiptParameters {
  transactionHash: Hex;
  timeout?: number;
}

export function waitForSuccessfulTransactionReceipt(
  publicClient: PublicClient,
  parameters: WaitForSuccessfulTransactionReceiptParameters,
): ResultAsync<TransactionReceipt, TransactionReceiptError> {
  return ResultAsync.fromPromise(
    publicClient.waitForTransactionReceipt({
      hash: parameters.transactionHash,
      ...(parameters.timeout === undefined ? {} : { timeout: parameters.timeout }),
    }),
    () => "TRANSACTION_CONFIRMATION_FAILED" as const,
  ).andThen((receipt) =>
    receipt.status === "success" ? ok(receipt) : err("TRANSACTION_REVERTED"),
  );
}

export async function getTransactionTimestamp(
  publicClient: PublicClient,
  receipt: TransactionReceipt,
  fallback = Date.now(),
): Promise<number> {
  try {
    const block = await publicClient.getBlock({
      blockNumber: receipt.blockNumber,
    });
    return Number(block.timestamp) * 1_000;
  } catch {
    return fallback;
  }
}
