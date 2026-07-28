# preparePaymentTokenApprovalWrite

Prepares an ERC-20 approval for any payment-token spender.

```ts
const approval = preparePaymentTokenApprovalWrite({
  account,
  amount,
  network: "testnet",
  paymentTokenAddress,
  spenderAddress: registrarAddress,
});
```

The prepared call approves exactly `amount`. Execute it with
`executeContractWrites`.

## Errors

- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_APPROVAL_AMOUNT`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_SPENDER_ADDRESS`
