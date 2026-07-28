---
title: useRegisterName
description: Register a committed ENS v2 name.
---

# useRegisterName

Registers a previously committed ENS v2 `.eth` name.

## Import

```ts
import { useRegisterName } from "ens-components/hooks";
```

## Usage

```tsx
const registration = useRegisterName();
registration.mutate({
  account,
  duration,
  input: "example.eth",
  owner: account,
  paymentTokenAddress,
  referrer,
  resolverAddress,
  secret,
  subregistryAddress,
});
```

Commitment-sensitive values must exactly match those passed to
`useCommitName`.

## Parameters

```ts
interface UseRegisterNameParameters {
  mutation?: UseMutationOptions;
  registrarAddress?: Address;
}
```

`registrarAddress` defaults to the provider configuration.

## Mutation Variables

`RegisterNameVariables` includes the commitment fields plus `account`,
`paymentTokenAddress`, and optional `execution`.

## Return Type

`UseMutationResult<ExecuteContractWritesResult, RegisterNameError, RegisterNameVariables>`

## Action

Uses [`prepareRegisterNameWrite`](../actions/write/prepare-write-register-name).
