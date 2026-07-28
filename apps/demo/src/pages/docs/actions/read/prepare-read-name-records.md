---
title: prepareNameRecordsRead
description: Prepare Universal Resolver reads for selected ENS records.
---

# prepareNameRecordsRead

Validates a name and record selection, then prepares one Universal Resolver
request per selected record.

## Import

```ts
import { prepareNameRecordsRead } from "ens-components/actions";
```

## Usage

```ts
import { executeContractReadsIndividually } from "ens-components/actions";

const prepared = prepareNameRecordsRead({
  input: "example.eth",
  records: {
    addresses: ["60"],
    contenthash: true,
    text: ["avatar", "description"],
  },
  universalResolverAddress,
});

if (prepared.isErr()) throw prepared.error;

const result = await executeContractReadsIndividually(publicClient, prepared.value);
```

## Parameters

```ts
interface PrepareNameRecordsReadParameters {
  input: string | null | undefined;
  records: NameRecordSelection;
  universalResolverAddress: Address;
}
```

## Return Type

`Result<PreparedNameRecordsRead, PrepareNameRecordsReadError>`

The plan validates and normalizes ABI content types, coin types, record keys,
and interface identifiers.

Use `executeContractReadsIndividually` for this plan. Independent reads
preserve Universal Resolver CCIP Read behavior that cannot reliably pass
through Multicall3.

The decoded result is `NameRecordsResult`, including the canonical resolver
address, node, normalized selection, and `NameProfileFormValues`.
