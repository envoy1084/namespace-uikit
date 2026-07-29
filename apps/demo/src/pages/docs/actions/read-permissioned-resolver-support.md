---
title: readPermissionedResolverSupport
description: Check whether a resolver supports ENS v2 permissions.
---

# readPermissionedResolverSupport

Reads `supportsInterface` for the ENS v2 PermissionedResolver interface ID.

## Import

```ts [import.ts]
import { readPermissionedResolverSupport } from "ens-components/actions";
```

## Usage

```ts [resolver-support.ts]
const result = await readPermissionedResolverSupport(publicClient, {
  resolverAddress,
});

if (result.isErr()) throw result.error;
```

## Parameters

### publicClient

`PublicClient`

The Viem client used for the ERC-165 read.

### parameters

```ts [types.ts]
interface ReadPermissionedResolverSupportParameters {
  resolverAddress: Address;
}
```

## Return Type

`ResultAsync<boolean, ReadPermissionedResolverSupportErrorType>`

## Error

Invalid resolver addresses return a validation code. RPC failures return
`CONTRACT_READ_FAILED`.

## Prepare

`preparePermissionedResolverSupportRead` returns the typed ERC-165 request. The
request uses `PERMISSIONED_RESOLVER_INTERFACE_ID`. See
[Batching](/docs/guides/batching).
