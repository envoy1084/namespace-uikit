# prepareNameRegistrationPaymentStatusRead

Prepares one multicall plan for registration availability, price, token
decimals, wallet balance, and registrar allowance.

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

The selected result includes `hasSufficientBalance` and
`hasSufficientAllowance` in addition to the raw balance, allowance, and price
fields.

Preparation can return name-price validation errors or
`INVALID_ACCOUNT_ADDRESS`. Execution can return `CONTRACT_READ_FAILED` or
`NAME_NOT_AVAILABLE`.
