---
title: Choosing an API
description: Choose between ENS Components components, hooks, and actions.
---

# Choosing an API

ENS Components exposes each ENS workflow at three levels.

| API        | Use when                                          |
| ---------- | ------------------------------------------------- |
| Components | You need a complete, accessible user flow.        |
| Hooks      | You are building a custom React interface.        |
| Actions    | You own caching, execution, or run outside React. |

## Components

Components manage form state, validation, transaction ordering, confirmation,
errors, and success states.

```tsx
import { NameRenewal } from "ens-components";

<NameRenewal defaultInput="example.eth" />;
```

Use slots, messages, events, and presentation props to integrate them with the
host application.

## Hooks

Hooks combine prepared actions with Wagmi clients and TanStack Query.

```tsx
import { useNameRenewalPrice } from "ens-components/hooks";

const renewal = useNameRenewalPrice({
  duration: 31_557_600n,
  input: "example.eth",
});
```

Use hooks when the application should own rendering but not RPC orchestration.

## Actions

Actions validate inputs and return typed read or write plans. Preparation does
not submit a transaction.

```ts
import { executeContractRead, prepareNameAvailabilityRead } from "ens-components/actions";

const prepared = prepareNameAvailabilityRead({
  input: "example.eth",
  registrarAddress,
});

if (prepared.isOk()) {
  const available = await executeContractRead(publicClient, prepared.value);
}
```

Use actions in state machines, servers, workers, or applications with their
own query layer.
