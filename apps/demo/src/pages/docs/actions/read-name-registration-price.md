---
title: readNameRegistrationPrice
description: Read the registration price for an available .eth name.
---

# readNameRegistrationPrice

Checks availability and reads the registrar price and payment-token decimals in
one multicall.

## Import

```ts [import.ts]
import { readNameRegistrationPrice } from "ens-components/actions";
```

## Usage

```ts [registration-price.ts]
const result = await readNameRegistrationPrice(publicClient, {
  duration: 31_536_000n,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

### publicClient

`PublicClient`

The Viem client used for the multicall.

### parameters

```ts [types.ts]
interface ReadNameRegistrationPriceParameters {
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<NameRegistrationPrice, ReadNameRegistrationPriceErrorType>`

```ts [result.ts]
interface NameRegistrationPrice {
  base: bigint;
  decimals: number;
  premium: bigint;
  total: bigint;
}
```

The action returns `NAME_NOT_AVAILABLE` when the normalized name cannot be
registered.

## Error

Returns input, duration, contract, availability, or contract-read error codes.

## Prepare

`prepareNameRegistrationPriceRead` returns the availability, price, and token
decimal multicall plan. See [Batching](/docs/guides/batching).
