---
title: useNameAvailability
description: Check whether a second-level .eth name is available.
---

# useNameAvailability

Checks whether a second-level `.eth` name is available. Input is normalized
and debounced for 300 milliseconds.

## Import

```ts
import { useNameAvailability } from "ens-components/hooks";
```

## Usage

```tsx
const availability = useNameAvailability({
  input: "example",
});

if (availability.isFetching) return <span>Checking...</span>;
if (availability.isError) return <span>{availability.error}</span>;
if (availability.data) return <span>Available</span>;
```

## Parameters

```ts
interface UseNameAvailabilityParameters<selectData = boolean> {
  input: string | null | undefined;
  registrarAddress?: Address;
  query?: Omit<UseQueryOptions<boolean, NameAvailabilityError, selectData>, "queryFn" | "queryKey">;
}
```

### input

`string | null | undefined`

A label or ENS name. A single label is interpreted as `<label>.eth`.

### registrarAddress

`Address | undefined`

ENS v2 registrar address. Defaults to `contracts.ethRegistrar.address` from
`EnsProvider`.

### query

TanStack Query options, excluding `queryFn` and `queryKey`. See
[Queries](/docs/guides/queries).

The query is disabled while input is changing, when no public client is
available, or when the normalized input is not a second-level `.eth` name.

## Return Type

`UseQueryResult<boolean, NameAvailabilityError>`

`data` is `true` when the name is available and `false` when it is registered
or otherwise unavailable.

## Action

Uses
[`prepareNameAvailabilityRead`](/docs/actions/read-name-availability)
and `executeContractRead`.
