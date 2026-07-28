---
title: useSetAddressRecord
description: Set the Ethereum address record on an ENS v2 resolver.
---

# useSetAddressRecord

Sets ENSIP-9 coin type `60` on an ENS v2 PermissionedResolver.

## Import

```ts
import { useSetAddressRecord } from "ens-components/hooks";
```

## Usage

```tsx
const addressRecord = useSetAddressRecord();
addressRecord.mutate({
  account,
  input: "example.eth",
  owner: account,
  resolverAddress,
});
```

## Parameters

```ts
interface UseSetAddressRecordParameters {
  mutation?: UseMutationOptions;
}
```

## Mutation Variables

`SetAddressRecordVariables` includes `account`, `input`, `owner`,
`resolverAddress`, and optional `execution`.

## Return Type

`UseMutationResult<ExecuteContractWritesResult, SetAddressRecordError, SetAddressRecordVariables>`

Use `useUpdateNameProfileRecords` for arbitrary coin types.

## Action

Uses
[`prepareSetAddressRecordWrite`](/docs/actions/set-address-record).
