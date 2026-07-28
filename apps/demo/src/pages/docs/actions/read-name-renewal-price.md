---
title: readNameRenewalPrice
description: Read the price and expiry for an .eth renewal.
---

# readNameRenewalPrice

Checks renewability and reads current expiry, renewal price, and payment-token
decimals in one multicall.

## Import

```ts
import { readNameRenewalPrice } from "ens-components/actions";
```

## Usage

```ts
const result = await readNameRenewalPrice(publicClient, {
  duration: 31_536_000n,
  ethRegistryAddress,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface ReadNameRenewalPriceParameters {
  duration: bigint;
  ethRegistryAddress: Address;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<NameRenewalPrice, ReadNameRenewalPriceErrorType>`

The result contains `currentExpiry`, `newExpiry`, `duration`, `total`, and
`decimals`.

## Prepare the Read

`prepareNameRenewalPriceRead` returns the renewability, expiry, price, and token
decimal multicall plan.
