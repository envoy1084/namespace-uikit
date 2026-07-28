---
title: prepareRegisterNameWrite
description: Prepare an ENS v2 name registration.
---

# prepareRegisterNameWrite

Validates reveal parameters and prepares `ETHRegistrar.register`. The
commitment-bound inputs must exactly match the original commitment.

## Import

```ts
import { prepareRegisterNameWrite } from "ens-components/actions";
```

## Usage

```ts
const registration = prepareRegisterNameWrite({
  account,
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

if (registration.isOk()) {
  const result = await executeContractWrites(walletClient, publicClient, {
    calls: [registration.value],
    chain,
    strategy: "single",
  });
}
```

## Parameters

```ts
interface PrepareRegisterNameWriteParameters extends MakeNameCommitmentParameters {
  account: Address;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`Result<PreparedRegisterNameWrite, PrepareRegisterNameWriteError | ParseNameInputError>`

The prepared metadata contains the normalized label. Errors are uppercase
validation codes from `makeNameCommitment` plus account, registrar, and
payment-token address errors.
