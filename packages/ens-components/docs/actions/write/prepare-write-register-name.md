# prepareRegisterNameWrite

Validates the reveal parameters and prepares the registrar `register` write.
The inputs must match the original commitment exactly.

```ts
const registration = prepareRegisterNameWrite({
  account,
  duration,
  input: "example.eth",
  network: "testnet",
  owner: account,
  paymentTokenAddress,
  referrer,
  registrarAddress,
  resolverAddress,
  secret,
  subregistryAddress,
});

if (registration.isOk()) {
  const result = await executeContractWrites(walletClient, publicClient, {
    calls: [registration.value],
    chain,
    strategy: "single",
  });
}
```

The prepared metadata contains the normalized label. Errors are uppercase
validation codes from `makeNameCommitment` plus account, registrar, and
payment-token address errors.
