# prepareNameRenewalPaymentStatusRead

Prepares one multicall plan for a renewal quote, payment-token balance, and
allowance granted to the registrar.

```ts
const prepared = prepareNameRenewalPaymentStatusRead({
  account,
  duration: 31_557_600n,
  ethRegistryAddress,
  input: "example.eth",
  network: "testnet",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isOk()) {
  const payment = await executeContractReads(publicClient, prepared.value);
}
```

The selected result contains quote fields plus `balance`, `allowance`,
`hasSufficientBalance`, and `hasSufficientAllowance`.

## Errors

Preparation returns the renewal-price preparation errors plus:

- `INVALID_ACCOUNT_ADDRESS`

Execution can return:

- `CONTRACT_READ_FAILED`
- `NAME_NOT_RENEWABLE`
