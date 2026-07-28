---
title: readCommitmentStatus
description: Read the validity window for a name commitment.
---

# readCommitmentStatus

Reads the commitment timestamp and the registrar's minimum and maximum
commitment ages in one multicall.

## Import

```ts
import { readCommitmentStatus } from "ens-components/actions";
```

## Usage

```ts
const result = await readCommitmentStatus(publicClient, {
  commitment,
  registrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface ReadCommitmentStatusParameters {
  commitment: Hex;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<CommitmentTiming, ReadCommitmentStatusErrorType>`

```ts
interface CommitmentTiming {
  maximumAge: bigint;
  minimumAge: bigint;
  submittedAt: bigint;
}
```

`submittedAt` is zero when the commitment does not exist.

## Prepare the Read

`prepareCommitmentStatusRead` returns a `PreparedCommitmentStatusRead` plan for
manual multicall execution.
