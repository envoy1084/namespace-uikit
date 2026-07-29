---
title: readCommitmentStatus
description: Read the validity window for a name commitment.
---

# readCommitmentStatus

Reads the commitment timestamp and the registrar's minimum and maximum
commitment ages in one multicall.

## Import

```ts [import.ts]
import { readCommitmentStatus } from "ens-components/actions";
```

## Usage

```ts [commitment-status.ts]
const result = await readCommitmentStatus(publicClient, {
  commitment,
  registrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

### publicClient

`PublicClient`

The Viem client used to read the registrar.

### parameters

```ts [types.ts]
interface ReadCommitmentStatusParameters {
  commitment: Hex;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<CommitmentTiming, ReadCommitmentStatusErrorType>`

```ts [result.ts]
interface CommitmentTiming {
  maximumAge: bigint;
  minimumAge: bigint;
  submittedAt: bigint;
}
```

`submittedAt` is zero when the commitment does not exist.

## Error

Returns input validation codes or `CONTRACT_READ_FAILED`.

## Prepare

`prepareCommitmentStatusRead` returns a `PreparedCommitmentStatusRead` plan for
manual multicall execution. See [Batching](/docs/guides/batching).
