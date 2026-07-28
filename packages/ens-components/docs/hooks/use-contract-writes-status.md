# useContractWritesStatus

Tracks a submitted atomic batch or one or more transaction hashes.

```tsx
import { useContractWritesStatus } from "ens-components/hooks";

const status = useContractWritesStatus({
  submission: {
    callsId,
    strategy: "atomic",
  },
});
```

Sequential and single submissions use:

```ts
{
  strategy: "single" | "sequential";
  transactionHashes: readonly [Hex, ...Hex[]];
}
```

The result contains `state`, `strategy`, `transactionHashes`, and all available
receipts. `state` is `PENDING`, `SUCCESS`, `FAILURE`, or `UNKNOWN`. Pending
submissions poll once per second by default; override this through `query`.
