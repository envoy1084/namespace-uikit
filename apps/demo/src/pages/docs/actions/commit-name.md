---
title: commitName
description: Submit an ENS v2 name commitment.
---

# commitName

Builds the commitment from the registration inputs and submits
`ETHRegistrar.commit`.

## Import

```ts [import.ts]
import { commitName } from "ens-components/actions";
```

## Usage

```ts [commit.ts]
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

### walletClient

`WalletClient`

The connected Viem wallet client.

### publicClient

`PublicClient`

The Viem client used for simulation and confirmation.

### parameters

```ts [types.ts]
interface CommitNameParameters
  extends MakeNameCommitmentParameters, ExecuteContractWriteParameters {
  account: Address;
  registrarAddress: Address;
}
```

Persist every commitment-bound input unchanged for registration.

## Return Type

`ResultAsync<ExecuteContractWritesResult, CommitNameErrorType>`

## Error

Returns commitment input, simulation, wallet, submission, confirmation, or
revert error codes.

## Prepare

`prepareCommitNameWrite` returns the commitment hash, normalized label, and
prepared call. Use it when batching resolver deployment and commitment. See
[Batching](/docs/guides/batching).
