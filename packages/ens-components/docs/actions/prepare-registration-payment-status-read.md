# prepareRegistrationPaymentStatusRead

Prepares one multicall plan for registration availability, price, token
decimals, wallet balance, and registrar allowance.

```ts
const prepared = prepareRegistrationPaymentStatusRead({
  account,
  duration,
  input: "example.eth",
  network: "testnet",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isOk()) {
  const status = await executeContractReadPlan(publicClient, prepared.value);
}
```

The selected result includes `hasSufficientBalance` and
`hasSufficientAllowance` in addition to the raw balance, allowance, and price
fields.

Preparation can return name-price validation errors or
`INVALID_ACCOUNT_ADDRESS`. Execution can return `CONTRACT_READ_FAILED` or
`NAME_NOT_AVAILABLE`.
