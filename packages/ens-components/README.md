# ENS Components

A growing collection of production-ready React components, hooks, and contract
actions for building ENS v2 applications.

> ENS v2 support is currently limited to the Sepolia testnet configuration.
> The `"mainnet"` network value is reserved but is not implemented yet.

## Features

- Complete commit, wait, approve, and register flow
- Dialog and inline registration presentations
- TanStack Query hooks for availability, pricing, commitments, and payments
- Framework-independent actions returning `neverthrow` results
- Resumable registration flow

## Installation

Install the package and its Web3 peers:

```sh
npm install ens-components @tanstack/react-query@5.101.2 viem wagmi
```

The package requires React and React DOM 19.2.7 or later, Tailwind CSS 4.3.2
or later, Viem 2, and Wagmi 3.

## Styles

Import the package stylesheet after Tailwind CSS. Add the package distribution
to Tailwind's source scan so component utility classes are generated:

```css
@import "tailwindcss";
@import "ens-components/styles.css";

@source "../node_modules/ens-components/dist";
```

Adjust the `@source` path relative to your application stylesheet when needed.

## Providers

Hooks and components require Wagmi, TanStack Query, and `EnsProvider`:

```tsx
"use client";

import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EnsProvider } from "ens-components";
import { createConfig, http, WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <EnsProvider config={{ network: "testnet" }}>{children}</EnsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

Your application must also provide a wallet connection interface.

## Name registration

Render the complete registration flow as a dialog:

```tsx
import { NameRegistration } from "ens-components";

export function RegisterName() {
  return <NameRegistration />;
}
```

Use the inline presentation when the flow should remain in the page layout:

```tsx
<NameRegistration
  presentation="inline"
  messages={{
    searchTitle: "Claim your onchain identity",
  }}
/>
```

See
[NameRegistration](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/name-registration.md)
for customization, lifecycle events, defaults, and flow behavior.

## Documentation

### Components

- [NameRegistration](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/name-registration.md)
- [TransactionProgress](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/transaction-progress.md)

### Providers

- [EnsProvider](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/providers/ens-provider.md)

### Hooks

- [useNameAvailability](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-availability.md)
- [useNamePrice](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-price.md)
- [useCommitmentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-commitment-status.md)
- [useRegistrationPaymentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-registration-payment-status.md)

### Actions

- [parseNameInput](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/parse-name-input.md)
- [isNameAvailable](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/is-name-available.md)
- [getNamePrice](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/get-name-price.md)
- [makeNameCommitment](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/make-name-commitment.md)
- [commitName](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/commit-name.md)
- [getCommitmentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/get-commitment-status.md)
- [getRegistrationPaymentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/get-registration-payment-status.md)
- [approveRegistrationPayment](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/approve-registration-payment.md)
- [registerName](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/register-name.md)
- [supportsAtomicBatchCalls](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/supports-atomic-batch-calls.md)
