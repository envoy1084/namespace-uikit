---
title: prepareSetL2PrimaryNameWrite
description: Prepare an ENS v2 reverse-name update.
---

# prepareSetL2PrimaryNameWrite

Prepares `L2ReverseRegistrar.setName(string)`.

## Import

```ts
import { prepareSetL2PrimaryNameWrite } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareSetL2PrimaryNameWrite({
  account,
  input: "example.eth",
  l2ReverseRegistrarAddress,
});
```

## Parameters

```ts
interface PrepareSetL2PrimaryNameWriteParameters {
  account: Address;
  input: string | null | undefined;
  l2ReverseRegistrarAddress: Address;
}
```

`setName(string)` derives the address being named from `msg.sender`. The stable
write kind is `set-l2-primary-name`.

## Return Type

`Result<PreparedSetL2PrimaryNameWrite, PrepareSetL2PrimaryNameWriteError>`

## Errors

- Name parsing errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_L2_REVERSE_REGISTRAR_ADDRESS`
