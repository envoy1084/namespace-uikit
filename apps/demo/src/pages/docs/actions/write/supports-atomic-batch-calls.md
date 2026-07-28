---
title: supportsAtomicBatchCalls
description: Check whether a wallet supports atomic EIP-5792 calls.
---

# supportsAtomicBatchCalls

Checks whether a connected wallet supports atomic EIP-5792 calls on a chain.

## Import

```ts
import { supportsAtomicBatchCalls } from "ens-components/actions";
```

## Usage

```ts
const result = await supportsAtomicBatchCalls(walletClient, {
  account,
  chainId: 11155111,
});

if (result.isOk() && result.value) {
  // The wallet can execute the resolver deployment and commitment atomically.
}
```

## Parameters

```ts
interface SupportsAtomicBatchCallsParameters {
  account: Address;
  chainId: number;
}
```

The result is `true` when `wallet_getCapabilities` reports the atomic status
as `ready` or `supported`.

The result is `false` when the wallet:

- does not implement `wallet_getCapabilities`;
- omits the `atomic` capability; or
- reports the atomic capability as `unsupported`.

## Return Type

`ResultAsync<boolean, SupportsAtomicBatchCallsError>`

## Errors

- `CAPABILITIES_REQUEST_FAILED`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_CHAIN_ID`

An unsupported capabilities method is a valid `false` result. Other provider
and transport failures return `CAPABILITIES_REQUEST_FAILED`.
