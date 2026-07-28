# preparePermissionedResolverVerificationRead

Prepares a `VerifiableFactory.verifyContract` read for a deployed
`PermissionedResolver` proxy.

```ts
const prepared = preparePermissionedResolverVerificationRead({
  factoryAddress,
  implementationAddress,
  network: "testnet",
  resolverAddress,
});

if (prepared.isOk()) {
  const verified = await executeContractRead(publicClient, prepared.value);
}
```

The executed read returns `true` only when the factory verifies that
`resolverAddress` uses the supplied implementation.

## Preparation errors

- `INVALID_FACTORY_ADDRESS`
- `INVALID_IMPLEMENTATION_ADDRESS`
- `INVALID_RESOLVER_ADDRESS`

## Execution errors

- `CONTRACT_READ_FAILED`
