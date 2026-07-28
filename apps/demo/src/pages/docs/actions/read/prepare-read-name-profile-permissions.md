---
title: prepareNameProfilePermissionsRead
description: Prepare ENS v2 profile record permission reads.
---

# prepareNameProfilePermissionsRead

Prepares Enhanced Access Control reads that determine whether an account can
update selected records on a PermissionedResolver.

## Import

```ts
import { prepareNameProfilePermissionsRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareNameProfilePermissionsRead({
  account,
  input: "example.eth",
  resolverAddress,
  requests: [
    { type: "text", key: "avatar" },
    { type: "address", key: "60" },
    { type: "contenthash" },
  ],
});

if (prepared.isOk()) {
  const permissions = await executeContractReads(publicClient, prepared.value);
}
```

## Parameters

```ts
interface PrepareNameProfilePermissionsReadParameters {
  account: Address;
  input: string | null | undefined;
  requests: readonly NameProfilePermissionRequest[];
  resolverAddress: Address;
}
```

## Return Type

`Result<PreparedNameProfilePermissionsRead, PrepareNameProfilePermissionsReadError>`

The selected result includes `name`, `node`, `resolverAddress`, and a boolean
permission map. It checks name-wide roles and the fine-grained name/key,
name/coin-type, global key, and global coin-type resources supported by the
resolver.

Use `getNameProfilePermissionId(request)` to obtain a map key or
`canEditNameProfileRecord(result, request)` to read a boolean directly.
