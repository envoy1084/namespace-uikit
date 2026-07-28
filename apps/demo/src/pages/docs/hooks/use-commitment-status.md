---
title: useCommitmentStatus
description: Read the state and valid window of an ENS commitment.
---

# useCommitmentStatus

Reads a commitment's registrar timestamp and valid reveal window.

## Import

```ts
import { useCommitmentStatus } from "ens-components/hooks";
```

## Usage

```tsx
const status = useCommitmentStatus({ commitment });

if (status.data?.state === "READY") {
  // The reveal transaction can be submitted.
}
```

## Parameters

```ts
interface UseCommitmentStatusParameters<selectData = CommitmentStatus> {
  commitment: Hex | null | undefined;
  registrarAddress?: Address;
  query?: Omit<
    UseQueryOptions<CommitmentStatus, CommitmentStatusError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

### commitment

`Hex | null | undefined`

The bytes32 commitment hash. The query is disabled until this is a valid
32-byte hex value and a public client is available.

### registrarAddress

`Address | undefined`

Defaults to the configured ENS v2 registrar.

### query

TanStack Query options, excluding `queryFn` and `queryKey`.

## Return Type

`UseQueryResult<CommitmentStatus, CommitmentStatusError>`

```ts
interface CommitmentStatus {
  currentTime: bigint;
  remainingSeconds: bigint;
  state: "EXPIRED" | "NOT_FOUND" | "READY" | "WAITING";
  submittedAt: bigint;
  validFrom: bigint;
  validUntil: bigint;
}
```

All timestamps and durations use seconds.

## Action

Uses
[`prepareCommitmentStatusRead`](/docs/actions/read-commitment-status)
and `executeContractReads`.
