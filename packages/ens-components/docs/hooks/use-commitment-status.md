# useCommitmentStatus

Reads the on-chain state of a submitted ENS v2 commitment through TanStack
Query.

```tsx
import { useCommitmentStatus } from "ens-components";

const status = useCommitmentStatus({
  commitment,
});

if (status.data?.state === "WAITING") {
  return <span>{status.data.remainingSeconds} seconds remaining</span>;
}
```

## Parameters

```ts
interface UseCommitmentStatusParameters<selectData = CommitmentStatus> {
  commitment: Hex | null | undefined;
  registrarAddress?: Address;
  query?: Omit<
    UseQueryOptions<CommitmentStatus, GetCommitmentStatusError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

| Parameter          | Default            | Description                                                                  |
| ------------------ | ------------------ | ---------------------------------------------------------------------------- |
| `commitment`       | —                  | Submitted 32-byte commitment hash. `null` or `undefined` disables the query. |
| `registrarAddress` | Provider registrar | ENS v2 registrar that received the commitment.                               |
| `query`            | `undefined`        | TanStack Query options except `queryFn` and `queryKey`.                      |

While the state is `"WAITING"`, the hook refetches every five seconds by
default. Set `query.refetchInterval` to override or disable this behavior.

## Result data

```ts
interface CommitmentStatus {
  readonly currentTime: bigint;
  readonly remainingSeconds: bigint;
  readonly state: "EXPIRED" | "NOT_FOUND" | "READY" | "WAITING";
  readonly submittedAt: bigint;
  readonly validFrom: bigint;
  readonly validUntil: bigint;
}
```

Timestamps are Unix seconds from the chain. See
[`getCommitmentStatus`](../actions/get-commitment-status.md) for state
boundaries and errors.
