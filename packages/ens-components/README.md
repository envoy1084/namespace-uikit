# ENS Components

A growing collection of production-ready React components, hooks, and contract
actions for integrating ENS v2 into React applications.

> ENS v2 support is currently limited to the Sepolia testnet configuration.
> The `"mainnet"` network value is reserved but is not implemented yet.

## Features

- Complete resolver, commit, wait, approve, register, and primary-name flow
- Complete ERC-20 name renewal flow
- Permission-aware ENS profile record editor
- Configured payment-token selection with resumable state
- Dialog and inline registration presentations
- TanStack Query hooks for availability, pricing, profiles, and payment status
- Framework-independent actions returning `neverthrow` results
- Resumable registration flow

## Installation

Install the package and its Web3 peers:

```sh
npm install ens-components @tanstack/react-query@5.101.2 viem wagmi
```

The package requires React and React DOM 19.2.7 or later, Viem 2, and Wagmi 3.
Tailwind CSS is not required in the consuming application.

## Styles

Import the precompiled package stylesheet once at the application root:

```css
@import "ens-components/styles.css";
```

The stylesheet imports the UI Kit stylesheet and includes every utility used by
ENS Components. No Tailwind installation, configuration, or source scanning is
required.

## Package exports

Import components, providers, data, and shared helpers from the package root:

```ts
import { EnsProvider, NameRegistration } from "ens-components";
```

Use the dedicated entry points for actions, query hooks, and icons:

```ts
import { prepareNameAvailabilityRead } from "ens-components/actions";
import { useNameAvailability } from "ens-components/hooks";
import { getAddressIcon } from "ens-components/icons";
```

