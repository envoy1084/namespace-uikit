---
title: Hooks
description: React query and mutation hooks for ENS v2.
---

# Hooks

Hooks combine typed ENS actions with Wagmi clients and TanStack Query.

## Import

```ts
import { useNameProfile } from "ens-components/hooks";
```

## Read hooks

- `useNameAvailability`
- `useNameRegistrationPrice`
- `useNameRegistrationPaymentStatus`
- `useCommitmentStatus`
- `useNameRenewalPrice`
- `useNameRenewalPaymentStatus`
- `useNameProfile`
- `useNameRecords`
- `useNameResolver`
- `useNameProfilePermissions`
- `useResolverCapabilities`
- `useWalletCapabilities`
- `useContractWritesStatus`

## Write hooks

- `useCommitName`
- `useRegisterName`
- `useRenewName`
- `useApprovePaymentToken`
- `useDeployPermissionedResolver`
- `useUpdateNameProfileRecords`
- `useSetAddressRecord`
- `useSetPrimaryName`
- `useExecuteContractWrites`

Read hooks accept TanStack Query options under `query`. Write hooks accept
mutation options under `mutation`.
