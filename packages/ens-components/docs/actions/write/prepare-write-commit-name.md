# prepareCommitNameWrite

Validates commitment-bound registration input and prepares the registrar
`commit(bytes32)` write. No transaction is submitted.

```ts
const prepared = prepareCommitNameWrite({
  account,
  duration,
  input: "example.eth",
  network: "testnet",
  owner: account,
  referrer,
  registrarAddress,
  resolverAddress,
  secret,
  subregistryAddress,
});

if (prepared.isOk()) {
  const result = await executeContractWrites(walletClient, publicClient, {
    calls: [prepared.value],
    chain,
    strategy: "single",
  });
}
```

The prepared metadata contains the commitment hash and normalized label.
Persist every commitment-bound input unchanged for the reveal transaction.

Errors are uppercase validation codes from `makeNameCommitment` plus
`INVALID_ACCOUNT_ADDRESS` and `INVALID_REGISTRAR_ADDRESS`.
