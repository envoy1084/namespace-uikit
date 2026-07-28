# prepareNameRenewalPriceRead

Prepares one multicall plan that reads renewable status, current expiry,
renewal price, and payment-token decimals.

```ts
const prepared = prepareNameRenewalPriceRead({
  duration: 31_557_600n,
  ethRegistryAddress,
  input: "example.eth",
  network: "testnet",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isOk()) {
  const quote = await executeContractReads(publicClient, prepared.value);
}
```

`duration` is the number of seconds added to the current expiry. The selected
result contains `currentExpiry`, `newExpiry`, `duration`, `total`, and
`decimals`.

## Errors

Preparation can return name parsing errors plus:

- `INVALID_DURATION`
- `INVALID_ETH_REGISTRY_ADDRESS`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_REGISTRAR_ADDRESS`
- `UNSUPPORTED_NAME`

Execution can return:

- `CONTRACT_READ_FAILED`
- `NAME_NOT_RENEWABLE`
