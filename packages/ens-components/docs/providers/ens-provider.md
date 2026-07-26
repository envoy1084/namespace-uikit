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
resolver implementation, and non-empty payment-token configuration to package
hooks and components.

The built-in testnet configuration currently includes:

| Token     | Address                                      | Decimals |
| --------- | -------------------------------------------- | -------- |
| Mock USDC | `0xba11ebdb3f9a2c5946d8629517f06364e53a2e10` | 6        |
| Mock DAI  | `0x2922bcd677af690fcd1ecc699519e4bfabc73ff8` | 18       |

Each `EnsPaymentToken` contains its address, name, symbol, decimals, and icon.
Hooks that omit `paymentTokenAddress` use the first configured token.
