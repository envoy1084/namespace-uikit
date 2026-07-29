---
title: readNameRegistrationPaymentStatus
description: Read price, balance, and allowance for registration.
---

# readNameRegistrationPaymentStatus

Reads the full ERC-20 payment state required to register an available name.

## Import

```ts [import.ts]
import { readNameRegistrationPaymentStatus } from "ens-components/actions";
```

## Usage

```ts [payment-status.ts]
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

### publicClient

`PublicClient`

The Viem client used for the multicall.

### parameters

```ts [types.ts]
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

## Error

Returns input, account, contract, availability, or payment-state error codes.

## Prepare

`prepareNameRegistrationPaymentStatusRead` returns one multicall plan containing
availability, price, decimals, balance, and allowance reads. See
[Batching](/docs/guides/batching).
