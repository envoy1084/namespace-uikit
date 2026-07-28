---
title: readPermissionedResolverVerification
description: Verify a PermissionedResolver proxy deployment.
---

# readPermissionedResolverVerification

Calls `VerifiableFactory.verifyContract` for a resolver proxy and expected
implementation address.

## Import

```ts
import { readPermissionedResolverVerification } from "ens-components/actions";
```

## Usage

```ts
const result = await readPermissionedResolverVerification(publicClient, {
  factoryAddress,
  implementationAddress,
  resolverAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface ReadPermissionedResolverVerificationParameters {
  factoryAddress: Address;
  implementationAddress: Address;
  resolverAddress: Address;
}
```

## Return Type

`ResultAsync<boolean, ReadPermissionedResolverVerificationErrorType>`

Validation and RPC failures are returned as uppercase error codes.

## Prepare the Read

`preparePermissionedResolverVerificationRead` returns the ABI-inferred
verification request without accessing an RPC endpoint.
