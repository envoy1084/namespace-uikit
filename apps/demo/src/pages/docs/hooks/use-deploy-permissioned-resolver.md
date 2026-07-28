---
title: useDeployPermissionedResolver
description: Deploy a verified ENS v2 PermissionedResolver proxy.
---

# useDeployPermissionedResolver

Simulates and deploys a verified ENS v2 PermissionedResolver proxy.

## Import

```ts
import { useDeployPermissionedResolver } from "ens-components/hooks";
```

## Usage

```tsx
const deployment = useDeployPermissionedResolver();
deployment.mutate({
  account,
  owner: account,
  salt,
});
```

Preparation simulates the factory call and validates the predicted resolver
address before wallet submission.

## Parameters

```ts
interface UseDeployPermissionedResolverParameters {
  factoryAddress?: Address;
  implementationAddress?: Address;
  mutation?: UseMutationOptions;
}
```

Contract addresses default to the provider configuration.

## Mutation Variables

`DeployPermissionedResolverVariables` includes `account`, `owner`, `salt`, and
optional `execution`.

## Return Type

`UseMutationResult<ExecuteContractWritesResult, DeployPermissionedResolverError, DeployPermissionedResolverVariables>`

## Action

Uses
[`preparePermissionedResolverDeploymentWrite`](../actions/write/prepare-write-permissioned-resolver-deployment).
