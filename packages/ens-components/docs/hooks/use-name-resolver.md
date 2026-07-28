# useNameResolver

Discovers the resolver currently serving an ENS name.

```tsx
import { useNameResolver } from "ens-components/hooks";

const resolver = useNameResolver({ input: "example.eth" });
```

## Parameters

```ts
interface UseNameResolverParameters<selectData = NameResolverReadResult> {
  input: string | null | undefined;
  universalResolverAddress?: Address;
  query?: Omit<
    UseQueryOptions<NameResolverReadResult, NameResolverError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

The Universal Resolver defaults to `EnsProvider`. Input is normalized before
querying.

## Result

```ts
interface NameResolverReadResult {
  name: string;
  node: Hex;
  offset: bigint;
  resolverAddress: Address;
}
```
