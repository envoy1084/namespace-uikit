---
title: prepareNameRenewalPaymentStatusRead
description: Prepare renewal quote, balance, and allowance reads.
---

# prepareNameRenewalPaymentStatusRead

Prepares a multicall plan for a renewal quote, payment-token balance, and
registrar allowance.

## Import

```ts
import { prepareNameRenewalPaymentStatusRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareNameRenewalPaymentStatusRead({
  account,
  duration: 31_557_600n,
  ethRegistryAddress,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isOk()) {
  const payment = await executeContractReads(publicClient, prepared.value);
}
```

## Parameters

```ts
interface PrepareNameRenewalPaymentStatusReadParameters {
  account: Address;
  duration: bigint;
  ethRegistryAddress: Address;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`Result<PreparedNameRenewalPaymentStatusRead, PrepareNameRenewalPaymentStatusReadError>`

The selected result contains quote fields plus `balance`, `allowance`,
`hasSufficientBalance`, and `hasSufficientAllowance`.

## Errors

Preparation returns the renewal-price preparation errors plus:

- `INVALID_ACCOUNT_ADDRESS`

Execution can return:

- `CONTRACT_READ_FAILED`
- `NAME_NOT_RENEWABLE`
