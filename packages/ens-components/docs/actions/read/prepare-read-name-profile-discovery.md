# prepareNameProfileDiscoveryRead

Prepares a GraphQL request for indexed ENS domain metadata and profile-record
discovery.

```ts
import {
  executeGraphqlRead,
  prepareNameProfileDiscoveryRead,
} from "ens-components/actions";

const prepared = prepareNameProfileDiscoveryRead({
  indexerUrl: "https://graphql.ens.dev/graphql",
  input: "example.eth",
  network: "testnet",
});

if (prepared.isErr()) throw new Error(prepared.error);

const result = await executeGraphqlRead(prepared.value);
```

The result contains:

- text-record keys
- address coin types
- ABI content types
- interface identifiers
- owner, registrant, resolver, subregistry, registration, expiry, protocol,
  migration, token, and reachability metadata
- indexer block number and indexing-error state

It intentionally does not request text, address, ABI, or interface values.
Use `prepareNameRecordsRead` to retrieve values through the Universal Resolver.

`executeGraphqlRead` accepts an optional `AbortSignal`:

```ts
executeGraphqlRead(prepared.value, { signal });
```
