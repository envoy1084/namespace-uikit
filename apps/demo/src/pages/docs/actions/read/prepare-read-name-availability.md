---
title: prepareNameAvailabilityRead
description: Prepare an ENS v2 name availability read.
---

# prepareNameAvailabilityRead

Validates a second-level `.eth` name and prepares the registrar `isAvailable`
read.

## Import

```ts
import { prepareNameAvailabilityRead } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareNameAvailabilityRead({
  input: "example",
  registrarAddress,
});

if (prepared.isOk()) {
  const result = await executeContractRead(publicClient, prepared.value);
}
```

## Parameters

```ts
interface PrepareNameAvailabilityReadParameters {
  input: string | null | undefined;
  registrarAddress: Address;
}
```

## Return Type

`Result<PreparedNameAvailabilityRead, PrepareNameAvailabilityReadError>`

The prepared value contains an ABI-inferred `request`, normalized name
metadata, and `kind: "name-availability"`.

## Errors

- `EMPTY_INPUT`
- `EMPTY_LABEL`
- `INVALID_NAME`
- `INVALID_REGISTRAR_ADDRESS`
- `LABEL_TOO_LONG`
- `LABEL_TOO_SHORT`
- `UNSUPPORTED_NAME`
