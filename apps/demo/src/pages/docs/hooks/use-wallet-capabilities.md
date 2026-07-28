# useWalletCapabilities

Reads wallet capabilities required by ENS transaction composition.

```tsx
import { useWalletCapabilities } from "ens-components/hooks";

const capabilities = useWalletCapabilities({ account });
const canBatch = capabilities.data?.atomicBatchCalls;
```

The hook checks EIP-5792 atomic batch support for the `EnsProvider` chain.
Wallets that do not implement `wallet_getCapabilities` resolve successfully
with `atomicBatchCalls: false`.

```ts
interface WalletCapabilities {
  atomicBatchCalls: boolean;
  chainId: number;
}
```

The query is disabled until both `account` and a wallet client are available.
