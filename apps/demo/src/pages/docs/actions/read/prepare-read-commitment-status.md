---
title: prepareCommitmentStatusRead
description: Prepare reads for an ENS commitment's valid window.
---

# prepareCommitmentStatusRead

Prepares a multicall plan for a commitment timestamp and the registrar's
minimum and maximum commitment ages.

## Import

```ts
import { prepareCommitmentStatusRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareCommitmentStatusRead({
  commitment,
  registrarAddress,
});

if (prepared.isOk()) {
  const timing = await executeContractReads(publicClient, prepared.value);
}
```

## Parameters

```ts
interface PrepareCommitmentStatusReadParameters {
  commitment: Hex;
  registrarAddress: Address;
}
```

## Return Type

`Result<PreparedCommitmentStatusRead, PrepareCommitmentStatusReadError>`

The selected `CommitmentTiming` value contains `submittedAt`, `minimumAge`, and
`maximumAge` as Unix-time seconds. The action does not determine the current
block timestamp or assign a UI state to the commitment.

## Preparation errors

- `INVALID_COMMITMENT`
- `INVALID_REGISTRAR_ADDRESS`

## Execution errors

- `CONTRACT_READ_FAILED`
