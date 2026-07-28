# prepareNameProfilePermissionsRead

Prepares the batched Enhanced Access Control reads needed to determine whether
an account can update specific records on an ENS v2 permissioned resolver.

```ts
const prepared = prepareNameProfilePermissionsRead({
  account,
  input: "example.eth",
  network: "testnet",
  resolverAddress,
  requests: [
    { type: "text", key: "avatar" },
    { type: "address", key: "60" },
    { type: "contenthash" },
  ],
});

if (prepared.isOk()) {
  const permissions = await executeContractReads(publicClient, prepared.value);
}
```

The selected result includes `name`, `node`, `resolverAddress`, and a boolean
permission map. It checks name-wide roles and the fine-grained name/key,
name/coin-type, global key, and global coin-type resources supported by the
resolver.

Use `getNameProfilePermissionId(request)` to obtain a map key or
`canEditNameProfileRecord(result, request)` to read a boolean directly.
