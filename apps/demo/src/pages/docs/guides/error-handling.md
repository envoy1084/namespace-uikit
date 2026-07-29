---
title: Error Handling
description: Handle ENS Components action, query, mutation, and component errors.
---

# Error Handling

ENS Components uses stable uppercase error codes. Branch on codes in
application logic and format them only at the rendering boundary.

## Actions

Prepared actions and executors return Neverthrow `Result` values.

```ts [renew.ts]
const prepared = prepareRenewNameWrite({
  account,
  duration,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isErr()) {
  console.error(prepared.error);
  return;
}
```

Preparation errors describe invalid input. Execution errors describe wallet,
network, simulation, submission, and confirmation failures.

## Hooks

Query and mutation hooks reject with the same string codes.

```tsx [availability.tsx]
const query = useNameAvailability({ input: name });

if (query.isError) {
  return <p>{formatError(query.error, { name })}</p>;
}
```

`formatError` accepts `unknown` and optional interpolation data.

```ts [format-error.ts]
import { formatError } from "ens-components";

formatError("NAME_NOT_AVAILABLE", { name: "example.eth" });
```

Do not branch on formatted messages. Branch on the error code, then format the
result at the rendering boundary.

## Components

Component `events.onError` callbacks include the failed phase and, when
available, the submitted transaction hash.

```tsx [registration-events.tsx]
<NameRegistration
  events={{
    onError(event) {
      reportError(event.phase, event.error, event.transactionHash);
    },
  }}
/>
```

Callback errors do not change an already-confirmed onchain result.

:::warning[Sequential writes]
A sequential batch can confirm earlier calls before a later call fails. Handle
`PARTIAL_BATCH_FAILED` using the confirmed progress reported by the executor.
See [Batching](/docs/guides/batching).
:::
