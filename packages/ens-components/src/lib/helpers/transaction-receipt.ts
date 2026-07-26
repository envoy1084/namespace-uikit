import type { Hex, PublicClient, TransactionReceipt } from "viem";

import { err, ok, ResultAsync } from "neverthrow";

export type TransactionReceiptError =
  | "TRANSACTION_CONFIRMATION_FAILED"
  | "TRANSACTION_REVERTED";

export interface WaitForSuccessfulTransactionReceiptProps {
  transactionHash: Hex;
  timeout?: number;
}

export function waitForSuccessfulTransactionReceipt(
  publicClient: PublicClient,
  props: WaitForSuccessfulTransactionReceiptProps,
): ResultAsync<TransactionReceipt, TransactionReceiptError> {
  return ResultAsync.fromPromise(
    publicClient.waitForTransactionReceipt({
      hash: props.transactionHash,
      ...(props.timeout === undefined ? {} : { timeout: props.timeout }),
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
