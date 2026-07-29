---
title: readNameRecords
description: Read selected ENS records through the Universal Resolver.
---

# readNameRecords

Validates a record selection, resolves each value through the Universal
Resolver, and decodes the result into profile form values.

## Import

```ts [import.ts]
import { readNameRecords } from "ens-components/actions";
```

## Usage

```ts [records.ts]
const result = await readNameRecords(publicClient, {
  input: "example.eth",
  records: {
    addresses: ["60"],
    contenthash: true,
    text: ["avatar", "description"],
  },
  universalResolverAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

### publicClient

`PublicClient`

The Viem client used for Universal Resolver calls.

### parameters

```ts [types.ts]
interface ReadNameRecordsParameters {
  input: string | null | undefined;
  records: NameRecordSelection;
  universalResolverAddress: Address;
}
```

## Return Type

`ResultAsync<NameRecordsResult, ReadNameRecordsErrorType>`

`NameRecordsResult` contains the normalized name, namehash, canonical resolver
address, normalized selection, and decoded `NameProfileFormValues`.

Universal Resolver calls execute independently so each request can complete
its own CCIP Read flow.

## Error

Returns selection and name validation codes, resolver response decoding codes,
or `CONTRACT_READ_FAILED`.

## Prepare

`prepareNameRecordsRead` returns one typed Universal Resolver request per
selected record. Execute these requests individually to preserve each CCIP Read
flow. See [Batching](/docs/guides/batching).
