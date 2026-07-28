---
title: prepareNameRenewalPriceRead
description: Prepare reads for an ENS v2 renewal quote.
---

# prepareNameRenewalPriceRead

Prepares a multicall plan for renewable status, current expiry, renewal price,
and payment-token decimals.

## Import

```ts
import { prepareNameRenewalPriceRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareNameRenewalPriceRead({
  duration: 31_557_600n,
  ethRegistryAddress,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isOk()) {
  const quote = await executeContractReads(publicClient, prepared.value);
}
```

## Parameters

```ts
interface PrepareNameRenewalPriceReadParameters {
  duration: bigint;
  ethRegistryAddress: Address;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}
```

## Return Type

`Result<PreparedNameRenewalPriceRead, PrepareNameRenewalPriceReadError>`

`duration` is the number of seconds added to the current expiry. The selected
result contains `currentExpiry`, `newExpiry`, `duration`, `total`, and
`decimals`.

## Errors

Preparation can return name parsing errors plus:

- `INVALID_DURATION`
- `INVALID_ETH_REGISTRY_ADDRESS`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_REGISTRAR_ADDRESS`
- `UNSUPPORTED_NAME`

Execution can return:

- `CONTRACT_READ_FAILED`
- `NAME_NOT_RENEWABLE`
