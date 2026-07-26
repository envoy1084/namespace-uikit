# getCommitmentStatus

Evaluates a submitted commitment using on-chain registrar ages and the latest
block timestamp.

```ts
import type { Address } from "viem";

import { getCommitmentStatus } from "ens-components";

declare const registrarAddress: Address;

const result = await getCommitmentStatus(publicClient, {
  commitment,
  network: "testnet",
  registrarAddress,
});
```

## Signature

```ts
function getCommitmentStatus(
  publicClient: PublicClient,
  props: GetCommitmentStatusProps,
): ResultAsync<CommitmentStatus, GetCommitmentStatusError>;
```

## Props

| Prop               | Type                     | Description                             |
| ------------------ | ------------------------ | --------------------------------------- |
| `commitment`       | `Hex`                    | Submitted 32-byte commitment hash.      |
| `network`          | `"mainnet" \| "testnet"` | Network associated with the registrar.  |
| `registrarAddress` | `Address`                | Registrar that received the commitment. |

## Result

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

State rules:

| State       | Condition                                                             |
| ----------- | --------------------------------------------------------------------- |
| `NOT_FOUND` | `commitmentAt` returns zero.                                          |
| `WAITING`   | Current block time is before `submittedAt + MIN_COMMITMENT_AGE`.      |
| `READY`     | Current block time is within the valid reveal window.                 |
| `EXPIRED`   | Current block time is at or after `submittedAt + MAX_COMMITMENT_AGE`. |

The action prepares and executes `commitmentAt`, `MIN_COMMITMENT_AGE`, and
`MAX_COMMITMENT_AGE` through `executeContractReadPlan`, then reads the current
block. Use `prepareCommitmentStatusRead` directly when only the raw registrar
timing values are required.

## Errors

- `INVALID_COMMITMENT`
- `INVALID_REGISTRAR_ADDRESS`
- `CONTRACT_READ_FAILED`
