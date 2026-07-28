---
title: prepareNameRegistrationPriceRead
description: Prepare reads for an ENS v2 registration quote.
---

# prepareNameRegistrationPriceRead

Prepares a multicall plan for availability, registration price, and
payment-token decimals.

## Import

```ts
import { prepareNameRegistrationPriceRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareNameRegistrationPriceRead({
  duration,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isOk()) {
  const price = await executeContractReads(publicClient, prepared.value);
}
```

## Parameters

```ts
interface PrepareNameRegistrationPriceReadParameters {
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`Result<PreparedNameRegistrationPriceRead, PrepareNameRegistrationPriceReadError>`

Execute the returned plan with `executeContractReads`. The selected
`NameRegistrationPrice` contains `base`, `premium`, `total`, and `decimals`.
Amounts use payment-token atomic units.

## Preparation errors

- Name parsing and availability-input errors
- `INVALID_DURATION`
- `INVALID_PAYMENT_TOKEN_ADDRESS`

## Execution errors

- `CONTRACT_READ_FAILED`
- `NAME_NOT_AVAILABLE`
