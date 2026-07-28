---
title: setL1PrimaryName
description: Set an account's L1 reverse name.
---

# setL1PrimaryName

Submits `ReverseRegistrar.setName` on the configured L1 reverse registrar.

## Import

```ts
import { setL1PrimaryName } from "ens-components/actions";
```

## Usage

```ts
const result = await setL1PrimaryName(walletClient, publicClient, {
  account,
  chain,
  input: "example.eth",
  l1ReverseRegistrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface SetL1PrimaryNameParameters extends ExecuteContractWriteParameters {
  account: Address;
  input: string | null | undefined;
  l1ReverseRegistrarAddress: Address;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, SetL1PrimaryNameErrorType>`

## Prepare the Write

`prepareSetL1PrimaryNameWrite` returns the prepared reverse registrar call.
