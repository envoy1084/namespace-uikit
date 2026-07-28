# useDeployPermissionedResolver

Simulates and deploys a verified ENS v2 PermissionedResolver proxy.

```tsx
import { useDeployPermissionedResolver } from "ens-components/hooks";

const deployment = useDeployPermissionedResolver();
deployment.mutate({
  account,
  owner: account,
  salt,
});
```

The factory and resolver implementation default to `EnsProvider`. Preparation
simulates the factory call and validates the predicted resolver address before
wallet submission. See
[ENS write mutation options](./write-mutation-options.md).
