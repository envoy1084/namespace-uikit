---
title: readNameProfileDiscovery
description: Discover indexed ENS domain metadata and record keys.
---

# readNameProfileDiscovery

Queries the configured ENS GraphQL indexer for domain metadata and the record
keys present on a name.

## Import

```ts
import { readNameProfileDiscovery } from "ens-components/actions";
```

## Usage

```ts
const result = await readNameProfileDiscovery({
  indexerUrl: "https://graphql.ens.dev/graphql",
  input: "example.eth",
  signal,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface ReadNameProfileDiscoveryParameters {
  indexerUrl: string;
  input: string | null | undefined;
  signal?: AbortSignal;
}
```

## Return Type

`ResultAsync<NameProfileDiscoveryResult, ReadNameProfileDiscoveryErrorType>`

The result contains domain ownership and registration metadata, discovered
text keys and coin types, ABI content types, interface IDs, and indexer state.
Record values are not returned. Use
[`readNameRecords`](/docs/actions/read-name-records) to resolve them onchain.

## Prepare the Read

`prepareNameProfileDiscoveryRead` returns a `PreparedGraphQLRead` without
sending a request.
