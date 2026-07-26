# isResolverDeployed

Checks whether a custom resolver address contains deployed bytecode.

```ts
import { isResolverDeployed } from "ens-components";

const result = await isResolverDeployed(publicClient, {
  network: "testnet",
  resolverAddress,
});
```

## Signature

```ts
function isResolverDeployed(
  publicClient: PublicClient,
  props: IsResolverDeployedProps,
): ResultAsync<boolean, IsResolverDeployedError>;
```

A `true` result only proves that the address is a contract. It does not prove
that the contract implements a specific resolver interface or grants the
caller permission to update records.

## Errors

- `CONTRACT_READ_FAILED`
- `INVALID_RESOLVER_ADDRESS`
