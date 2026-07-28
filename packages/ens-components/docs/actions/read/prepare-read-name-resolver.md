# prepareNameResolverRead

Prepares a Universal Resolver v2 `findResolver` read for a normalized ENS name.
It does not execute the request.

```ts
const prepared = prepareNameResolverRead({
  input: "example.eth",
  network: "testnet",
  universalResolverAddress,
});

if (prepared.isOk()) {
  const result = await executeContractRead(publicClient, prepared.value);
  const resolverAddress = result.isOk() ? result.value[0] : undefined;
}
```

`universalResolverAddress` should normally come from `EnsProvider`
configuration. The result also contains the resolver's DNS offset.
