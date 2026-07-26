# prepareNamePriceRead

Prepares one multicall plan for name availability, registration price, and
payment-token decimals.

```ts
const prepared = prepareNamePriceRead({
  duration,
  input: "example.eth",
  network: "testnet",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isOk()) {
  const price = await executeContractReadPlan(publicClient, prepared.value);
}
```

`NamePrice` contains `base`, `premium`, `total`, and `decimals`. Amounts use
the payment token's atomic units.

## Preparation errors

- Name parsing and availability-input errors
- `INVALID_DURATION`
- `INVALID_PAYMENT_TOKEN_ADDRESS`

## Execution errors

- `CONTRACT_READ_FAILED`
- `NAME_NOT_AVAILABLE`
