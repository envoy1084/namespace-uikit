---
title: Actions
description: Framework-independent ENS v2 read and write preparation.
---

# Actions

Actions validate input and produce typed execution plans. They do not access a
wallet or RPC endpoint unless passed to an executor.

## Import

```ts
import {
  executeContractRead,
  executeContractWrites,
  prepareNameAvailabilityRead,
} from "ens-components/actions";
```

## Read actions

Read preparers return a contract or GraphQL request. Execute them with:

- `executeContractRead`
- `executeContractReads`
- `executeContractReadsIndividually`
- `executeGraphQLRead`

## Write actions

Write preparers return `PreparedContractWrite` values. Execute one or more
with `executeContractWrites`.

Actions return Neverthrow `Result` values. Preparation errors are string
literal unions and do not throw.
