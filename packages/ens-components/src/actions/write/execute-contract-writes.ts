import type {
  ContractWriteProgress,
  ContractWriteStrategy,
  ExecuteContractWritesResult,
  PreparedContractWrite,
  ResolvedContractWriteStrategy,
  SubmittedContractTransaction,
} from "#/actions/write/contract-writes";

import { err, errAsync, ok, ResultAsync, type Result } from "neverthrow";
import {
  isAddress,
  isAddressEqual,
  isHex,
  zeroAddress,
  type Chain,
  type PublicClient,
  type TransactionReceipt,
  type WalletClient,
} from "viem";
import { sendCalls } from "viem/actions";

import { waitForContractCalls } from "#/actions/write/contract-write-status";
import { supportsAtomicBatchCalls } from "#/actions/write/wallet-capabilities";

export type ExecuteContractWritesError =
  | "ATOMIC_BATCH_FAILED"
  | "CONTRACT_CALLS_STATUS_FAILED"
  | "CONTRACT_WRITE_FAILED"
  | "EMPTY_CALLS"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_CALLS_ID"
  | "INVALID_CHAIN_ID"
  | "INVALID_CONTRACT_CALL"
  | "MISMATCHED_ACCOUNTS"
  | "SINGLE_CALL_REQUIRED"
  | "TRANSACTION_CONFIRMATION_FAILED"
  | "TRANSACTION_REVERTED";

export interface ExecuteContractWritesProps {
  readonly calls: readonly [PreparedContractWrite, ...PreparedContractWrite[]];
  readonly chain: Chain;
  /**
   * `confirmed` waits for receipts. `submitted` returns after the wallet
   * accepts the final transaction or atomic batch.
   */
  readonly confirmation?: "confirmed" | "submitted";
  readonly onProgress?: (
    progress: ContractWriteProgress,
  ) => Promise<void> | void;
  readonly strategy?: ContractWriteStrategy;
  readonly timeout?: number;
}

async function notify(
  callback: ExecuteContractWritesProps["onProgress"],
  progress: ContractWriteProgress,
): Promise<void> {
  try {
    await callback?.(progress);
  } catch {
    // Progress observers must never turn a submitted transaction into a
    // reported submission failure.
  }
}

function validateCalls(
  calls: readonly PreparedContractWrite[],
): Result<void, ExecuteContractWritesError> {
  const first = calls[0];
  if (first === undefined) return err("EMPTY_CALLS");
  if (!isAddress(first.account) || first.account === zeroAddress) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }
  if (
    calls.some(
      (prepared) =>
        !isAddress(prepared.account) || prepared.account === zeroAddress,
    )
  ) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }
  if (
    calls.some(
      (prepared) =>
        !isAddress(prepared.call.to) ||
        prepared.call.to === zeroAddress ||
        !isHex(prepared.call.data) ||
        prepared.call.value < 0n,
    )
  ) {
    return err("INVALID_CONTRACT_CALL");
  }

  return calls.every((prepared) =>
    isAddressEqual(prepared.account, first.account),
  )
    ? ok(undefined)
    : err("MISMATCHED_ACCOUNTS");
}

async function waitForReceipt(
  publicClient: PublicClient,
  transactionHash: `0x${string}`,
  timeout?: number,
): Promise<Result<TransactionReceipt, ExecuteContractWritesError>> {
  try {
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: transactionHash,
      ...(timeout === undefined ? {} : { timeout }),
    });

    return receipt.status === "success"
      ? ok(receipt)
      : err("TRANSACTION_REVERTED");
  } catch {
    return err("TRANSACTION_CONFIRMATION_FAILED");
  }
}

async function resolveStrategy(
  walletClient: WalletClient,
  calls: ExecuteContractWritesProps["calls"],
  chain: Chain,
  strategy: ContractWriteStrategy,
): Promise<Result<ResolvedContractWriteStrategy, ExecuteContractWritesError>> {
  if (strategy === "single") {
    return calls.length === 1 ? ok("single") : err("SINGLE_CALL_REQUIRED");
  }

  if (strategy !== "auto") return ok(strategy);
  if (calls.length === 1) return ok("single");

  const capability = await supportsAtomicBatchCalls(walletClient, {
    account: calls[0].account,
    chainId: chain.id,
  });

  return ok(capability.isOk() && capability.value ? "atomic" : "sequential");
}

