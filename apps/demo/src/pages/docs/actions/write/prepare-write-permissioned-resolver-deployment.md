---
title: preparePermissionedResolverDeploymentWrite
description: Prepare and simulate a PermissionedResolver proxy deployment.
---

# preparePermissionedResolverDeploymentWrite

Simulates a PermissionedResolver proxy deployment and returns its deterministic
address and encoded factory call.

## Import

```ts
import { preparePermissionedResolverDeploymentWrite } from "ens-components/actions";
import { createResolverSalt } from "ens-components";
```

## Usage

```ts
const salt = createResolverSalt({ input: "example.eth" });
if (salt.isErr()) throw salt.error;

const result = await preparePermissionedResolverDeploymentWrite(publicClient, {
  account,
  factoryAddress,
  implementationAddress,
  owner: account,
  salt: salt.value.salt,
});
```

## Parameters

```ts
interface PreparePermissionedResolverDeploymentWriteParameters {
  account: Address;
  factoryAddress: Address;
  implementationAddress: Address;
  owner: Address;
  salt: Hex;
}
```

`account` affects the deterministic proxy address. `owner` receives all
resolver roles.

## Return Type

`ResultAsync<PreparedPermissionedResolverDeploymentWrite, PreparePermissionedResolverDeploymentWriteError>`

`metadata` contains `resolverAddress`, `initData`, and `salt`.

## Errors

- `CONTRACT_SIMULATION_FAILED`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_FACTORY_ADDRESS`
- `INVALID_IMPLEMENTATION_ADDRESS`
- `INVALID_OWNER_ADDRESS`
- `INVALID_RESOLVER_ADDRESS`
- `INVALID_SALT`
