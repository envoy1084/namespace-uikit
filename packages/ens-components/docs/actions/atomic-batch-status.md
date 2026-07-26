# Atomic batch status

`getAtomicBatchStatus` reads an EIP-5792 call batch once.
`waitForAtomicBatch` polls until the batch reaches a terminal state or times
out.

```ts
import { getAtomicBatchStatus, waitForAtomicBatch } from "ens-components";

const current = await getAtomicBatchStatus(walletClient, { callsId });
const final = await waitForAtomicBatch(walletClient, {
  callsId,
  timeout: 120_000,
});
```

## Signatures

```ts
function getAtomicBatchStatus(
  walletClient: WalletClient,
  props: GetAtomicBatchStatusProps,
): ResultAsync<AtomicBatchStatus, AtomicBatchStatusError>;

function waitForAtomicBatch(
  walletClient: WalletClient,
  props: WaitForAtomicBatchProps,
): ResultAsync<AtomicBatchStatus, AtomicBatchStatusError>;
```

`WaitForAtomicBatchProps` adds an optional `timeout` in milliseconds.

## Result

```ts
interface AtomicBatchStatus {
  readonly state: "FAILURE" | "PENDING" | "SUCCESS" | "UNKNOWN";
  readonly statusCode: number;
  readonly transactionHashes: readonly Hex[];
}
```

## Errors

- `ATOMIC_BATCH_STATUS_FAILED`
- `INVALID_CALLS_ID`
