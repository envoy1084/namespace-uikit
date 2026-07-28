# useSetAddressRecord

Sets the Ethereum address record on an ENS v2 PermissionedResolver.

```tsx
import { useSetAddressRecord } from "ens-components/hooks";

const addressRecord = useSetAddressRecord();
addressRecord.mutate({
  account,
  input: "example.eth",
  owner: account,
  resolverAddress,
});
```

This hook writes ENSIP-9 coin type `60`. Use `useUpdateProfileRecords` for
arbitrary coin types. See
[ENS write mutation options](./write-mutation-options).
