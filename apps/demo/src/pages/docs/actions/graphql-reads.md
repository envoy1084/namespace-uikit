---
title: GraphQL Reads
description: Execute prepared GraphQL reads with Neverthrow errors.
---

# GraphQL Reads

Executes GraphQL requests returned by prepare discovery actions.

## Import

```ts [import.ts]
import { executeGraphQLRead } from "ens-components/actions";
```

## Usage

```ts [profile-discovery.ts]
const prepared = prepareNameProfileDiscoveryRead({
  indexerUrl: "https://graphql.ens.dev/graphql",
  input: "example.eth",
});

if (prepared.isOk()) {
  const result = await executeGraphQLRead(prepared.value);
}
```

## Parameters

### prepared

`PreparedGraphQLRead`

The URL, document, variables, response decoder, and metadata returned by a
prepare action.

### options

`{ signal?: AbortSignal }`

Optional fetch cancellation.

## Return Type

`ResultAsync<TResult, "GRAPHQL_READ_FAILED" | TDecodeError>`

## Error

HTTP, GraphQL, network, and unexpected response failures return
`GRAPHQL_READ_FAILED`. The prepared decoder can return additional domain error
codes.
