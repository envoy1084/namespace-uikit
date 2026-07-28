---
title: prepareNameProfileRecordsWrite
description: Prepare and simulate an ENS profile record multicall.
---

# prepareNameProfileRecordsWrite

Encodes profile changes into one `multicallWithNodeCheck` request and simulates
it from the supplied account.

## Import

```ts
import { prepareNameProfileRecordsWrite } from "ens-components/actions";
```

## Usage

```ts
const prepared = await prepareNameProfileRecordsWrite(publicClient, {
  account,
  changes,
  input: "example.eth",
  resolverAddress,
});

if (prepared.isOk()) {
  const result = await executeContractWrites(walletClient, publicClient, {
    calls: [prepared.value],
    chain,
    confirmation: "confirmed",
    strategy: "single",
  });
}
```

## Parameters

```ts
interface PrepareNameProfileRecordsWriteParameters {
  account: Address;
  changes: readonly NameProfileRecordChange[];
  input: string | null | undefined;
  resolverAddress: Address;
}
```

`changes` accepts every `NameProfileRecordChange` variant: text, address,
contenthash, ABI, data, interface, name, and public key. A `null` value removes
the corresponding record.

Simulation verifies the exact encoded calls, account permissions, resolver,
and node before a wallet prompt is opened.

## Return Type

`ResultAsync<PreparedNameProfileRecordsWrite, PrepareNameProfileRecordsWriteError>`

## Errors

- Name parsing errors
- `EMPTY_PROFILE_CHANGES`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_PROFILE_RECORDS`
- `INVALID_RESOLVER_ADDRESS`
- `PROFILE_UPDATE_SIMULATION_FAILED`
