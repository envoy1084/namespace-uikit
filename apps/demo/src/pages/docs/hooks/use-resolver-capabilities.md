# useResolverCapabilities

Checks whether a resolver is deployed, implements the ENS v2 permissioned
resolver interface, and is a verified proxy deployment.

```tsx
import { useResolverCapabilities } from "ens-components/hooks";

const capabilities = useResolverCapabilities({ resolverAddress });
```

Factory and implementation addresses default to `EnsProvider`.

## Result

```ts
interface ResolverCapabilities {
  isDeployed: boolean;
  isPermissionedResolver: boolean;
  isVerifiedDeployment: boolean;
  resolverAddress: Address;
  status: "NOT_DEPLOYED" | "UNSUPPORTED" | "UNVERIFIED" | "VERIFIED";
}
```

Pass TanStack options through `query`. The query is disabled when the resolver
address or public client is unavailable.
