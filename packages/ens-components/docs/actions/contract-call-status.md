# Contract call status

`getContractCallsStatus` reads an EIP-5792 call bundle once.
`waitForContractCalls` waits for a terminal wallet status.

```ts
const current = await getContractCallsStatus(walletClient, { callsId });

const final = await waitForContractCalls(walletClient, {
  callsId,
  timeout: 120_000,
});
```

The result contains `state`, `statusCode`, and transaction hashes. State is
`PENDING`, `SUCCESS`, `FAILURE`, or `UNKNOWN`.

## Errors

- `CONTRACT_CALLS_STATUS_FAILED`
- `INVALID_CALLS_ID`
