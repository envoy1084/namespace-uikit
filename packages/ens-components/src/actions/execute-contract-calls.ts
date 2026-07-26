import type {
  ContractCallProgress,
  ContractCallStrategy,
  ExecuteContractCallsResult,
  PreparedContractWrite,
  ResolvedContractCallStrategy,
  SubmittedContractTransaction,
} from "#/actions/contract-calls";

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

import { waitForContractCalls } from "#/actions/contract-call-status";
import { supportsAtomicBatchCalls } from "#/actions/supports-atomic-batch-calls";

export type ExecuteContractCallsError =
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

export interface ExecuteContractCallsProps {
  readonly calls: readonly [PreparedContractWrite, ...PreparedContractWrite[]];
  readonly chain: Chain;
  /**
   * `confirmed` waits for receipts. `submitted` returns after the wallet
   * accepts the final transaction or atomic batch.
   */
  readonly confirmation?: "confirmed" | "submitted";
  readonly onProgress?: (
    progress: ContractCallProgress,
  ) => Promise<void> | void;
  readonly strategy?: ContractCallStrategy;
  readonly timeout?: number;
}

async function notify(
  callback: ExecuteContractCallsProps["onProgress"],
  progress: ContractCallProgress,
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
): Result<void, ExecuteContractCallsError> {
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
): Promise<Result<TransactionReceipt, ExecuteContractCallsError>> {
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
  calls: ExecuteContractCallsProps["calls"],
  chain: Chain,
  strategy: ContractCallStrategy,
): Promise<Result<ResolvedContractCallStrategy, ExecuteContractCallsError>> {
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
  props: ExecuteContractCallsProps,
  strategy: "sequential" | "single",
): Promise<Result<ExecuteContractCallsResult, ExecuteContractCallsError>> {
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
  props: ExecuteContractCallsProps,
): Promise<Result<ExecuteContractCallsResult, ExecuteContractCallsError>> {
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
      transactionHashes: [],
    });
  }

  const status = await waitForContractCalls(walletClient, {
    callsId,
    ...(props.timeout === undefined ? {} : { timeout: props.timeout }),
  });
  if (status.isErr()) return err(status.error);
  if (status.value.state !== "SUCCESS") return err("ATOMIC_BATCH_FAILED");

  await notify(props.onProgress, {
    callsId,
    prepared: props.calls,
    state: "confirmed",
    strategy: "atomic",
    transactionHashes: status.value.transactionHashes,
  });

  return ok({
    callsId,
    status: "confirmed",
    strategy: "atomic",
    transactionHashes: status.value.transactionHashes,
  });
}

/**
 * Executes prepared writes as one transaction, an atomic EIP-5792 batch, or
 * an ordered sequence. Sequential calls are confirmed before their dependent
 * successor is submitted.
 */
export function executeContractCalls(
  walletClient: WalletClient,
  publicClient: PublicClient,
  props: ExecuteContractCallsProps,
): ResultAsync<ExecuteContractCallsResult, ExecuteContractCallsError> {
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
        ? executeAtomic(walletClient, props)
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
