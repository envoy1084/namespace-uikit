---
title: readNameRegistrationPrice
description: Read the registration price for an available .eth name.
---

# readNameRegistrationPrice

Checks availability and reads the registrar price and payment-token decimals in
one multicall.

## Import

```ts
import { readNameRegistrationPrice } from "ens-components/actions";
```

## Usage

```ts
const result = await readNameRegistrationPrice(publicClient, {
  duration: 31_536_000n,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface ReadNameRegistrationPriceParameters {
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<NameRegistrationPrice, ReadNameRegistrationPriceErrorType>`

```ts
interface NameRegistrationPrice {
  base: bigint;
  decimals: number;
  premium: bigint;
  total: bigint;
}
```

The action returns `NAME_NOT_AVAILABLE` when the normalized name cannot be
registered.

## Prepare the Read

`prepareNameRegistrationPriceRead` returns the availability, price, and token
decimal multicall plan.
