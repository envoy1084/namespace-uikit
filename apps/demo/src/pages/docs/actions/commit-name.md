---
title: commitName
description: Submit an ENS v2 name commitment.
---

# commitName

Builds the commitment from the registration inputs and submits
`ETHRegistrar.commit`.

## Import

```ts
import { commitName } from "ens-components/actions";
```

## Usage

```ts
const result = await commitName(walletClient, publicClient, {
  account,
  chain,
  duration,
  input: "example.eth",
  owner: account,
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
interface CommitNameParameters
  extends MakeNameCommitmentParameters, ExecuteContractWriteParameters {
  account: Address;
  registrarAddress: Address;
}
```

Persist every commitment-bound input unchanged for registration.

## Return Type

`ResultAsync<ExecuteContractWritesResult, CommitNameErrorType>`

## Prepare the Write

`prepareCommitNameWrite` returns the commitment hash, normalized label, and
prepared call. Use it when batching resolver deployment and commitment.
