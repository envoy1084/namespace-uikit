---
title: Contract Writes
description: Typed contract-write plans used by ENS Components executors.
---

# Contract Writes

`PreparedContractWrite` is an immutable, validated execution plan.

## Type

```ts [types.ts]
interface PreparedContractWrite<TRequest, TKind, TMetadata> {
  account: Address;
  call: {
    data: Hex;
    to: Address;
    value: bigint;
  };
  kind: TKind;
  metadata: TMetadata;
  request: TRequest;
}
```

## Usage

Compose prepared writes in dependency order, then pass the non-empty array to
[`executeContractWrites`](/docs/actions/execute-contract-writes).

```ts [calls.ts]
const calls = [approval.value, registration.value] as const;
```

All calls in one execution must use the same account. The executor receives
the chain separately.

See [Batching](/docs/guides/batching) for complete read and write examples.
