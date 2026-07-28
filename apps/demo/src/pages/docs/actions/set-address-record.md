---
title: setAddressRecord
description: Set an ENS name's Ethereum address record.
---

# setAddressRecord

Submits `PermissionedResolver.setAddr` for SLIP-44 coin type `60`.

## Import

```ts
import { setAddressRecord } from "ens-components/actions";
```

## Usage

```ts
const result = await setAddressRecord(walletClient, publicClient, {
  account,
  chain,
  input: "example.eth",
  owner: account,
  resolverAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface SetAddressRecordParameters extends ExecuteContractWriteParameters {
  account: Address;
  input: string | null | undefined;
  owner: Address;
  resolverAddress: Address;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, SetAddressRecordErrorType>`

## Prepare the Write

`prepareSetAddressRecordWrite` returns the prepared resolver call. Compose it
with reverse-name writes when setting a primary name.
