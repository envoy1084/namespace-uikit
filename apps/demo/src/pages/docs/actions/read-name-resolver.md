---
title: readNameResolver
description: Read the resolver serving an ENS name.
---

# readNameResolver

Calls `UniversalResolverV2.findResolver` for a normalized ENS name.

## Import

```ts [import.ts]
import { readNameResolver } from "ens-components/actions";
```

## Usage

```ts [resolver.ts]
const result = await readNameResolver(publicClient, {
  input: "example.eth",
  universalResolverAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

### publicClient

`PublicClient`

The Viem client used to call Universal Resolver v2.

### parameters

```ts [types.ts]
interface ReadNameResolverParameters {
  input: string | null | undefined;
  universalResolverAddress: Address;
}
```

## Return Type

`ResultAsync<NameResolverResult, ReadNameResolverErrorType>`

```ts [result.ts]
interface NameResolverResult {
  name: string;
  node: Hex;
  offset: bigint;
  resolverAddress: Address;
}
```

## Error

Returns name and address validation codes, resolver lookup codes, or
`CONTRACT_READ_FAILED`.

## Prepare

`prepareNameResolverRead` returns the ABI-inferred request and normalized-name
metadata without accessing an RPC endpoint. See
[Batching](/docs/guides/batching).
