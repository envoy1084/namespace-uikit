---
title: useNameResolver
description: Discover the resolver currently serving an ENS name.
---

# useNameResolver

Discovers the resolver currently serving an ENS name through the Universal
Resolver.

## Import

```ts
import { useNameResolver } from "ens-components/hooks";
```

## Usage

```tsx
const resolver = useNameResolver({ input: "example.eth" });
```

## Parameters

```ts
interface UseNameResolverParameters<selectData = NameResolverResult> {
  input: string | null | undefined;
  universalResolverAddress?: Address;
  query?: Omit<
    UseQueryOptions<NameResolverResult, NameResolverError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

`universalResolverAddress` defaults to the provider configuration. The query
is disabled until the input is valid and a public client is available.

## Return Type

`UseQueryResult<NameResolverResult, NameResolverError>`

```ts
interface NameResolverResult {
  name: string;
  node: Hex;
  offset: bigint;
  resolverAddress: Address;
}
```

## Action

Uses [`prepareNameResolverRead`](../actions/read/prepare-read-name-resolver)
and `executeContractRead`.
