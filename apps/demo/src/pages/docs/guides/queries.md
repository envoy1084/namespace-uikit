---
title: Queries
description: Configure ENS Components TanStack Query hooks.
---

# Queries

Read hooks return standard TanStack Query results and accept query options
under the `query` property.

```tsx
const profile = useNameProfile({
  input: name,
  query: {
    enabled: name.endsWith(".eth"),
    staleTime: 30_000,
  },
});
```

## Managed options

Hooks own `queryKey` and `queryFn`. These options cannot be overridden.
All other supported `UseQueryOptions` values can be passed through `query`.

## Select data

Use `select` to transform cached data for a component.

```tsx
const resolverAddress = useNameProfile({
  input: name,
  query: {
    select: (profile) => profile.resolverAddress,
  },
});
```

The hook's `data` type is inferred from the selector return type.

## Disabled queries

Hooks disable themselves when required input is missing or invalid. A
caller-supplied `query.enabled: false` also disables execution.

Name-input hooks debounce input where documented. Their query keys include the
chain, contract overrides, and normalized inputs that affect the result.

## Query client

Use TanStack Query APIs for invalidation and cache inspection.

```ts
await queryClient.invalidateQueries({
  queryKey: ["ens"],
});
```

The first query-key segment is always `"ens"`.
