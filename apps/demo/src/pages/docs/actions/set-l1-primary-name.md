---
title: setL1PrimaryName
description: Set an account's L1 reverse name.
---

# setL1PrimaryName

Submits `ReverseRegistrar.setName` on the configured L1 reverse registrar.

## Import

```ts [import.ts]
import { setL1PrimaryName } from "ens-components/actions";
```

## Usage

```ts [set-primary-name.ts]
const result = await setL1PrimaryName(walletClient, publicClient, {
  account,
  chain,
  input: "example.eth",
  l1ReverseRegistrarAddress,
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
interface SetL1PrimaryNameParameters extends ExecuteContractWriteParameters {
  account: Address;
  input: string | null | undefined;
  l1ReverseRegistrarAddress: Address;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, SetL1PrimaryNameErrorType>`

## Error

Returns name, account, registrar, simulation, wallet, or confirmation error
codes.

## Prepare

`prepareSetL1PrimaryNameWrite` returns the prepared reverse registrar call. See
[Batching](/docs/guides/batching).
