---
title: readPermissionedResolverSupport
description: Check whether a resolver supports ENS v2 permissions.
---

# readPermissionedResolverSupport

Reads `supportsInterface` for the ENS v2 PermissionedResolver interface ID.

## Import

```ts
import { readPermissionedResolverSupport } from "ens-components/actions";
```

## Usage

```ts
const result = await readPermissionedResolverSupport(publicClient, {
  resolverAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

```ts
interface ReadPermissionedResolverSupportParameters {
  resolverAddress: Address;
}
```

## Return Type

`ResultAsync<boolean, ReadPermissionedResolverSupportErrorType>`

RPC failures return `CONTRACT_READ_FAILED`.

## Prepare the Read

`preparePermissionedResolverSupportRead` returns the typed ERC-165 request. The
request uses `PERMISSIONED_RESOLVER_INTERFACE_ID`.
