---
title: readNameRenewalPaymentStatus
description: Read price, balance, and allowance for renewal.
---

# readNameRenewalPaymentStatus

Reads the renewal quote and the account's ERC-20 balance and registrar
allowance.

## Import

```ts
import { readNameRenewalPaymentStatus } from "ens-components/actions";
```

## Usage

```ts
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

```ts
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

## Prepare the Read

`prepareNameRenewalPaymentStatusRead` returns the complete multicall plan.
