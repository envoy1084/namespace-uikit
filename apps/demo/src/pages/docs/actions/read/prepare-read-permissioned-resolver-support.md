---
title: preparePermissionedResolverSupportRead
description: Prepare an ENS v2 permissioned resolver interface check.
---

# preparePermissionedResolverSupportRead

Prepares an ERC-165 `supportsInterface` read for
`IPermissionedResolver`.

## Import

```ts
import { preparePermissionedResolverSupportRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = preparePermissionedResolverSupportRead({
  resolverAddress,
});

if (prepared.isOk()) {
  const support = await executeContractRead(publicClient, prepared.value);
}
```

## Parameters

```ts
interface PreparePermissionedResolverSupportReadParameters {
  resolverAddress: Address;
}
```

## Return Type

`Result<PreparedPermissionedResolverSupportRead, "INVALID_RESOLVER_ADDRESS">`

The executed request returns `true` only when the resolver advertises the
required interface.
