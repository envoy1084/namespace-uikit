# prepareRenewNameWrite

Prepares an ENS v2 `ETHRegistrar.renew` call for a second-level `.eth` name.

```ts
const renewal = prepareRenewNameWrite({
  account,
  duration: 31_557_600n,
  input: "example.eth",
  network: "testnet",
  paymentTokenAddress,
  referrer: zeroHash,
  registrarAddress,
});
```

The account pays for the renewal but does not need to own the name. `duration`
is added to the current onchain expiry. Execute the prepared write with
`executeContractWrites`.

## Errors

Preparation can return name parsing errors plus:

- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_DURATION`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_REFERRER`
- `INVALID_REGISTRAR_ADDRESS`
- `UNSUPPORTED_NAME`
