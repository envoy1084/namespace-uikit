# useSetPrimaryName

Sets and verifies an account's ENS primary name using the required address,
L2 reverse, and L1 reverse writes.

```tsx
import { useSetPrimaryName } from "ens-components/hooks";

const primaryName = useSetPrimaryName();
primaryName.mutate({
  account,
  input: "example.eth",
  resolverAddress,
  execution: { strategy: "auto" },
});
```

`owner` defaults to `account`. L1 and L2 reverse registrar addresses default to
`EnsProvider`. With `strategy: "auto"`, supported wallets submit all three
writes atomically and other wallets submit them in dependency order.

See [ENS write mutation options](./write-mutation-options.md).
