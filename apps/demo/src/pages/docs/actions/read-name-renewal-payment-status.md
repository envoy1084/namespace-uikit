---
title: readNameRenewalPaymentStatus
description: Read price, balance, and allowance for renewal.
---

# readNameRenewalPaymentStatus

Reads the renewal quote and the account's ERC-20 balance and registrar
allowance.

## Import

```ts [import.ts]
import { readNameRenewalPaymentStatus } from "ens-components/actions";
```

## Usage

```ts [payment-status.ts]
const result = await readNameRenewalPaymentStatus(publicClient, {
  account,
  duration: 31_536_000n,
  ethRegistryAddress,
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
interface ReadNameRenewalPaymentStatusParameters {
  account: Address;
  duration: bigint;
  ethRegistryAddress: Address;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<NameRenewalPaymentStatus, ReadNameRenewalPaymentStatusErrorType>`

The result contains the current and new expiry, quote, decimals, balance,
allowance, and sufficiency flags.

## Error

Returns input, account, contract, renewability, or payment-state error codes.

## Prepare

`prepareNameRenewalPaymentStatusRead` returns the complete multicall plan. See
[Batching](/docs/guides/batching).
