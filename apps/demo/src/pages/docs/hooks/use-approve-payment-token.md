---
title: useApprovePaymentToken
description: Approve an ERC-20 token for an ENS contract.
---

# useApprovePaymentToken

Prepares and submits an ERC-20 allowance write.

## Import

```ts
import { useApprovePaymentToken } from "ens-components/hooks";
```

## Usage

```tsx
const approval = useApprovePaymentToken();
approval.mutate({
  account,
  amount,
  paymentTokenAddress,
  spenderAddress: registrarAddress,
});
```

`amount` is expressed in token atomic units. See
the [Transactions guide](/docs/guides/transactions) for execution options.

## Parameters

```ts
interface UseApprovePaymentTokenParameters {
  mutation?: UseMutationOptions;
}
```

TanStack mutation callbacks and options are passed through `mutation`.

## Mutation Variables

`ApprovePaymentTokenVariables` combines:

- `account`: token owner
- `amount`: allowance in atomic units
- `paymentTokenAddress`: ERC-20 contract
- `spenderAddress`: contract receiving the allowance
- `execution`: optional transaction execution settings

## Return Type

`UseMutationResult<ExecuteContractWritesResult, ApprovePaymentTokenError, ApprovePaymentTokenVariables>`

## Action

Uses
[`preparePaymentTokenApprovalWrite`](../actions/write/prepare-write-payment-token-approval).
