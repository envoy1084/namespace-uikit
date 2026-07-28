# useCommitName

Prepares and submits an ENS v2 `.eth` commitment.

```tsx
import { useCommitName } from "ens-components/hooks";

const commit = useCommitName();
commit.mutate({
  account,
  duration,
  input: "example.eth",
  owner: account,
  referrer,
  resolverAddress,
  secret,
  subregistryAddress,
});
```

The registrar defaults to `EnsProvider` and can be overridden when creating the
hook. The commitment inputs must be identical to the later registration
inputs. See [ENS write mutation options](./write-mutation-options.md).
