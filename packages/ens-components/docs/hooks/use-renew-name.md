# useRenewName

Submits an ENS v2 `.eth` renewal.

```tsx
import { useRenewName } from "ens-components/hooks";

const renewal = useRenewName();
renewal.mutate({
  account,
  duration,
  input: "example.eth",
  paymentTokenAddress,
  referrer,
});
```

`duration` is the number of seconds added to the current expiry. The registrar
defaults to `EnsProvider`. Token approval is a separate write and can be
composed atomically with this write through `useExecuteContractWrites`. See
[ENS write mutation options](./write-mutation-options.md).
