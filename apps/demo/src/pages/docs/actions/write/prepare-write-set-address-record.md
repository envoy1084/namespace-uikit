---
title: prepareSetAddressRecordWrite
description: Prepare an Ethereum forward address record update.
---

# prepareSetAddressRecordWrite

Prepares the Ethereum forward address record used for primary-name
verification.

## Import

```ts
import { prepareSetAddressRecordWrite } from "ens-components/actions";
```

## Usage

```ts
const prepared = prepareSetAddressRecordWrite({
  account,
  input: "example.eth",
  owner: account,
  resolverAddress,
});
```

## Parameters

```ts
interface PrepareSetAddressRecordWriteParameters {
  account: Address;
  input: string | null | undefined;
  owner: Address;
  resolverAddress: Address;
}
```

The prepared request calls the multicoin
`setAddr(bytes32,uint256,bytes)` overload with coin type
`ETH_COIN_TYPE` (`60`) and the packed owner address.

## Return Type

`Result<PreparedSetAddressRecordWrite, PrepareSetAddressRecordWriteError>`

## Errors

- Name parsing errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_OWNER_ADDRESS`
- `INVALID_RESOLVER_ADDRESS`
