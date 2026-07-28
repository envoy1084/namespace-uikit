# prepareProfileRecordsWrite

Encodes profile record changes into one atomic ENS v2
`multicallWithNodeCheck` transaction and simulates it from the supplied
account.

```ts
const prepared = await prepareProfileRecordsWrite(publicClient, {
  account,
  changes,
  input: "example.eth",
  network: "testnet",
  resolverAddress,
});

if (prepared.isOk()) {
  const result = await executeContractWrites(walletClient, publicClient, {
    calls: [prepared.value],
    chain,
    confirmation: "confirmed",
    strategy: "single",
  });
}
```

`changes` accepts every `NameProfileRecordChange` variant: text, address,
contenthash, ABI, data, interface, name, and public key. A `null` value removes
the corresponding record.

Simulation verifies the exact encoded calls, account permissions, resolver,
and node before a wallet prompt is opened.

## Errors

- Name parsing errors
- `EMPTY_PROFILE_CHANGES`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_PROFILE_RECORDS`
- `INVALID_RESOLVER_ADDRESS`
- `PROFILE_UPDATE_SIMULATION_FAILED`
