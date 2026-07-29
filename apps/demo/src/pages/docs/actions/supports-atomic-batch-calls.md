---
title: supportsAtomicBatchCalls
description: Check whether a wallet supports atomic EIP-5792 calls.
---

# supportsAtomicBatchCalls

Checks whether a connected wallet supports atomic EIP-5792 calls on a chain.

## Import

```ts [import.ts]
import { supportsAtomicBatchCalls } from "ens-components/actions";
```

## Usage

```ts [capabilities.ts]
const result = await supportsAtomicBatchCalls(walletClient, {
  account,
  chainId: 11155111,
});

if (result.isOk() && result.value) {
  // The wallet can execute the resolver deployment and commitment atomically.
}
```

## Parameters

### walletClient

`WalletClient`

The connected Viem wallet client.

### account

`Address`

The wallet account whose capabilities are queried.

### chainId

`number`

The target chain ID.

The result is `true` when `wallet_getCapabilities` reports the atomic status
as `ready` or `supported`.

The result is `false` when the wallet:

- does not implement `wallet_getCapabilities`;
- omits the `atomic` capability; or
- reports the atomic capability as `unsupported`.

## Return Type

`ResultAsync<boolean, SupportsAtomicBatchCallsError>`

## Error

- `CAPABILITIES_REQUEST_FAILED`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_CHAIN_ID`

An unsupported capabilities method is a valid `false` result. Other provider
and transport failures return `CAPABILITIES_REQUEST_FAILED`.

See [Batching](/docs/guides/batching) for automatic and forced atomic
strategies.
