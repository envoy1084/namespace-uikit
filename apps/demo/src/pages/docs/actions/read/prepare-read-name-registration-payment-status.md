---
title: prepareNameRegistrationPaymentStatusRead
description: Prepare registration quote, balance, and allowance reads.
---

# prepareNameRegistrationPaymentStatusRead

Prepares a multicall plan for registration availability, price, token
decimals, account balance, and registrar allowance.

## Import

```ts
import { prepareNameRegistrationPaymentStatusRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareNameRegistrationPaymentStatusRead({
  account,
  duration,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isOk()) {
  const status = await executeContractReads(publicClient, prepared.value);
}
```

## Parameters

```ts
interface PrepareNameRegistrationPaymentStatusReadParameters {
  account: Address;
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`Result<PreparedNameRegistrationPaymentStatusRead, PrepareNameRegistrationPaymentStatusReadError>`

The selected result includes `hasSufficientBalance` and
`hasSufficientAllowance` in addition to the raw balance, allowance, and price
fields.

Preparation can return name-price validation errors or
`INVALID_ACCOUNT_ADDRESS`. Execution can return `CONTRACT_READ_FAILED` or
`NAME_NOT_AVAILABLE`.
