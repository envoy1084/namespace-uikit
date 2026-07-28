---
title: updateNameProfileRecords
description: Update multiple ENS profile records in one transaction.
---

# updateNameProfileRecords

Encodes profile changes, simulates the exact
`PermissionedResolver.multicallWithNodeCheck` request, and submits it.

## Import

```ts
import { updateNameProfileRecords } from "ens-components/actions";
```

## Usage

```ts
const result = await updateNameProfileRecords(walletClient, publicClient, {
  account,
  chain,
  changes,
  input: "example.eth",
  resolverAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface UpdateNameProfileRecordsParameters extends ExecuteContractWriteParameters {
  account: Address;
  changes: readonly NameProfileRecordChange[];
  input: string | null | undefined;
  resolverAddress: Address;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, UpdateNameProfileRecordsErrorType>`

Invalid encodings return `INVALID_PROFILE_RECORDS`. A failed simulation returns
`PROFILE_UPDATE_SIMULATION_FAILED`.

## Prepare the Write

`prepareNameProfileRecordsWrite` simulates and returns the prepared resolver
multicall without opening the wallet.
