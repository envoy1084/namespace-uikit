---
title: deployPermissionedResolver
description: Deploy an ENS v2 PermissionedResolver proxy.
---

# deployPermissionedResolver

Simulates and submits `VerifiableFactory.deployProxy`.

## Import

```ts
import { deployPermissionedResolver } from "ens-components/actions";
```

## Usage

```ts
const result = await deployPermissionedResolver(walletClient, publicClient, {
  account,
  chain,
  factoryAddress,
  implementationAddress,
  owner: account,
  salt,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface DeployPermissionedResolverParameters extends ExecuteContractWriteParameters {
  account: Address;
  factoryAddress: Address;
  implementationAddress: Address;
  owner: Address;
  salt: Hex;
}
```

## Return Type

`ResultAsync<ExecuteContractWritesResult, DeployPermissionedResolverErrorType>`

The exact deployment is simulated before the wallet is opened.

## Prepare the Write

`preparePermissionedResolverDeploymentWrite` returns the predicted resolver
address and prepared factory call for atomic or sequential composition.
