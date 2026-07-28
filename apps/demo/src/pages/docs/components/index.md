---
title: Components
description: Complete React interfaces for common ENS v2 workflows.
---

# Components

Components manage ENS form state, validation, queries, wallet transactions,
confirmation, errors, and success states.

## Import

```tsx
import { NameRegistration } from "ens-components";
```

## Available components

- [`NameRegistration`](/docs/components/name-registration) registers
  second-level `.eth` names.
- [`NameRenewal`](/docs/components/name-renewal) extends an existing
  second-level `.eth` registration.
- [`NameProfileEditor`](/docs/components/name-profile-editor) edits resolver
  records with permission checks and a review step.
- [`TransactionProgress`](/docs/components/transaction-progress) displays
  transaction submission and confirmation progress.

All flow components require `WagmiProvider`, `QueryClientProvider`, and
`EnsProvider`.
