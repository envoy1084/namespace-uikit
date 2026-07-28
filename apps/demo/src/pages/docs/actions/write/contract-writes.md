---
title: Contract Writes
description: Typed contract-write plans used by ENS Components executors.
---

# Contract Writes

`PreparedContractWrite` is an immutable, validated execution plan.

```ts
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

Compose prepared writes in dependency order, then pass the non-empty array to
[`executeContractWrites`](/docs/actions/write/execute-contract-writes).

```ts
const calls = [approval.value, registration.value] as const;
```

All calls in one execution must use the same account. The executor receives
the chain separately.
