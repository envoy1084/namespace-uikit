---
title: useNameRecords
description: Read a selected set of ENS records through the Universal Resolver.
---

# useNameRecords

Reads an explicit set of ENS records through the Universal Resolver. Resolver
requests execute independently to preserve wildcard resolution and CCIP Read.

## Import

```ts
import { useNameRecords } from "ens-components/hooks";
```

## Usage

```tsx
const profile = useNameRecords({
  input: "example.eth",
  records: {
    addresses: ["60", "0"],
    contenthash: true,
    text: ["avatar", "description", "url"],
  },
});
```

## Parameters

```ts
interface UseNameRecordsParameters<selectData = NameRecordsResult> {
  input: string | null | undefined;
  records: NameRecordSelection;
  universalResolverAddress?: Address;
  query?: Omit<
    UseQueryOptions<NameRecordsResult, NameRecordsError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

### input

`string | null | undefined`

ENS name to resolve.

### records

`NameRecordSelection`

```ts
interface NameRecordSelection {
  abi?: readonly string[];
  addresses?: readonly string[];
  contenthash?: boolean;
  data?: readonly string[];
  interfaces?: readonly Hex[];
  name?: boolean;
  pubkey?: boolean;
  text?: readonly string[];
}
```

ABI content types and address coin types use unsigned decimal strings. Data and
text arrays contain record keys. Interface identifiers are four-byte hex
values.

### universalResolverAddress

`Address | undefined`

Defaults to the provider configuration.

### query

TanStack Query options, excluding `queryFn` and `queryKey`.

## Return Type

`UseQueryResult<NameRecordsResult, NameRecordsError>`

```ts
interface NameRecordsResult {
  name: string;
  node: Hex;
  records: NameProfileFormValues;
  requestedRecords: NormalizedNameRecordSelection;
  resolverAddress: Address;
}
```

`records` uses the same normalized shape accepted by `NameProfileEditor`.
Unrequested categories remain empty and can be distinguished through
`requestedRecords`.

The query is disabled until a public client, valid name, valid Universal
Resolver address, and non-empty record selection are available.

## Action

Uses [`prepareNameRecordsRead`](/docs/actions/read-name-records) and
`executeContractReadsIndividually`.
