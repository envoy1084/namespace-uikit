---
title: renewName
description: Renew an ENS v2 .eth name.
---

# renewName

Validates and submits `ETHRegistrar.renew`.

## Import

```ts
import { renewName } from "ens-components/actions";
```

## Usage

```ts
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

```ts
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

## Prepare the Write

Use `prepareRenewNameWrite` to batch token approval and renewal.
