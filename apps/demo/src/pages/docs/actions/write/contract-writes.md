---
title: Contract Writes
description: Typed contract-write plans used by ENS Components executors.
---

# Contract Writes

`PreparedContractWrite` contains a Viem contract request and operation
metadata.

```ts
interface PreparedContractWrite<abi, functionName, metadata> {
  readonly request: {
    readonly abi: abi;
    readonly account: Address;
    readonly address: Address;
    readonly args: readonly unknown[];
    readonly functionName: functionName;
    readonly value?: bigint;
  };
  readonly meta: metadata;
}
```

Prepared writes are immutable execution plans. Compose them in the required
order, then pass the array to
[`executeContractWrites`](/docs/actions/write/execute-contract-writes).

```ts
const calls = [approval.value, registration.value] as const;
```

All calls in one execution must use the same account and chain.