async function executeTransactions(
  walletClient: WalletClient,
  publicClient: PublicClient,
  props: ExecuteContractWritesProps,
  strategy: "sequential" | "single",
): Promise<Result<ExecuteContractWritesResult, ExecuteContractWritesError>> {
  const transactions: SubmittedContractTransaction[] = [];
  const confirmation = props.confirmation ?? "confirmed";

  // Calls in a sequential strategy may depend on state produced by the
  // previous receipt, so parallel submission would change their semantics.
  // oxlint-disable no-await-in-loop
  for (const [callIndex, prepared] of props.calls.entries()) {
    await notify(props.onProgress, {
      callIndex,
      prepared,
      state: "signing",
      strategy,
    });

    let transactionHash: `0x${string}`;
    try {
      transactionHash = await walletClient.sendTransaction({
        account: prepared.account,
        chain: props.chain,
        ...prepared.call,
      });
    } catch {
      return err("CONTRACT_WRITE_FAILED");
    }

    await notify(props.onProgress, {
      callIndex,
      prepared,
      state: "submitted",
      strategy,
      transactionHash,
    });

    const mustConfirm =
      confirmation === "confirmed" || callIndex < props.calls.length - 1;
    if (!mustConfirm) {
      transactions.push({ prepared, transactionHash });
      continue;
    }

    const receipt = await waitForReceipt(
      publicClient,
      transactionHash,
      props.timeout,
    );
    if (receipt.isErr()) return err(receipt.error);

    transactions.push({
      prepared,
      receipt: receipt.value,
      transactionHash,
    });
    await notify(props.onProgress, {
      callIndex,
      prepared,
      receipt: receipt.value,
      state: "confirmed",
      strategy,
      transactionHash,
    });
  }
  // oxlint-enable no-await-in-loop

  return ok({
    status: confirmation,
    strategy,
    transactions,
  });
}

async function executeAtomic(
  walletClient: WalletClient,
  publicClient: PublicClient,
  props: ExecuteContractWritesProps,
): Promise<Result<ExecuteContractWritesResult, ExecuteContractWritesError>> {
  await notify(props.onProgress, {
    callIndex: 0,
    prepared: props.calls[0],
    state: "signing",
    strategy: "atomic",
  });

  let callsId: string;
  try {
    const result = await sendCalls(walletClient, {
      account: props.calls[0].account,
      calls: props.calls.map(({ call }) => call),
      chain: props.chain,
      forceAtomic: true,
    });
    callsId = result.id;
  } catch {
    return err("ATOMIC_BATCH_FAILED");
  }

  await notify(props.onProgress, {
    callsId,
    prepared: props.calls,
    state: "submitted",
    strategy: "atomic",
  });

  if ((props.confirmation ?? "confirmed") === "submitted") {
    return ok({
      callsId,
      status: "submitted",
      strategy: "atomic",
      transactions: [],
      transactionHashes: [],
    });
  }

  const status = await waitForContractCalls(walletClient, {
    callsId,
    ...(props.timeout === undefined ? {} : { timeout: props.timeout }),
  });
  if (status.isErr()) return err(status.error);
  if (status.value.state !== "SUCCESS") return err("ATOMIC_BATCH_FAILED");

  const transactionHashes = status.value.transactionHashes;
  if (transactionHashes.length === 0) {
    return err("TRANSACTION_CONFIRMATION_FAILED");
  }

  const receipts = await Promise.all(
    transactionHashes.map((transactionHash) =>
      waitForReceipt(publicClient, transactionHash, props.timeout),
    ),
  );
  const confirmedReceipts: TransactionReceipt[] = [];
  for (const receipt of receipts) {
    if (receipt.isErr()) return err(receipt.error);
    confirmedReceipts.push(receipt.value);
  }
  const fallbackReceipt = confirmedReceipts.at(-1);
  const fallbackTransactionHash = transactionHashes.at(-1);
  if (fallbackReceipt === undefined || fallbackTransactionHash === undefined) {
    return err("TRANSACTION_CONFIRMATION_FAILED");
  }

  const transactions = props.calls.map((prepared, callIndex) => {
    const transactionIndex =
      transactionHashes.length === 1
        ? 0
        : Math.min(callIndex, transactionHashes.length - 1);

    return {
      prepared,
      receipt: confirmedReceipts[transactionIndex] ?? fallbackReceipt,
      transactionHash:
        transactionHashes[transactionIndex] ?? fallbackTransactionHash,
    };
  });

  await notify(props.onProgress, {
    callsId,
    prepared: props.calls,
    state: "confirmed",
    strategy: "atomic",
    transactions,
    transactionHashes,
  });

  return ok({
    callsId,
    status: "confirmed",
    strategy: "atomic",
    transactions,
    transactionHashes,
  });
}

/**
 * Executes prepared writes as one transaction, an atomic EIP-5792 batch, or
 * an ordered sequence. Sequential calls are confirmed before their dependent
 * successor is submitted.
 */
export function executeContractWrites(
  walletClient: WalletClient,
  publicClient: PublicClient,
  props: ExecuteContractWritesProps,
): ResultAsync<ExecuteContractWritesResult, ExecuteContractWritesError> {
  const validation = validateCalls(props.calls);
  if (validation.isErr()) return errAsync(validation.error);
  if (!Number.isSafeInteger(props.chain.id) || props.chain.id <= 0) {
    return errAsync("INVALID_CHAIN_ID");
  }

  return ResultAsync.fromSafePromise(
    resolveStrategy(
      walletClient,
      props.calls,
      props.chain,
      props.strategy ?? "auto",
    ),
  ).andThen((strategy) => {
    if (strategy.isErr()) return errAsync(strategy.error);

    return ResultAsync.fromSafePromise(
      strategy.value === "atomic"
        ? executeAtomic(walletClient, publicClient, props)
        : executeTransactions(
            walletClient,
            publicClient,
            props,
            strategy.value,
          ),
    ).andThen((result) =>
      result.isErr() ? err(result.error) : ok(result.value),
    );
  });
}
