# useNamePrice

Reads the current ENS v2 registration price and payment-token decimals through
TanStack Query. Input is normalized and debounced for 300 milliseconds.

```tsx
import { REGISTRATION_SECONDS_PER_YEAR, useNamePrice } from "ens-components";
import { formatUnits } from "viem";

const price = useNamePrice({
  duration: REGISTRATION_SECONDS_PER_YEAR,
  input: "example",
});

if (price.data) {
  const value = formatUnits(price.data.total, price.data.decimals);
}
```

## Parameters

```ts
interface UseNamePriceParameters<selectData = NamePrice> {
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  registrarAddress?: Address;
  query?: Omit<
    UseQueryOptions<NamePrice, NamePriceError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

| Parameter             | Default              | Description                                             |
| --------------------- | -------------------- | ------------------------------------------------------- |
| `duration`            | Required             | Registration duration in seconds.                       |
| `input`               | Required             | Label or second-level `.eth` name.                      |
| `paymentTokenAddress` | First provider token | ERC-20 token used for the quote.                        |
| `registrarAddress`    | Provider registrar   | ENS v2 registrar to query.                              |
| `query`               | `undefined`          | TanStack Query options except `queryFn` and `queryKey`. |

The query is disabled when the normalized input is not a second-level `.eth`
name or no public client is available.

## Result data

```ts
interface NamePrice {
  readonly base: bigint;
  readonly decimals: number;
  readonly premium: bigint;
  readonly total: bigint;
}
```

All amounts are payment-token atomic units. `total` is `base + premium`.

The generated query key includes the network, registrar, payment token,
duration, and normalized name.

See [`getNamePrice`](../actions/get-name-price.md) for validation and error
codes.
