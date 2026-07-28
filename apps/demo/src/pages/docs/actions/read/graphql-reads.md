---
title: GraphQL Reads
description: Execute prepared ENS indexer requests.
---

# GraphQL Reads

`PreparedGraphQLRead` describes a request, variables, response decoder, and
metadata without sending a network request.

## Import

```ts
import { executeGraphQLRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareNameProfileDiscoveryRead({
  indexerUrl: "https://graphql.ens.dev/graphql",
  input: "example.eth",
});

if (prepared.isOk()) {
  const result = await executeGraphQLRead(prepared.value);
}
```

## executeGraphQLRead

Executes one prepared GraphQL request with `fetch`, checks the HTTP and GraphQL
responses, then decodes the result.

```ts
executeGraphQLRead(prepared, { signal });
```

The result is `Result<value, "GRAPHQL_READ_FAILED" | decodeError>`.
