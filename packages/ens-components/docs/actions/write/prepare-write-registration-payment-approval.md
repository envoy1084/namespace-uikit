# prepareRegistrationPaymentApprovalWrite

Prepares an ERC-20 approval for the registrar.

```ts
const approval = prepareRegistrationPaymentApprovalWrite({
  account,
  amount,
  network: "testnet",
  paymentTokenAddress,
  registrarAddress,
});
```

The prepared call approves exactly `amount`. Execute it with
`executeContractWrites`.

## Errors

- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_APPROVAL_AMOUNT`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_REGISTRAR_ADDRESS`
