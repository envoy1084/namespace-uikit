# useUpdateNameProfileRecords

Simulates and submits a PermissionedResolver multicall containing profile
record changes.

```tsx
import { useUpdateNameProfileRecords } from "ens-components/hooks";

const update = useUpdateNameProfileRecords();
update.mutate({
  account,
  changes,
  input: "example.eth",
  resolverAddress,
});
```

`changes` accepts the same `NameProfileRecordChange[]` produced by
`diffProfileRecords`. Empty or invalid change sets fail during preparation.
Call `useNameProfilePermissions` before enabling an update interface. See
the [Transactions guide](/docs/guides/transactions).
