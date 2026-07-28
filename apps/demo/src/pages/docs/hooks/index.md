---
title: Hooks
description: React query and mutation hooks for ENS v2.
---

# Hooks

Hooks connect ENS actions to Wagmi clients and TanStack Query.

## Import

```ts
import { useNameProfile } from "ens-components/hooks";
```

## Available hooks

- [`useNameAvailability`](/docs/hooks/use-name-availability)
- [`useNameRegistrationPrice`](/docs/hooks/use-name-registration-price)
- [`useNameRegistrationPaymentStatus`](/docs/hooks/use-name-registration-payment-status)
- [`useCommitmentStatus`](/docs/hooks/use-commitment-status)
- [`useNameRenewalPrice`](/docs/hooks/use-name-renewal-price)
- [`useNameRenewalPaymentStatus`](/docs/hooks/use-name-renewal-payment-status)
- [`useNameProfile`](/docs/hooks/use-name-profile)
- [`useNameRecords`](/docs/hooks/use-name-records)
- [`useNameResolver`](/docs/hooks/use-name-resolver)
- [`useNameProfilePermissions`](/docs/hooks/use-name-profile-permissions)
- [`useResolverCapabilities`](/docs/hooks/use-resolver-capabilities)
- [`useWalletCapabilities`](/docs/hooks/use-wallet-capabilities)
- [`useContractWritesStatus`](/docs/hooks/use-contract-writes-status)
- [`useCommitName`](/docs/hooks/use-commit-name)
- [`useRegisterName`](/docs/hooks/use-register-name)
- [`useRenewName`](/docs/hooks/use-renew-name)
- [`useApprovePaymentToken`](/docs/hooks/use-approve-payment-token)
- [`useDeployPermissionedResolver`](/docs/hooks/use-deploy-permissioned-resolver)
- [`useUpdateNameProfileRecords`](/docs/hooks/use-update-name-profile-records)
- [`useSetAddressRecord`](/docs/hooks/use-set-address-record)
- [`useSetPrimaryName`](/docs/hooks/use-set-primary-name)
- [`useExecuteContractWrites`](/docs/hooks/use-execute-contract-writes)

Read hooks accept TanStack Query options under `query`. Write hooks accept
mutation options under `mutation`. Read [Queries](/docs/guides/queries) and
[Transactions](/docs/guides/transactions) for shared behavior.
