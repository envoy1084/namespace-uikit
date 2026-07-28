---
title: preparePermissionedResolverVerificationRead
description: Prepare verification of a PermissionedResolver proxy deployment.
---

# preparePermissionedResolverVerificationRead

Prepares a `VerifiableFactory.verifyContract` read for a deployed
PermissionedResolver proxy.

## Import

```ts
import { preparePermissionedResolverVerificationRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = preparePermissionedResolverVerificationRead({
  factoryAddress,
  implementationAddress,
  resolverAddress,
});

if (prepared.isOk()) {
  const verified = await executeContractRead(publicClient, prepared.value);
}
```

## Parameters

```ts
interface PreparePermissionedResolverVerificationReadParameters {
  factoryAddress: Address;
  implementationAddress: Address;
  resolverAddress: Address;
}
```

## Return Type

`Result<PreparedPermissionedResolverVerificationRead, PreparePermissionedResolverVerificationReadError>`

The executed read returns `true` only when the factory verifies that
`resolverAddress` uses the supplied implementation.

## Preparation errors

- `INVALID_FACTORY_ADDRESS`
- `INVALID_IMPLEMENTATION_ADDRESS`
- `INVALID_RESOLVER_ADDRESS`

## Execution errors

- `CONTRACT_READ_FAILED`
