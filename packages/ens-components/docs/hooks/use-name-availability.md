# useNameAvailability

Checks whether a second-level `.eth` name is available through TanStack Query.
Input is normalized and debounced for 300 milliseconds.

```tsx
import { useNameAvailability } from "ens-components";

const availability = useNameAvailability({
  input: "vitalik",
});

if (availability.isFetching) return <span>Checking…</span>;
if (availability.isError) return <span>{availability.error}</span>;
if (availability.data) return <span>Available</span>;
```

The hook requires `WagmiProvider`, `QueryClientProvider`, and `EnsProvider`.

## Parameters

```ts
interface UseNameAvailabilityParameters<selectData = boolean> {
  input: string | null | undefined;
  registrarAddress?: Address;
  query?: Omit<
    UseQueryOptions<boolean, NameAvailabilityError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

| Parameter          | Default            | Description                                                        |
| ------------------ | ------------------ | ------------------------------------------------------------------ |
| `input`            | Required           | Label or ENS name. A single label is interpreted as `<label>.eth`. |
| `registrarAddress` | Provider registrar | Overrides the ENS v2 registrar address.                            |
| `query`            | `undefined`        | TanStack Query options except `queryFn` and `queryKey`.            |

The query is disabled while input is changing, when no public client is
available, or when the normalized input is not a second-level `.eth` name.
Invalid input therefore does not produce an error in the query result. Use
[`parseNameInput`](../actions/parse-name-input.md) when validation feedback is
required before querying.

## Return value

Returns the standard TanStack Query result with:

- `data: boolean | undefined`
- `error: IsNameAvailableError | ParseNameInputError | null`

The generated query key includes the network, registrar address, and normalized
name. All normal TanStack options such as `enabled`, `retry`, `select`,
`staleTime`, and `refetchInterval` remain available through `query`.
