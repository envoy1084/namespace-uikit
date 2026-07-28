# useRegisterName

Registers a previously committed ENS v2 `.eth` name.

```tsx
import { useRegisterName } from "ens-components/hooks";

const registration = useRegisterName();
registration.mutate({
  account,
  duration,
  input: "example.eth",
  owner: account,
  paymentTokenAddress,
  referrer,
  resolverAddress,
  secret,
  subregistryAddress,
});
```

The registrar defaults to `EnsProvider`. Commitment-sensitive values must
exactly match those passed to `useCommitName`. See
[ENS write mutation options](./write-mutation-options.md).
