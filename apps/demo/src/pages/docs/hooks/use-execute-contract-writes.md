---
title: useExecuteContractWrites
description: Execute one or more prepared contract writes.
---

# useExecuteContractWrites

Executes prepared writes as one transaction, an EIP-5792 atomic batch, or an
ordered sequential series.

## Import

```ts
import { useExecuteContractWrites } from "ens-components/hooks";
```

## Usage

```tsx
import { prepareRenewNameWrite } from "ens-components/actions";

const execution = useExecuteContractWrites();

await execution.mutateAsync({
  calls: [preparedWrite],
  confirmation: "confirmed",
  strategy: "auto",
});
```

The hook derives the chain and Viem clients from Wagmi and `EnsProvider`.

## Parameters

```ts
interface UseExecuteContractWritesParameters {
  mutation?: UseMutationOptions;
}
```

## Mutation Variables

`ExecuteContractWritesVariables` accepts `calls`, `confirmation`,
`onProgress`, `strategy`, and `timeout`. It omits `chain`, which comes from
`EnsProvider`.

## Return Type

`UseMutationResult<ExecuteContractWritesResult, ExecuteContractWritesMutationError, ExecuteContractWritesVariables>`

Successful data contains the selected strategy, transaction hashes, confirmed
receipts when requested, and an atomic `callsId` where applicable.

See [Transactions](/docs/guides/transactions) for strategy and confirmation
behavior.

## Action

Uses [`executeContractWrites`](../actions/write/contract-writes).
