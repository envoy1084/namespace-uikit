---
title: executeContractWrites
description: Execute one or more prepared ENS contract writes.
---

# executeContractWrites

Executes prepared writes using one transaction, an EIP-5792 atomic batch, or
an ordered transaction sequence.

## Import

```ts [import.ts]
import { executeContractWrite, executeContractWrites } from "ens-components/actions";
```

## Usage

```ts [execute.ts]
const result = await executeContractWrites(walletClient, publicClient, {
  calls: [resolverDeployment, commitment],
  chain,
  confirmation: "confirmed",
  strategy: "auto",
  onProgress(progress) {
    // Persist submitted transaction hashes or callsId here.
  },
});
```

## Parameters

### walletClient

`WalletClient`

The Viem wallet client used for capability checks and submission.

### publicClient

`PublicClient`

The Viem public client used for simulation and confirmation.

### calls

`readonly [PreparedContractWrite, ...PreparedContractWrite[]]`

One or more calls in dependency order. Every call must use the same account.

### chain

`Chain`

The chain used for wallet submission and confirmation.

### confirmation

`"confirmed" | "submitted" | undefined`

Defaults to `"confirmed"`. The submitted mode returns after final submission.

### onProgress

`(progress: ContractWriteProgress) => Promise<void> | void`

Receives signing, submitted, and confirmed progress. Observer errors do not
change the chain result.

### strategy

`"atomic" | "auto" | "sequential" | "single" | undefined`

Defaults to `"auto"`.

### timeout

`number | undefined`

Maximum wait time in milliseconds for receipts and atomic call status.

`executeContractWrite` accepts one `PreparedContractWrite` plus the same
parameters without `calls` and `strategy`.

## Strategies

| Strategy     | Behavior                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `single`     | Requires exactly one prepared call.                                                                 |
| `atomic`     | Uses `wallet_sendCalls` with `forceAtomic: true`.                                                   |
| `sequential` | Confirms each dependent call before submitting the next.                                            |
| `auto`       | Uses `single` for one call, otherwise detects atomic wallet support and falls back to `sequential`. |

## Return Type

`ResultAsync<ExecuteContractWritesResult, ExecuteContractWritesError>`

The result is discriminated by `strategy` and contains submitted transactions.
Atomic results also contain `callsId` and wallet-reported transaction hashes.

## Error

Errors are uppercase codes covering invalid composition, wallet capability
checks, submission, call-status polling, receipt confirmation, and reverts.
`TRANSACTION_REJECTED` identifies an explicit wallet rejection.
`PARTIAL_BATCH_FAILED` means at least one sequential call confirmed before a
later call failed. Confirmed progress events remain available to the caller.
Atomic batches cannot report partial completion.

## executeContractWrite

Use `executeContractWrite` for exactly one `PreparedContractWrite`. It accepts
the same execution options without `calls` and `strategy`.

See [Batching](/docs/guides/batching) for composition patterns and strategy
guidance.
