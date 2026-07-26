# prepareCommitmentStatusRead

Prepares one multicall plan for the commitment timestamp and the registrar's
minimum and maximum commitment ages.

```ts
const prepared = prepareCommitmentStatusRead({
  commitment,
  network: "testnet",
  registrarAddress,
});

if (prepared.isOk()) {
  const timing = await executeContractReads(publicClient, prepared.value);
}
```

The selected `CommitmentTiming` value contains `submittedAt`, `minimumAge`, and
`maximumAge` as Unix-time seconds. The action does not determine the current
block timestamp or assign a UI state to the commitment.

## Preparation errors

- `INVALID_COMMITMENT`
- `INVALID_REGISTRAR_ADDRESS`

## Execution errors

- `CONTRACT_READ_FAILED`
