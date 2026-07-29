---
title: Contract Write Status
description: Read or wait for an EIP-5792 call bundle status.
---

# Contract Write Status

Reads or waits for the status of an EIP-5792 call bundle.

## Import

```ts [import.ts]
import { getContractCallsStatus, waitForContractCalls } from "ens-components/actions";
```

## Usage

```ts [status.ts]
const current = await getContractCallsStatus(walletClient, { callsId });

const final = await waitForContractCalls(walletClient, {
  callsId,
  timeout: 120_000,
});
```

## Parameters

### walletClient

`WalletClient`

The Viem wallet client that submitted the call bundle.

### callsId

`string`

The identifier returned by `wallet_sendCalls`.

### timeout

`number | undefined`

Maximum wait time in milliseconds for `waitForContractCalls`.

## Return Type

Both functions return
`ResultAsync<ContractCallsStatus, ContractCallsStatusError>`.

The result contains `state`, `statusCode`, and transaction hashes. State is
`PENDING`, `SUCCESS`, `FAILURE`, or `UNKNOWN`.

## Error

- `CONTRACT_CALLS_STATUS_FAILED`
- `INVALID_CALLS_ID`

See [Batching](/docs/guides/batching) for the complete atomic write flow.
