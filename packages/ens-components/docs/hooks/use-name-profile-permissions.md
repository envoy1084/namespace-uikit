# useNameProfilePermissions

Discovers or accepts an ENS resolver, verifies that it supports the ENS v2
permission interface, and reads whether an account can update specific record
types.

```tsx
import { useNameProfilePermissions } from "ens-components/hooks";

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
interface UseNameProfilePermissionsParameters<
  selectData = NameProfilePermissions,
> {
  account?: Address;
  input: string | null | undefined;
  requests: readonly NameProfilePermissionRequest[];
  resolverAddress?: Address;
  query?: Omit<
    UseQueryOptions<
      NameProfilePermissions,
      NameProfilePermissionsError,
      selectData
    >,
    "queryFn" | "queryKey"
  >;
}
```

For text, data, and address records, pass `key` to check the most specific
permission. Address keys are decimal ENSIP-9 coin types. Omitting `key` checks
the name-wide role for that record family.

## Result

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

The query is disabled until the account, public client, valid name, and at
least one request are available.
