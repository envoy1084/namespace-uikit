---
title: useCommitName
description: Submit an ENS v2 name commitment.
---

# useCommitName

Prepares and submits an ENS v2 `.eth` commitment.

## Import

```ts
import { useCommitName } from "ens-components/hooks";
```

## Usage

```tsx
const commit = useCommitName();
commit.mutate({
  account,
  duration,
  input: "example.eth",
  owner: account,
  referrer,
  resolverAddress,
  secret,
  subregistryAddress,
});
```

The commitment inputs must exactly match the later registration inputs.

## Parameters

```ts
interface UseCommitNameParameters {
  mutation?: UseMutationOptions;
  registrarAddress?: Address;
}
```

`registrarAddress` defaults to the provider configuration. TanStack mutation
options are passed through `mutation`.

## Mutation Variables

`CommitNameVariables` includes `account`, `duration`, `input`, `owner`,
`referrer`, `resolverAddress`, `secret`, `subregistryAddress`, and optional
`execution`.

## Return Type

`UseMutationResult<ExecuteContractWritesResult, CommitNameError, CommitNameVariables>`

## Action

Uses [`prepareCommitNameWrite`](../actions/write/prepare-write-commit-name).
See [Transactions](/docs/guides/transactions) for execution strategies.
