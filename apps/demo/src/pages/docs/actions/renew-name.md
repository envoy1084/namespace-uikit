---
title: renewName
description: Renew an ENS v2 .eth name.
---

# renewName

Validates and submits `ETHRegistrar.renew`.

## Import

```ts [import.ts]
import { renewName } from "ens-components/actions";
```

## Usage

```ts [renew.ts]
const result = await renewName(walletClient, publicClient, {
  account,
  chain,
  duration: 31_536_000n,
  input: "example.eth",
  paymentTokenAddress,
  referrer,
  registrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

### walletClient

`WalletClient`

The connected Viem wallet client.

### publicClient

`PublicClient`

The Viem client used for simulation and confirmation.

### parameters

```ts [types.ts]
interface RenewNameParameters extends ExecuteContractWriteParameters {
  account: Address;
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  referrer: Hex;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, RenewNameErrorType>`

## Error

Returns name, duration, payment, simulation, wallet, confirmation, or revert
error codes.

## Prepare

Use `prepareRenewNameWrite` to batch token approval and renewal. See
[Batching](/docs/guides/batching).
