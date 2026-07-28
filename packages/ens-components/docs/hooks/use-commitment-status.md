# useCommitmentStatus

Reads the registrar commitment timestamp and valid commitment window through
TanStack Query.

```tsx
import { useCommitmentStatus } from "ens-components/hooks";

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

`registrarAddress` defaults to `EnsProvider`. The query is disabled until a
bytes32 commitment and public client are available.

## Result

`state` is `NOT_FOUND`, `WAITING`, `READY`, or `EXPIRED`. The result also
contains `submittedAt`, `validFrom`, `validUntil`, `currentTime`, and
`remainingSeconds` as Unix-second `bigint` values.
