---
title: Contract Write Status
description: Read or wait for an EIP-5792 call bundle status.
---

# Contract Write Status

`getContractCallsStatus` reads an EIP-5792 call bundle once.
`waitForContractCalls` waits for a terminal wallet status.

## Import

```ts
import { getContractCallsStatus, waitForContractCalls } from "ens-components/actions";
```

## Usage

```ts
const current = await getContractCallsStatus(walletClient, { callsId });

const final = await waitForContractCalls(walletClient, {
  callsId,
  timeout: 120_000,
});
```

## Return Type

Both functions return
`ResultAsync<ContractCallsStatus, ContractCallsStatusError>`.

The result contains `state`, `statusCode`, and transaction hashes. State is
`PENDING`, `SUCCESS`, `FAILURE`, or `UNKNOWN`.

## Errors

- `CONTRACT_CALLS_STATUS_FAILED`
- `INVALID_CALLS_ID`
