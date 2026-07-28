---
title: Getting Started
description: Configure Wagmi, TanStack Query, and ENS Components.
---

# Getting Started

## Create the configurations

Create a Wagmi config that includes the chain selected by ENS Components.

```ts
// config.ts
import { QueryClient } from "@tanstack/react-query";
import { createEnsConfig } from "ens-components";
import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

export const queryClient = new QueryClient();
export const ensConfig = createEnsConfig("testnet");
```

## Add the providers

`EnsProvider` must be inside both `WagmiProvider` and
`QueryClientProvider`.

```tsx
// providers.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { EnsProvider } from "ens-components";
import { WagmiProvider } from "wagmi";

import { ensConfig, queryClient, wagmiConfig } from "./config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <EnsProvider config={ensConfig}>{children}</EnsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

The connected wallet must be on the configured ENS chain before it can submit
transactions.

## Render a component

```tsx
import { NameRegistration } from "ens-components";

export function RegisterName() {
  return <NameRegistration />;
}
```

The default presentation renders a trigger and opens the flow in a dialog.
Use `presentation="inline"` to render it directly.

## Build a custom interface

Hooks expose the same ENS operations without the packaged interface.

```tsx
import { useNameAvailability } from "ens-components/hooks";

export function Availability({ name }: { name: string }) {
  const query = useNameAvailability({ input: name });

  if (query.isPending) return <p>Checking</p>;
  if (query.isError) return <p>Unable to check this name</p>;
  return <p>{query.data ? "Available" : "Unavailable"}</p>;
}
```

See [Choosing an API](/docs/guides/choosing-an-api) for the differences
between components, hooks, and actions.
