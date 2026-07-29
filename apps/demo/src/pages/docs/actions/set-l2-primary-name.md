---
title: setL2PrimaryName
description: Set an account's ENS v2 reverse name.
---

# setL2PrimaryName

Submits `L2ReverseRegistrar.setName`.

## Import

```ts [import.ts]
import { setL2PrimaryName } from "ens-components/actions";
```

## Usage

```ts [set-primary-name.ts]
const result = await setL2PrimaryName(walletClient, publicClient, {
  account,
  chain,
  input: "example.eth",
  l2ReverseRegistrarAddress,
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
interface SetL2PrimaryNameParameters extends ExecuteContractWriteParameters {
  account: Address;
  input: string | null | undefined;
  l2ReverseRegistrarAddress: Address;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, SetL2PrimaryNameErrorType>`

## Error

Returns name, account, registrar, simulation, wallet, or confirmation error
codes.

## Prepare

`prepareSetL2PrimaryNameWrite` returns the prepared reverse registrar call. See
[Batching](/docs/guides/batching).
