---
title: useNameProfile
description: Read ENS profile records, resolver data, and indexed domain metadata.
---

# useNameProfile

Returns ENS profile records, resolver data, and indexed domain metadata.

The hook uses the configured ENS GraphQL indexer only to discover text keys,
coin types, ABI content types, interface identifiers, and domain metadata. All
record values are read through the Universal Resolver.

## Import

```ts
import { useNameProfile } from "ens-components/hooks";
```

## Usage

```tsx
const profile = useNameProfile({
  input: "example.eth",
});
```

## Parameters

```ts
interface UseNameProfileParameters<selectData = NameProfileResult> {
  additionalRecords?: NameRecordSelection;
  indexerUrl?: string;
  input: string | null | undefined;
  universalResolverAddress?: Address;
  query?: Omit<
    UseQueryOptions<NameProfileResult, NameProfileError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

### additionalRecords

`NameRecordSelection | undefined`

Records to merge with indexer discovery. Use this for arbitrary data keys and
other records that should always be read.

```tsx
const profile = useNameProfile({
  input: "example.eth",
  additionalRecords: {
    data: ["agent-context"],
    text: ["com.example.custom"],
  },
});
```

Additional arrays are merged with discovery. `contenthash`, `name`, and
`pubkey` default to `true` because they do not need key discovery. Set a scalar
to `false` to skip it.

### indexerUrl

`string | undefined`

Defaults to `indexerUrl` from `EnsProvider`.

### input

`string | null | undefined`

ENS name to read.

### universalResolverAddress

`Address | undefined`

Defaults to the provider configuration.

### query

TanStack Query options, excluding `queryFn` and `queryKey`.

## Return Type

`UseQueryResult<NameProfileResult, NameProfileError>`

```ts
interface NameProfileResult extends NameRecordsResult {
  discovery: NameProfileRecordDiscovery;
  domain: NameProfileDomain;
  indexer: NameProfileIndexerState;
}
```

`records` and the top-level `resolverAddress` are canonical Universal Resolver
results. `domain` is the indexed snapshot and contains:

- owner, registrant, wrapped owner, and resolved addresses
- indexed resolver and subregistry information
- registration, expiry, wrapper, and grace-period timestamps
- v1 or v2 protocol, migration, normalization, wrapping, and reachability
- token identifiers, fuse state, subdomain count, event count, and role-holder
  count

`indexer.blockNumber` identifies the indexed snapshot. Ownership and
authorization should be checked directly onchain before submitting a
permission-sensitive transaction.

## Actions

Uses
[`prepareNameProfileDiscoveryRead`](/docs/actions/read-name-profile-discovery),
[`prepareNameRecordsRead`](/docs/actions/read-name-records), and the
generic read executors.
