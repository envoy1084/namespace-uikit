---
title: useWalletCapabilities
description: Check whether a connected wallet supports atomic batch calls.
---

# useWalletCapabilities

Checks whether a connected wallet supports EIP-5792 atomic batch calls on the
configured chain.

## Import

```ts
import { useWalletCapabilities } from "ens-components/hooks";
```

## Usage

```tsx
const capabilities = useWalletCapabilities({ account });
const canBatch = capabilities.data?.atomicBatchCalls;
```

## Parameters

```ts
interface UseWalletCapabilitiesParameters<selectData = WalletCapabilities> {
  account: Address | null | undefined;
  query?: Omit<
    UseQueryOptions<WalletCapabilities, WalletCapabilitiesError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

The query is disabled until the account and wallet client are available.

## Return Type

`UseQueryResult<WalletCapabilities, WalletCapabilitiesError>`

```ts
interface WalletCapabilities {
  atomicBatchCalls: boolean;
  chainId: number;
}
```

Wallets that do not implement `wallet_getCapabilities` resolve with
`atomicBatchCalls: false`.

## Action

Uses `supportsAtomicBatchCalls`.
