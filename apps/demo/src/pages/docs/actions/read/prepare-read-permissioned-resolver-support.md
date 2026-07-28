# preparePermissionedResolverSupportRead

Prepares an ERC-165 `supportsInterface` read for ENS v2
`IPermissionedResolver`.

```ts
const prepared = preparePermissionedResolverSupportRead({
  network: "testnet",
  resolverAddress,
});

if (prepared.isOk()) {
  const support = await executeContractRead(publicClient, prepared.value);
}
```

The selected result is `true` only when the resolver advertises the required
permission interface.
