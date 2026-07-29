---
title: Batching
description: Batch prepared ENS reads and writes with typed executors.
---

# Batching

Prepare actions validate input and return typed plans without accessing a
network or opening a wallet. Executors run those plans as grouped reads or
ordered writes.

## Read batching

Use a prepared read plan with `executeContractReads`. Multi-read domain actions
already use this pattern internally.

```ts [registration-price.ts]
import { executeContractReads, prepareNameRegistrationPriceRead } from "ens-components/actions";

const prepared = prepareNameRegistrationPriceRead({
  duration: 31_536_000n,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isErr()) throw prepared.error;

const price = await executeContractReads(publicClient, prepared.value);
```

`executeContractReads` sends the plan through Viem Multicall and applies its
typed selector to the ordered results.

:::note[CCIP Read]
Use `executeContractReadsIndividually` for Universal Resolver plans whose
requests must each preserve an independent CCIP Read flow.
:::

## Write batching

Prepare each write, keep dependency order, and pass the calls to
`executeContractWrites`.

```ts [register-name.ts]
import {
  executeContractWrites,
  preparePaymentTokenApprovalWrite,
  prepareRegisterNameWrite,
} from "ens-components/actions";

const calls = [approval.value, registration.value] as const;

const result = await executeContractWrites(walletClient, publicClient, {
  calls,
  chain,
  strategy: "auto", // [!code focus]
});
```

All calls must use the same account.

## Strategies

| Strategy     | Behavior                                                         |
| ------------ | ---------------------------------------------------------------- |
| `single`     | Requires one prepared call and sends one transaction             |
| `atomic`     | Requires EIP-5792 atomic support and uses `wallet_sendCalls`     |
| `sequential` | Sends and confirms each call in order                            |
| `auto`       | Uses `single`, atomic batching, or sequential fallback as needed |

`auto` is the recommended default for mixed wallet support.

## Confirmation and progress

```ts [progress.ts]
const result = await executeContractWrites(walletClient, publicClient, {
  calls,
  chain,
  confirmation: "confirmed",
  strategy: "auto",
  onProgress(progress) {
    persistProgress(progress);
  },
});
```

`confirmation: "confirmed"` waits for receipts. `"submitted"` returns after
the final submission. `onProgress` reports signing, submission, and
confirmation states.

:::warning[Partial failure]
Atomic batches complete or revert together. A sequential batch can confirm
earlier calls before a later call fails. On `PARTIAL_BATCH_FAILED`, inspect the
confirmed progress before retrying.
:::

See [`executeContractWrites`](/docs/actions/execute-contract-writes) for the
complete API.
