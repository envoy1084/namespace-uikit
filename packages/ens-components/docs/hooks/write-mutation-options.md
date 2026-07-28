# ENS write mutation options

ENS domain write hooks use the same shape:

```ts
const write = useSomeWrite({
  mutation: {
    onSuccess(data) {},
    onError(error) {},
  },
});

write.mutate({
  // Domain variables
  execution: {
    confirmation: "confirmed",
    strategy: "auto",
    timeout: 120_000,
    onProgress(progress) {},
  },
});
```

`mutation` accepts TanStack Mutation options except `mutationFn` and
`mutationKey`. `execution` is optional. Domain hooks default to a confirmed
single write; hooks that prepare multiple calls use automatic batching.

Successful data is `ExecuteContractWritesResult`. Errors are uppercase string
codes covering validation, wallet availability, rejection, submission, and
confirmation.
