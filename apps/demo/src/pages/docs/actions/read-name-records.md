---
title: readNameRecords
description: Read selected ENS records through the Universal Resolver.
---

# readNameRecords

Validates a record selection, resolves each value through the Universal
Resolver, and decodes the result into profile form values.

## Import

```ts
import { readNameRecords } from "ens-components/actions";
```

## Usage

```ts
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

```ts
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

## Prepare the Read

`prepareNameRecordsRead` returns one typed Universal Resolver request per
selected record.
