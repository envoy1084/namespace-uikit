---
title: setL2PrimaryName
description: Set an account's ENS v2 reverse name.
---

# setL2PrimaryName

Submits `L2ReverseRegistrar.setName`.

## Import

```ts
import { setL2PrimaryName } from "ens-components/actions";
```

## Usage

```ts
const result = await setL2PrimaryName(walletClient, publicClient, {
  account,
  chain,
  input: "example.eth",
  l2ReverseRegistrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface SetL2PrimaryNameParameters extends ExecuteContractWriteParameters {
  account: Address;
  input: string | null | undefined;
  l2ReverseRegistrarAddress: Address;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, SetL2PrimaryNameErrorType>`

## Prepare the Write

`prepareSetL2PrimaryNameWrite` returns the prepared reverse registrar call.
