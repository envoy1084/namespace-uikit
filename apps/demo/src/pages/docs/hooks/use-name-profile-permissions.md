---
title: useNameProfilePermissions
description: Check whether an account can update selected ENS profile records.
---

# useNameProfilePermissions

Discovers or accepts a resolver, verifies permissioned resolver support, and
checks whether an account can update selected records.

## Import

```ts
import { useNameProfilePermissions } from "ens-components/hooks";
```

## Usage

```tsx
const permissions = useNameProfilePermissions({
  account,
  input: "example.eth",
  requests: [
    { type: "contenthash" },
    { type: "text", key: "avatar" },
    { type: "address", key: "60" },
  ],
});
```

## Parameters

```ts
interface UseNameProfilePermissionsParameters<selectData = NameProfilePermissions> {
  account?: Address;
  input: string | null | undefined;
  requests: readonly NameProfilePermissionRequest[];
  resolverAddress?: Address;
  query?: Omit<
    UseQueryOptions<NameProfilePermissions, NameProfilePermissionsError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

### account

`Address | undefined`

Account whose permissions are checked.

### input

`string | null | undefined`

ENS name to check.

### requests

`readonly NameProfilePermissionRequest[]`

For text, data, and address records, pass `key` to check the most specific
permission. Address keys are decimal ENSIP-9 coin types. Omitting `key` checks
the name-wide role for that family.

### resolverAddress

`Address | undefined`

Resolver to check. When omitted, the hook discovers it with the Universal
Resolver.

### query

TanStack Query options, excluding `queryFn` and `queryKey`.

The query is disabled until the account, public client, valid name, and at
least one request are available.

## Return Type

`UseQueryResult<NameProfilePermissions, NameProfilePermissionsError>`

```ts
interface NameProfilePermissions {
  readonly name: string;
  readonly node: Hex;
  readonly permissions: Readonly<Record<string, boolean>>;
  readonly resolverAddress: Address;
}
```

Use `canEditNameProfileRecord(data, request)` to read one result without
constructing the internal permission-map key.

## Actions

Uses `prepareNameResolverRead`,
`preparePermissionedResolverSupportRead`, and
[`prepareNameProfilePermissionsRead`](/docs/actions/read-name-profile-permissions).
