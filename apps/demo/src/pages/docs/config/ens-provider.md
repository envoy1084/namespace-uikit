---
title: EnsProvider
description: Provide ENS chain, contract, indexer, and payment-token configuration to React hooks and components.
---

# EnsProvider

Provides ENS chain, contract, indexer, and payment-token configuration to
components and hooks.

## Import

```ts [import.ts]
import { EnsProvider } from "ens-components";
```

## Usage

Create the configuration with `createEnsConfig`, then place `EnsProvider`
inside `WagmiProvider` and `QueryClientProvider`.

```tsx [providers.tsx]
import { QueryClientProvider } from "@tanstack/react-query";
import { createEnsConfig, EnsProvider } from "ens-components";
import { WagmiProvider } from "wagmi";

const ensConfig = createEnsConfig("testnet");

<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <EnsProvider config={ensConfig}>{children}</EnsProvider>
  </QueryClientProvider>
</WagmiProvider>;
```

The Wagmi configuration must include the chain selected by `EnsProvider`.

## Props

### children

`ReactNode`

The subtree that can access ENS configuration.

### config

`EnsConfig`

The chain, contracts, indexer, and payment tokens used by ENS Components.

## useEnsConfig

Returns the nearest provider configuration.

```tsx [current-chain.tsx]
import { useEnsConfig } from "ens-components";

function CurrentEnsChain() {
  const { chain } = useEnsConfig();
  return <span>{chain.name}</span>;
}
```

It throws when called outside `EnsProvider`.
