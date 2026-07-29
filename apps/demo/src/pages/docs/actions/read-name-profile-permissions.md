---
title: readNameProfilePermissions
description: Read record permissions from an ENS v2 PermissionedResolver.
---

# readNameProfilePermissions

Reads Enhanced Access Control roles for an account and selected profile
records.

## Import

```ts [import.ts]
import { readNameProfilePermissions } from "ens-components/actions";
```

## Usage

```ts [permissions.ts]
const result = await readNameProfilePermissions(publicClient, {
  account,
  input: "example.eth",
  resolverAddress,
  requests: [
    { type: "text", key: "avatar" },
    { type: "address", key: "60" },
    { type: "contenthash" },
  ],
});

if (result.isErr()) throw result.error;
```

## Parameters

### publicClient

`PublicClient`

The Viem client used to read the resolver.

### parameters

```ts [types.ts]
interface ReadNameProfilePermissionsParameters {
  account: Address;
  input: string | null | undefined;
  requests: readonly NameProfilePermissionRequest[];
  resolverAddress: Address;
}
```

## Return Type

`ResultAsync<NameProfilePermissions, ReadNameProfilePermissionsErrorType>`

The result contains the normalized name, node, resolver address, and a boolean
map keyed by `getNameProfilePermissionId(request)`.

Use `canEditNameProfileRecord(result, request)` to read a permission directly.

## Error

Returns input, account, resolver, or permission-request validation codes.
Execution failures return `CONTRACT_READ_FAILED`.

## Prepare

`prepareNameProfilePermissionsRead` returns the deduplicated EAC multicall
plan. See [Batching](/docs/guides/batching).