Actions, hooks, and icons are not re-exported from the package root.

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
[NameRegistration](https://ens-components.vercel.app/docs/components/name-registration)
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
[NameRenewal](https://ens-components.vercel.app/docs/components/name-renewal)
for duration controls, lifecycle events, slots, and messages.

## Profile records

Render the permission-aware profile editor:

```tsx
import { NameProfileEditor, emptyNameProfileFormValues } from "ens-components";

<NameProfileEditor initialRecords={emptyNameProfileFormValues} name="example.eth" />;
```

The application supplies the initial record snapshot. The component discovers
the resolver, checks the connected account's ENS v2 record permissions,
reviews changes, and submits one atomic resolver multicall. See
[NameProfileEditor](https://ens-components.vercel.app/docs/components/name-profile-editor).

## Documentation

### Components

- [NameRegistration](https://ens-components.vercel.app/docs/components/name-registration)
- [NameRenewal](https://ens-components.vercel.app/docs/components/name-renewal)
- [NameProfileEditor](https://ens-components.vercel.app/docs/components/name-profile-editor)
- [TransactionProgress](https://ens-components.vercel.app/docs/components/transaction-progress)

### Providers

- [EnsProvider](https://ens-components.vercel.app/docs/providers/ens-provider)

### Hooks

#### Registration

- [useNameAvailability](https://ens-components.vercel.app/docs/hooks/use-name-availability)
- [useNamePrice](https://ens-components.vercel.app/docs/hooks/use-name-price)
- [useRegistrationPaymentStatus](https://ens-components.vercel.app/docs/hooks/use-registration-payment-status)
- [useCommitmentStatus](https://ens-components.vercel.app/docs/hooks/use-commitment-status)
- [useCommitName](https://ens-components.vercel.app/docs/hooks/use-commit-name)
- [useRegisterName](https://ens-components.vercel.app/docs/hooks/use-register-name)

#### Renewal

- [useNameRenewalPrice](https://ens-components.vercel.app/docs/hooks/use-name-renewal-price)
- [useNameRenewalPaymentStatus](https://ens-components.vercel.app/docs/hooks/use-name-renewal-payment-status)
- [useRenewName](https://ens-components.vercel.app/docs/hooks/use-renew-name)

#### Resolver and profile

- [useNameProfile](https://ens-components.vercel.app/docs/hooks/use-name-profile)
- [useNameRecords](https://ens-components.vercel.app/docs/hooks/use-name-records)
- [useNameProfilePermissions](https://ens-components.vercel.app/docs/hooks/use-name-profile-permissions)
- [useNameResolver](https://ens-components.vercel.app/docs/hooks/use-name-resolver)
- [useResolverCapabilities](https://ens-components.vercel.app/docs/hooks/use-resolver-capabilities)
- [useDeployPermissionedResolver](https://ens-components.vercel.app/docs/hooks/use-deploy-permissioned-resolver)
- [useUpdateProfileRecords](https://ens-components.vercel.app/docs/hooks/use-update-profile-records)
- [useSetAddressRecord](https://ens-components.vercel.app/docs/hooks/use-set-address-record)
- [useSetPrimaryName](https://ens-components.vercel.app/docs/hooks/use-set-primary-name)

#### Payments and transactions

- [useApprovePaymentToken](https://ens-components.vercel.app/docs/hooks/use-approve-payment-token)
- [useWalletCapabilities](https://ens-components.vercel.app/docs/hooks/use-wallet-capabilities)
- [useExecuteContractWrites](https://ens-components.vercel.app/docs/hooks/use-execute-contract-writes)
- [useContractWritesStatus](https://ens-components.vercel.app/docs/hooks/use-contract-writes-status)

### Icons

- [ENS icons and icon resolvers](https://ens-components.vercel.app/docs/icons/icons)

### Actions

#### Reads

- [Prepared reads and executors](https://ens-components.vercel.app/docs/actions/read/contract-reads)
- [prepareNameAvailabilityRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-name-availability)
- [prepareNamePriceRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-name-price)
- [prepareRegistrationPaymentStatusRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-registration-payment-status)
- [prepareNameRenewalPriceRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-name-renewal-price)
- [prepareNameRenewalPaymentStatusRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-name-renewal-payment-status)
- [prepareCommitmentStatusRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-commitment-status)
- [preparePermissionedResolverVerificationRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-permissioned-resolver-verification)
- [prepareNameResolverRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-name-resolver)
- [prepareNameRecordsRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-name-records)
- [prepareNameProfileDiscoveryRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-name-profile-discovery)
- [preparePermissionedResolverSupportRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-permissioned-resolver-support)
- [prepareNameProfilePermissionsRead](https://ens-components.vercel.app/docs/actions/read/prepare-read-name-profile-permissions)

#### Writes

- [prepareCommitNameWrite](https://ens-components.vercel.app/docs/actions/write/prepare-write-commit-name)
- [preparePaymentTokenApprovalWrite](https://ens-components.vercel.app/docs/actions/write/prepare-write-payment-token-approval)
- [prepareRegisterNameWrite](https://ens-components.vercel.app/docs/actions/write/prepare-write-register-name)
- [prepareRenewNameWrite](https://ens-components.vercel.app/docs/actions/write/prepare-write-renew-name)
- [prepareSetAddressRecordWrite](https://ens-components.vercel.app/docs/actions/write/prepare-write-set-address-record)
- [prepareSetL2PrimaryNameWrite](https://ens-components.vercel.app/docs/actions/write/prepare-write-set-l2-primary-name)
- [prepareSetL1PrimaryNameWrite](https://ens-components.vercel.app/docs/actions/write/prepare-write-set-l1-primary-name)
- [preparePermissionedResolverDeploymentWrite](https://ens-components.vercel.app/docs/actions/write/prepare-write-permissioned-resolver-deployment)
- [prepareProfileRecordsWrite](https://ens-components.vercel.app/docs/actions/write/prepare-write-profile-records)
- [executeContractWrites](https://ens-components.vercel.app/docs/actions/write/execute-contract-writes)
- [supportsAtomicBatchCalls](https://ens-components.vercel.app/docs/actions/write/supports-atomic-batch-calls)
- [getContractCallsStatus and waitForContractCalls](https://ens-components.vercel.app/docs/actions/write/contract-write-status)
