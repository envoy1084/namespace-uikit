# ENS Components

A growing collection of production-ready React components, hooks, and contract
actions for building ENS v2 applications.

> ENS v2 support is currently limited to the Sepolia testnet configuration.
> The `"mainnet"` network value is reserved but is not implemented yet.

## Features

- Complete resolver, commit, wait, approve, and register flow
- Configured payment-token selection with resumable state
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
- [useRegistrationPaymentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-registration-payment-status.md)

### Actions

- [parseNameInput](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/parse-name-input.md)
- [Prepared reads and read executors](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/contract-reads.md)
- [prepareNameAvailabilityRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/prepare-name-availability-read.md)
- [prepareNamePriceRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/prepare-name-price-read.md)
- [prepareRegistrationPaymentStatusRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/prepare-registration-payment-status-read.md)
- [makeNameCommitment](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/make-name-commitment.md)
- [prepareCommitName](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/prepare-commit-name.md)
- [getCommitmentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/get-commitment-status.md)
- [prepareRegistrationPaymentApproval](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/prepare-registration-payment-approval.md)
- [prepareRegisterName](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/prepare-register-name.md)
- [executeContractCalls](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/execute-contract-calls.md)
- [supportsAtomicBatchCalls](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/supports-atomic-batch-calls.md)
- [createResolverSalt](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/create-resolver-salt.md)
- [preparePermissionedResolverDeployment](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/prepare-permissioned-resolver-deployment.md)
- [getPermissionedResolverStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/get-permissioned-resolver-status.md)
- [isResolverDeployed](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/is-resolver-deployed.md)
- [getContractCallsStatus and waitForContractCalls](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/contract-call-status.md)
