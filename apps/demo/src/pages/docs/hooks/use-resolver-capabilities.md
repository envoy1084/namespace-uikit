---
title: useResolverCapabilities
description: Inspect an ENS v2 resolver deployment and interface support.
---

# useResolverCapabilities

Checks whether a resolver is deployed, supports the ENS v2 permissioned
resolver interface, and is a verified proxy deployment.

## Import

```ts
import { useResolverCapabilities } from "ens-components/hooks";
```

## Usage

```tsx
const capabilities = useResolverCapabilities({ resolverAddress });
```

## Parameters

```ts
interface UseResolverCapabilitiesParameters<selectData = ResolverCapabilities> {
  factoryAddress?: Address;
  implementationAddress?: Address;
  resolverAddress: Address | null | undefined;
  query?: Omit<
    UseQueryOptions<ResolverCapabilities, ResolverCapabilitiesError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

Factory and implementation addresses default to the provider configuration.
The query is disabled until a non-zero resolver address and public client are
available.

## Return Type

`UseQueryResult<ResolverCapabilities, ResolverCapabilitiesError>`

```ts
interface ResolverCapabilities {
  isDeployed: boolean;
  isPermissionedResolver: boolean;
  isVerifiedDeployment: boolean;
  resolverAddress: Address;
  status: "NOT_DEPLOYED" | "UNSUPPORTED" | "UNVERIFIED" | "VERIFIED";
}
```

## Actions

Uses
[`preparePermissionedResolverSupportRead`](../actions/read/prepare-read-permissioned-resolver-support)
and
[`preparePermissionedResolverVerificationRead`](../actions/read/prepare-read-permissioned-resolver-verification).
