---
title: Transactions
description: Prepare and execute ENS writes as single, atomic, or sequential transactions.
---

# Transactions

Write actions separate validation and encoding from wallet execution.

## Prepare calls

Each `prepare*Write` action returns a typed `PreparedContractWrite`.

```ts
const renewal = prepareRenewNameWrite({
  account,
  duration: 31_557_600n,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});
```

Preparation does not prompt the wallet.

## Execute calls

Pass one or more prepared writes to `executeContractWrites`.

```ts
if (renewal.isOk()) {
  const result = await executeContractWrites(walletClient, publicClient, {
    calls: [renewal.value],
    chain,
    strategy: "auto",
  });
}
```

| Strategy     | Behavior                                                   |
| ------------ | ---------------------------------------------------------- |
| `single`     | Requires exactly one call and sends one transaction.       |
| `atomic`     | Requires EIP-5792 atomic batch support.                    |
| `sequential` | Sends and confirms calls in order.                         |
| `auto`       | Uses atomic batching when supported, otherwise sequential. |

## Confirmation

`confirmation: "confirmed"` waits for receipts. `"submitted"` returns after
wallet submission. Components use confirmed results before advancing.

## Partial failure

Atomic batches either complete or revert together. Sequential execution can
confirm earlier calls before a later call fails. Handle
`PARTIAL_BATCH_FAILED` by inspecting confirmed hashes before retrying.

## React

Use [`useExecuteContractWrites`](/docs/hooks/use-execute-contract-writes) for
arbitrary prepared calls. Operation-specific mutation hooks prepare and
execute one write.
