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
- TanStack Query hooks for availability, pricing, and payment status
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

## Profile records

Render the permission-aware profile editor:

```tsx
import { NameProfileEditor, emptyNameProfileFormValues } from "ens-components";

<NameProfileEditor
  initialRecords={emptyNameProfileFormValues}
  name="example.eth"
/>;
```

The application supplies the initial record snapshot. The component discovers
the resolver, checks the connected account's ENS v2 record permissions,
reviews changes, and submits one atomic resolver multicall. See
[NameProfileEditor](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/name-profile-editor.md).

## Documentation

### Components

- [NameRegistration](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/name-registration.md)
- [NameRenewal](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/name-renewal.md)
- [NameProfileEditor](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/name-profile-editor.md)
- [TransactionProgress](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/components/transaction-progress.md)

### Providers

- [EnsProvider](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/providers/ens-provider.md)

### Hooks

- [useNameAvailability](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-availability.md)
- [useNamePrice](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-price.md)
- [useRegistrationPaymentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-registration-payment-status.md)
- [useNameRenewalPrice](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-renewal-price.md)
- [useNameRenewalPaymentStatus](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-renewal-payment-status.md)
- [useNameProfilePermissions](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/hooks/use-name-profile-permissions.md)

### Icons

- [ENS icons and icon resolvers](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/icons/icons.md)

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
- [prepareNameResolverRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-name-resolver.md)
- [preparePermissionedResolverSupportRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-permissioned-resolver-support.md)
- [prepareNameProfilePermissionsRead](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/read/prepare-read-name-profile-permissions.md)

#### Writes

- [prepareCommitNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-commit-name.md)
- [preparePaymentTokenApprovalWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-payment-token-approval.md)
- [prepareRegisterNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-register-name.md)
- [prepareRenewNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-renew-name.md)
- [prepareSetAddressRecordWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-set-address-record.md)
- [prepareSetL2PrimaryNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-set-l2-primary-name.md)
- [prepareSetL1PrimaryNameWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-set-l1-primary-name.md)
- [preparePermissionedResolverDeploymentWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-permissioned-resolver-deployment.md)
- [prepareProfileRecordsWrite](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/prepare-write-profile-records.md)
- [executeContractWrites](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/execute-contract-writes.md)
- [supportsAtomicBatchCalls](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/supports-atomic-batch-calls.md)
- [getContractCallsStatus and waitForContractCalls](https://github.com/thenamespace/uikit/blob/main/packages/ens-components/docs/actions/write/contract-write-status.md)
