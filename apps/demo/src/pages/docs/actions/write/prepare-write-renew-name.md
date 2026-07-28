---
title: prepareRenewNameWrite
description: Prepare an ENS v2 .eth renewal.
---

# prepareRenewNameWrite

Prepares `ETHRegistrar.renew` for a second-level `.eth` name.

## Import

```ts
import { prepareRenewNameWrite } from "ens-components/actions";
```

## Usage

```ts
const renewal = prepareRenewNameWrite({
  account,
  duration: 31_557_600n,
  input: "example.eth",
  paymentTokenAddress,
  referrer: zeroHash,
  registrarAddress,
});
```

## Parameters

```ts
interface PrepareRenewNameWriteParameters {
  account: Address;
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress: Address;
  referrer: Hex;
  registrarAddress: Address;
}
```

The account pays for the renewal but does not need to own the name. `duration`
is added to the current onchain expiry. Execute the prepared write with
`executeContractWrites`.

## Return Type

`Result<PreparedRenewNameWrite, PrepareRenewNameWriteError | ParseNameInputError>`

## Errors

Preparation can return name parsing errors plus:

- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_DURATION`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_REFERRER`
- `INVALID_REGISTRAR_ADDRESS`
- `UNSUPPORTED_NAME`
