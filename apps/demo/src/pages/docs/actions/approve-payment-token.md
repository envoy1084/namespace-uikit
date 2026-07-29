---
title: approvePaymentToken
description: Approve an ERC-20 payment token allowance.
---

# approvePaymentToken

Validates and submits `ERC20.approve`.

## Import

```ts [import.ts]
import { approvePaymentToken } from "ens-components/actions";
```

## Usage

```ts [approve.ts]
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

### walletClient

`WalletClient`

The connected Viem wallet client.

### publicClient

`PublicClient`

The Viem client used for simulation and confirmation.

### parameters

```ts [types.ts]
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

## Error

Returns validation, simulation, wallet, submission, confirmation, or revert
error codes.

## Prepare

Use `preparePaymentTokenApprovalWrite` when including the approval in
[`executeContractWrites`](/docs/actions/execute-contract-writes). See
[Batching](/docs/guides/batching).
