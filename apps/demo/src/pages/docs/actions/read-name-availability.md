---
title: readNameAvailability
description: Check whether a second-level .eth name is available.
---

# readNameAvailability

Validates a label or name and reads `ETHRegistrar.isAvailable`.

## Import

```ts
import { readNameAvailability } from "ens-components/actions";
```

## Usage

```ts
const result = await readNameAvailability(publicClient, {
  input: "example",
  registrarAddress,
});

if (result.isErr()) throw result.error;
console.log(result.value);
```

## Parameters

```ts
interface ReadNameAvailabilityParameters {
  input: string | null | undefined;
  registrarAddress: Address;
}
```

## Return Type

`ResultAsync<boolean, ReadNameAvailabilityErrorType>`

The result is `true` only when the normalized second-level `.eth` name can be
registered.

## Errors

Input and address validation return uppercase error codes. RPC failures return
`CONTRACT_READ_FAILED`.

## Prepare the Read

Use `prepareNameAvailabilityRead` when composing the request yourself:

```ts
const prepared = prepareNameAvailabilityRead({
  input: "example",
  registrarAddress,
});
```

It returns `Result<PreparedNameAvailabilityRead, PrepareNameAvailabilityReadError>`.
