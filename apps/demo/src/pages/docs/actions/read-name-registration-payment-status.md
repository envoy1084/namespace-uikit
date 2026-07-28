---
title: readNameRegistrationPaymentStatus
description: Read price, balance, and allowance for registration.
---

# readNameRegistrationPaymentStatus

Reads the full ERC-20 payment state required to register an available name.

## Import

```ts
import { readNameRegistrationPaymentStatus } from "ens-components/actions";
```

## Usage

```ts
const result = await readNameRegistrationPaymentStatus(publicClient, {
  account,
  duration: 31_536_000n,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface ReadNameRegistrationPaymentStatusParameters {
  account: Address;
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<NameRegistrationPaymentStatus, ReadNameRegistrationPaymentStatusErrorType>`

The result contains `base`, `premium`, `total`, `decimals`, `balance`,
`allowance`, `hasSufficientBalance`, and `hasSufficientAllowance`.

## Prepare the Read

`prepareNameRegistrationPaymentStatusRead` returns one multicall plan containing
availability, price, decimals, balance, and allowance reads.
