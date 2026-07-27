# ENS Components

A growing collection of production-ready React components, hooks, and contract
actions for integrating ENS v2 into React applications.

> ENS v2 support is currently limited to the Sepolia testnet configuration.
> The `"mainnet"` network value is reserved but is not implemented yet.

## Features

- Complete resolver, commit, wait, approve, register, and primary-name flow
- Complete ERC-20 name renewal flow
- Configured payment-token selection with resumable state
- Dialog and inline registration presentations
- TanStack Query hooks for availability, pricing, and payment status
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

Use the same built-in configuration with direct actions:

```ts
import { getEnsNetworkConfiguration } from "ens-components";

const { chain, contracts } = getEnsNetworkConfiguration("testnet");
```

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

## Name renewal

Render the renewal flow as a dialog:

```tsx
import { NameRenewal } from "ens-components";

export function RenewName() {
  return <NameRenewal defaultLabel="vitalik" />;
}
```

Use `presentation="inline"` to place the flow directly in a page. See
[NameRenewal](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/name-renewal.md)
for duration controls, lifecycle events, slots, and messages.

## Documentation

### Components

- [NameRegistration](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/name-registration.md)
- [NameRenewal](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/name-renewal.md)
- [TransactionProgress](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/transaction-progress.md)

### Providers

- [EnsProvider](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/providers/ens-provider.md)

### Hooks

- [useNameAvailability](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-availability.md)
- [useNamePrice](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-price.md)
- [useRegistrationPaymentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-registration-payment-status.md)
- [useNameRenewalPrice](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-renewal-price.md)
- [useNameRenewalPaymentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-renewal-payment-status.md)

### Actions

#### Reads

- [Prepared reads and executors](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/contract-reads.md)
- [prepareNameAvailabilityRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-name-availability.md)
- [prepareNamePriceRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-name-price.md)
- [prepareRegistrationPaymentStatusRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-registration-payment-status.md)
- [prepareNameRenewalPriceRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-name-renewal-price.md)
- [prepareNameRenewalPaymentStatusRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-name-renewal-payment-status.md)
- [prepareCommitmentStatusRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-commitment-status.md)
- [preparePermissionedResolverVerificationRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-permissioned-resolver-verification.md)

#### Writes

- [prepareCommitNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-commit-name.md)
- [preparePaymentTokenApprovalWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-payment-token-approval.md)
- [prepareRegisterNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-register-name.md)
- [prepareRenewNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-renew-name.md)
- [prepareSetAddressRecordWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-set-address-record.md)
- [prepareSetL2PrimaryNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-set-l2-primary-name.md)
- [prepareSetL1PrimaryNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-set-l1-primary-name.md)
- [preparePermissionedResolverDeploymentWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-permissioned-resolver-deployment.md)
- [executeContractWrites](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/execute-contract-writes.md)
- [supportsAtomicBatchCalls](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/supports-atomic-batch-calls.md)
- [getContractCallsStatus and waitForContractCalls](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/contract-write-status.md)
