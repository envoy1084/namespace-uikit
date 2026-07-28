---
title: preparePaymentTokenApprovalWrite
description: Prepare an ERC-20 payment-token approval.
---

# preparePaymentTokenApprovalWrite

Validates and prepares an ERC-20 allowance write.

## Import

```ts
import { preparePaymentTokenApprovalWrite } from "ens-components/actions";
```

## Usage

```ts
const approval = preparePaymentTokenApprovalWrite({
  account,
  amount,
  paymentTokenAddress,
  spenderAddress: registrarAddress,
});
```

## Parameters

```ts
interface PreparePaymentTokenApprovalWriteParameters {
  account: Address;
  amount: bigint;
  paymentTokenAddress: Address;
  spenderAddress: Address;
}
```

`amount` uses token atomic units.

## Return Type

`Result<PreparedPaymentTokenApprovalWrite, PreparePaymentTokenApprovalWriteError>`

## Errors

- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_APPROVAL_AMOUNT`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_SPENDER_ADDRESS`
