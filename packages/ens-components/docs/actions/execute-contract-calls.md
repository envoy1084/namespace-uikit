# executeContractCalls

Executes one or more prepared writes using a single transaction, an atomic
EIP-5792 batch, or an ordered transaction sequence.

```ts
const result = await executeContractCalls(walletClient, publicClient, {
  calls: [resolverDeployment, commitment],
  chain,
  confirmation: "confirmed",
  strategy: "auto",
  onProgress(progress) {
    // Persist submitted transaction hashes or callsId here.
  },
});
```

## Strategies

| Strategy     | Behavior                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `single`     | Requires exactly one prepared call.                                                                 |
| `atomic`     | Uses `wallet_sendCalls` with `forceAtomic: true`.                                                   |
| `sequential` | Confirms each dependent call before submitting the next.                                            |
| `auto`       | Uses `single` for one call, otherwise detects atomic wallet support and falls back to `sequential`. |

All calls must use the same prepared `account`. `confirmation` defaults to
`confirmed`; `submitted` returns after the final submission. Earlier calls in
a sequential execution are still confirmed before dependent calls are sent.

The result is discriminated by `strategy`. Atomic results contain a `callsId`
and transaction hashes. Single and sequential results contain submitted
transactions and confirmed receipts when requested.

`onProgress` reports signing, submitted, and confirmed states. Observer errors
do not change the chain result.

## Errors

Errors are uppercase codes covering invalid composition, wallet capability
checks, submission, call-status polling, receipt confirmation, and reverts.
