---
title: prepareSetL1PrimaryNameWrite
description: Prepare an L1 reverse-name update.
---

# prepareSetL1PrimaryNameWrite

Prepares `ReverseRegistrar.setName(string)` for Ethereum's `addr.reverse`
namespace.

## Import

```ts
import { prepareSetL1PrimaryNameWrite } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareSetL1PrimaryNameWrite({
  account,
  input: "example.eth",
  l1ReverseRegistrarAddress,
});
```

## Parameters

```ts
interface PrepareSetL1PrimaryNameWriteParameters {
  account: Address;
  input: string | null | undefined;
  l1ReverseRegistrarAddress: Address;
}
```

`setName(string)` derives the address being named from `msg.sender`. The stable
write kind is `set-l1-primary-name`.

## Return Type

`Result<PreparedSetL1PrimaryNameWrite, PrepareSetL1PrimaryNameWriteError>`

## Errors

- Name parsing errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_L1_REVERSE_REGISTRAR_ADDRESS`
