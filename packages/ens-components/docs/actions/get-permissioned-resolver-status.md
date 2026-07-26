# getPermissionedResolverStatus

Checks whether a predicted resolver is deployed and verified against the
expected implementation.

The action first checks resolver bytecode. When deployed, it prepares the
factory `verifyContract` read with
`preparePermissionedResolverVerificationRead` and executes it through the
generic read executor.

```ts
import { getPermissionedResolverStatus } from "ens-components";

const result = await getPermissionedResolverStatus(publicClient, {
  factoryAddress,
  implementationAddress,
  network: "testnet",
  resolverAddress,
});

if (result.isOk()) {
  // "NOT_DEPLOYED", "VERIFIED", or "INVALID"
  console.log(result.value);
}
```

## Signature

```ts
function getPermissionedResolverStatus(
  publicClient: PublicClient,
  props: GetPermissionedResolverStatusProps,
): ResultAsync<PermissionedResolverStatus, GetPermissionedResolverStatusError>;
```

`INVALID` means bytecode exists at the address, but the factory does not verify
it against the supplied implementation.

## Errors

- `CONTRACT_READ_FAILED`
- `INVALID_FACTORY_ADDRESS`
- `INVALID_IMPLEMENTATION_ADDRESS`
- `INVALID_RESOLVER_ADDRESS`
