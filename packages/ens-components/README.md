# ENS Components

React components, hooks, and contract actions for registering second-level
`.eth` names with ENS v2.

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

See [NameRegistration](docs/components/name-registration.md) for
customization, lifecycle events, defaults, and flow behavior.

## Documentation

### Components

- [NameRegistration](docs/components/name-registration.md)
- [TransactionProgress](docs/components/transaction-progress.md)

### Providers

- [EnsProvider](docs/providers/ens-provider.md)

### Hooks

- [useNameAvailability](docs/hooks/use-name-availability.md)
- [useNamePrice](docs/hooks/use-name-price.md)
- [useCommitmentStatus](docs/hooks/use-commitment-status.md)
- [useRegistrationPaymentStatus](docs/hooks/use-registration-payment-status.md)

### Actions

- [parseNameInput](docs/actions/parse-name-input.md)
- [isNameAvailable](docs/actions/is-name-available.md)
- [getNamePrice](docs/actions/get-name-price.md)
- [makeNameCommitment](docs/actions/make-name-commitment.md)
- [commitName](docs/actions/commit-name.md)
- [getCommitmentStatus](docs/actions/get-commitment-status.md)
- [getRegistrationPaymentStatus](docs/actions/get-registration-payment-status.md)
- [approveRegistrationPayment](docs/actions/approve-registration-payment.md)
- [registerName](docs/actions/register-name.md)
