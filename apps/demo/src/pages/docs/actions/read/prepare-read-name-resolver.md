---
title: prepareNameResolverRead
description: Prepare a Universal Resolver lookup for an ENS name.
---

# prepareNameResolverRead

Prepares a Universal Resolver v2 `findResolver` read for a normalized ENS name.

## Import

```ts
import { prepareNameResolverRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareNameResolverRead({
  input: "example.eth",
  universalResolverAddress,
});

if (prepared.isOk()) {
  const result = await executeContractRead(publicClient, prepared.value);
  const resolverAddress = result.isOk() ? result.value[0] : undefined;
}
```

## Parameters

```ts
interface PrepareNameResolverReadParameters {
  input: string | null | undefined;
  universalResolverAddress: Address;
}
```

## Return Type

`Result<PreparedNameResolverRead, PrepareNameResolverReadError>`

The executed request returns the resolver address, namehash, and DNS offset.
