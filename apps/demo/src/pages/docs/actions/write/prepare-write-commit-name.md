---
title: prepareCommitNameWrite
description: Prepare an ENS v2 name commitment.
---

# prepareCommitNameWrite

Validates commitment-bound registration input and prepares
`ETHRegistrar.commit(bytes32)`.

## Import

```ts
import { prepareCommitNameWrite } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareCommitNameWrite({
  account,
  duration,
  input: "example.eth",
  owner: account,
  referrer,
  registrarAddress,
  resolverAddress,
  secret,
  subregistryAddress,
});

if (prepared.isOk()) {
  const result = await executeContractWrites(walletClient, publicClient, {
    calls: [prepared.value],
    chain,
    strategy: "single",
  });
}
```

## Parameters

```ts
interface PrepareCommitNameWriteParameters extends MakeNameCommitmentParameters {
  account: Address;
  registrarAddress: Address;
}
```

`MakeNameCommitmentParameters` contains `duration`, `input`, `owner`,
`referrer`, `resolverAddress`, `secret`, and `subregistryAddress`.

## Return Type

`Result<PreparedCommitNameWrite, PrepareCommitNameWriteError | ParseNameInputError>`

The prepared metadata contains the commitment hash and normalized label.
Persist every commitment-bound input unchanged for the reveal transaction.

Errors are uppercase validation codes from `makeNameCommitment` plus
`INVALID_ACCOUNT_ADDRESS` and `INVALID_REGISTRAR_ADDRESS`.
