---
title: prepareNameProfileDiscoveryRead
description: Prepare an ENS indexer request for domain and record discovery.
---

# prepareNameProfileDiscoveryRead

Prepares a GraphQL request for indexed ENS domain metadata and record-key
discovery.

## Import

```ts
import { prepareNameProfileDiscoveryRead } from "ens-components/actions";
```

## Usage

```ts
import { executeGraphQLRead } from "ens-components/actions";

const prepared = prepareNameProfileDiscoveryRead({
  indexerUrl: "https://graphql.ens.dev/graphql",
  input: "example.eth",
});

if (prepared.isErr()) throw prepared.error;

const result = await executeGraphQLRead(prepared.value);
```

## Parameters

```ts
interface PrepareNameProfileDiscoveryReadParameters {
  indexerUrl: string;
  input: string | null | undefined;
}
```

## Return Type

`Result<PreparedNameProfileDiscoveryRead, PrepareNameProfileDiscoveryReadError>`

The decoded result contains:

- text-record keys
- address coin types
- ABI content types
- interface identifiers
- owner, registrant, resolver, subregistry, registration, expiry, protocol,
  migration, token, and reachability metadata
- indexer block number and indexing-error state

It intentionally does not request text, address, ABI, or interface values.
Use `prepareNameRecordsRead` to retrieve values through the Universal Resolver.

`executeGraphQLRead` accepts an optional `AbortSignal`:

```ts
executeGraphQLRead(prepared.value, { signal });
```
