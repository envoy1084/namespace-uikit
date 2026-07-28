---
title: approvePaymentToken
description: Approve an ERC-20 payment token allowance.
---

# approvePaymentToken

Validates and submits `ERC20.approve`.

## Import

```ts
import { approvePaymentToken } from "ens-components/actions";
```

## Usage

```ts
const result = await approvePaymentToken(walletClient, publicClient, {
  account,
  amount,
  chain,
  paymentTokenAddress,
  spenderAddress: registrarAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface ApprovePaymentTokenParameters extends ExecuteContractWriteParameters {
  account: Address;
  amount: bigint;
  paymentTokenAddress: Address;
  spenderAddress: Address;
}
```

`amount` is expressed in the payment token's atomic units.

## Return Type

`ResultAsync<ExecuteContractWritesResult, ApprovePaymentTokenErrorType>`

The action submits one standard transaction and waits for confirmation by
default.

## Prepare the Write

Use `preparePaymentTokenApprovalWrite` when including the approval in
[`executeContractWrites`](/docs/actions/execute-contract-writes).
