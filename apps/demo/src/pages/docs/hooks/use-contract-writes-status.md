---
title: useContractWritesStatus
description: Track the status of submitted contract writes.
---

# useContractWritesStatus

Tracks an EIP-5792 atomic batch or one or more submitted transaction hashes.

## Import

```ts
import { useContractWritesStatus } from "ens-components/hooks";
```

## Usage

```tsx
const status = useContractWritesStatus({
  submission: {
    callsId,
    strategy: "atomic",
  },
});
```

Sequential and single submissions use transaction hashes:

```ts
{
  strategy: "single" | "sequential";
  transactionHashes: readonly [Hex, ...Hex[]];
}
```

## Parameters

```ts
interface UseContractWritesStatusParameters<selectData = ContractWritesStatus> {
  submission: ContractWritesSubmission | null | undefined;
  query?: Omit<
    UseQueryOptions<ContractWritesStatus, ContractWritesStatusError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

The query is disabled without a submission or required client.

## Return Type

`UseQueryResult<ContractWritesStatus, ContractWritesStatusError>`

```ts
interface ContractWritesStatus {
  receipts: readonly TransactionReceipt[];
  state: "FAILURE" | "PENDING" | "SUCCESS" | "UNKNOWN";
  strategy: "atomic" | "sequential" | "single";
  transactionHashes: readonly Hex[];
}
```

Pending submissions poll once per second by default. Override this through
`query.refetchInterval`.

## Action

Atomic submissions use `getContractCallsStatus`; single and sequential
submissions read transaction receipts through the configured public client.
