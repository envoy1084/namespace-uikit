---
title: registerName
description: Register a committed ENS v2 .eth name.
---

# registerName

Recreates the commitment inputs and submits `ETHRegistrar.register`.

## Import

```ts [import.ts]
import { registerName } from "ens-components/actions";
```

## Usage

```ts [register.ts]
const result = await registerName(walletClient, publicClient, {
  account,
  chain,
  duration,
  input: "example.eth",
  owner: account,
  paymentTokenAddress,
  referrer,
  registrarAddress,
  resolverAddress,
  secret,
  subregistryAddress,
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
interface RegisterNameParameters
  extends MakeNameCommitmentParameters, ExecuteContractWriteParameters {
  account: Address;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, RegisterNameErrorType>`

## Error

Returns name, commitment, payment, simulation, wallet, confirmation, or revert
error codes.

## Prepare

Use `prepareRegisterNameWrite` when composing registration with token approval,
forward resolution, or primary-name updates. See
[Batching](/docs/guides/batching).
