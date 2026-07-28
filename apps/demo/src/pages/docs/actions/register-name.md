---
title: registerName
description: Register a committed ENS v2 .eth name.
---

# registerName

Recreates the commitment inputs and submits `ETHRegistrar.register`.

## Import

```ts
import { registerName } from "ens-components/actions";
```

## Usage

```ts
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

```ts
interface RegisterNameParameters
  extends MakeNameCommitmentParameters, ExecuteContractWriteParameters {
  account: Address;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, RegisterNameErrorType>`

## Prepare the Write

Use `prepareRegisterNameWrite` when composing registration with token approval,
forward resolution, or primary-name updates.
