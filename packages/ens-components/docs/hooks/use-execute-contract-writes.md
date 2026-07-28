# useExecuteContractWrites

Executes any non-empty collection of prepared ENS writes as a single
transaction, atomic EIP-5792 batch, or confirmed sequential series.

```tsx
import { prepareRenewNameWrite } from "ens-components/actions";
import { useExecuteContractWrites } from "ens-components/hooks";

const execution = useExecuteContractWrites();

await execution.mutateAsync({
  calls: [preparedWrite],
  confirmation: "confirmed",
  strategy: "auto",
});
```

The hook derives the chain and Viem clients from Wagmi and `EnsProvider`.
Variables are `ExecuteContractWritesProps` without `chain`.

`strategy` supports `auto`, `atomic`, `sequential`, and `single`. With `auto`,
the executor selects atomic batching when the wallet supports it and otherwise
uses ordered sequential transactions.

The return value is a standard TanStack Mutation result. Successful data
contains the resolved strategy, submitted transactions, receipts when
confirmed, and an atomic `callsId` where applicable.
