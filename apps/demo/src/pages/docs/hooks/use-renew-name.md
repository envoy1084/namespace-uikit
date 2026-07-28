---
title: useRenewName
description: Renew an ENS v2 .eth name.
---

# useRenewName

Prepares and submits an ENS v2 `.eth` renewal.

## Import

```ts
import { useRenewName } from "ens-components/hooks";
```

## Usage

```tsx
const renewal = useRenewName();
renewal.mutate({
  account,
  duration,
  input: "example.eth",
  paymentTokenAddress,
  referrer,
});
```

`duration` is the number of seconds added to the current expiry. The registrar
defaults to the provider configuration.

## Parameters

```ts
interface UseRenewNameParameters {
  mutation?: UseMutationOptions;
  registrarAddress?: Address;
}
```

## Mutation Variables

`RenewNameVariables` includes `account`, `duration`, `input`,
`paymentTokenAddress`, `referrer`, and optional `execution`.

## Return Type

`UseMutationResult<ExecuteContractWritesResult, RenewNameError, RenewNameVariables>`

Token approval is a separate write. See
[Transactions](/docs/guides/transactions) for composing both calls.

## Action

Uses [`prepareRenewNameWrite`](/docs/actions/renew-name).
