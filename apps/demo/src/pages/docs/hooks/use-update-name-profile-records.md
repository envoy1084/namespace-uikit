---
title: useUpdateNameProfileRecords
description: Update ENS profile records through a PermissionedResolver multicall.
---

# useUpdateNameProfileRecords

Simulates and submits one PermissionedResolver multicall containing profile
record changes.

## Import

```ts
import { useUpdateNameProfileRecords } from "ens-components/hooks";
```

## Usage

```tsx
const update = useUpdateNameProfileRecords();
update.mutate({
  account,
  changes,
  input: "example.eth",
  resolverAddress,
});
```

`changes` accepts the same `NameProfileRecordChange[]` produced by
`diffProfileRecords`. Empty or invalid change sets fail during preparation.

## Parameters

```ts
interface UseUpdateNameProfileRecordsParameters {
  mutation?: UseMutationOptions;
}
```

## Mutation Variables

`UpdateNameProfileRecordsVariables` includes `account`, `changes`, `input`,
`resolverAddress`, and optional `execution`.

## Return Type

`UseMutationResult<ExecuteContractWritesResult, UpdateNameProfileRecordsError, UpdateNameProfileRecordsVariables>`

Check authorization with `useNameProfilePermissions` before enabling writes.

## Action

Uses
[`prepareNameProfileRecordsWrite`](/docs/actions/update-name-profile-records).
