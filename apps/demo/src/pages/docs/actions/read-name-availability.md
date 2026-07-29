---
title: readNameAvailability
description: Check whether a second-level .eth name is available.
---

# readNameAvailability

Validates a label or name and reads `ETHRegistrar.isAvailable`.

## Import

```ts [import.ts]
import { readNameAvailability } from "ens-components/actions";
```

## Usage

```ts [availability.ts]
const result = await readNameAvailability(publicClient, {
  input: "example",
  registrarAddress,
});

if (result.isErr()) throw result.error;
console.log(result.value);
```

## Parameters

### publicClient

`PublicClient`

The Viem client used to read the registrar.

### parameters

```ts [types.ts]
interface ReadNameAvailabilityParameters {
  input: string | null | undefined;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<boolean, ReadNameAvailabilityErrorType>`

The result is `true` only when the normalized second-level `.eth` name can be
registered.

## Error

Input and address validation return uppercase error codes. RPC failures return
`CONTRACT_READ_FAILED`.

## Prepare

Use `prepareNameAvailabilityRead` when composing the request yourself:

```ts [prepare.ts]
const prepared = prepareNameAvailabilityRead({
  input: "example",
  registrarAddress,
});
```

It returns
`Result<PreparedNameAvailabilityRead, PrepareNameAvailabilityReadError>`. See
[Batching](/docs/guides/batching) for prepared read execution.
