---
title: executeContractWrites
description: Execute one or more prepared ENS contract writes.
---

# executeContractWrites

Executes prepared writes using one transaction, an EIP-5792 atomic batch, or
an ordered transaction sequence.

## Import

```ts
import { executeContractWrites } from "ens-components/actions";
```

## Usage

```ts
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

```ts
interface ExecuteContractWritesParameters {
  calls: readonly [PreparedContractWrite, ...PreparedContractWrite[]];
  chain: Chain;
  confirmation?: "confirmed" | "submitted";
  onProgress?: (progress: ContractWriteProgress) => Promise<void> | void;
  strategy?: "atomic" | "auto" | "sequential" | "single";
  timeout?: number;
}
```

## Strategies

| Strategy     | Behavior                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `single`     | Requires exactly one prepared call.                                                                 |
| `atomic`     | Uses `wallet_sendCalls` with `forceAtomic: true`.                                                   |
| `sequential` | Confirms each dependent call before submitting the next.                                            |
| `auto`       | Uses `single` for one call, otherwise detects atomic wallet support and falls back to `sequential`. |

All calls must use the same prepared `account`. `confirmation` defaults to
`confirmed`; `submitted` returns after the final submission. Earlier calls in
a sequential execution are still confirmed before dependent calls are sent.
`timeout` applies to transaction receipt and atomic call-status waits.

The result is discriminated by `strategy`. Every confirmed strategy contains
prepared transactions and receipts. Atomic results additionally contain a
`callsId` and the wallet-reported transaction hashes.

`onProgress` reports signing, submitted, and confirmed states. Observer errors
do not change the chain result.

## Return Type

`ResultAsync<ExecuteContractWritesResult, ExecuteContractWritesError>`

The result is discriminated by `strategy` and contains submitted transactions.
Atomic results also contain `callsId` and wallet-reported transaction hashes.

## Errors

Errors are uppercase codes covering invalid composition, wallet capability
checks, submission, call-status polling, receipt confirmation, and reverts.
`TRANSACTION_REJECTED` identifies an explicit wallet rejection.
`PARTIAL_BATCH_FAILED` means at least one sequential call confirmed before a
later call failed. Confirmed progress events remain available to the caller.
Atomic batches cannot report partial completion.
