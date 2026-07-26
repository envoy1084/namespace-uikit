# EnsProvider

`EnsProvider` selects the chain and built-in ENS v2 contract configuration used
by package hooks and components.

## Usage

Place it inside `WagmiProvider` and `QueryClientProvider`:

```tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { EnsProvider } from "ens-components";
import { WagmiProvider } from "wagmi";

<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <EnsProvider config={{ network: "testnet" }}>{children}</EnsProvider>
  </QueryClientProvider>
</WagmiProvider>;
```

The Wagmi configuration must include the chain selected by `EnsProvider`.

## Props

| Prop             | Type                     | Required | Description                                            |
| ---------------- | ------------------------ | -------- | ------------------------------------------------------ |
| `children`       | `ReactNode`              | Yes      | Application subtree that can access ENS configuration. |
| `config.network` | `"mainnet" \| "testnet"` | Yes      | Selects the chain and deployed contracts.              |

Only `"testnet"` is currently implemented. It resolves to Sepolia and the
package's ENS v2 test deployments. Passing `"mainnet"` throws an error.

The provider supplies the selected chain, registrar, resolver factory,
resolver implementation, and payment token configuration to package hooks and
components.
