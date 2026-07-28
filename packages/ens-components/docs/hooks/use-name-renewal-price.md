# useNameRenewalPrice

Reads whether a second-level `.eth` name is renewable, its current expiry,
renewal price, projected expiry, and payment-token decimals through TanStack
Query. Input is normalized and debounced for 300 milliseconds.

```tsx
import { useNameRenewalPrice } from "ens-components/hooks";
import { formatUnits } from "viem";

const quote = useNameRenewalPrice({
  duration: 31_557_600n,
  input: "example",
});

if (quote.data) {
  const total = formatUnits(quote.data.total, quote.data.decimals);
}
```

## Parameters

```ts
interface UseNameRenewalPriceParameters<selectData = NameRenewalPrice> {
  duration: bigint;
  ethRegistryAddress?: Address;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  registrarAddress?: Address;
  query?: Omit<
    UseQueryOptions<NameRenewalPrice, NameRenewalPriceError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

Contract and payment-token addresses default to `EnsProvider`. `duration` is
the number of seconds added to the current expiry. The query is disabled when
the input is not a second-level `.eth` name or no public client is available.

## Result data

```ts
interface NameRenewalPrice {
  readonly currentExpiry: bigint;
  readonly decimals: number;
  readonly duration: bigint;
  readonly newExpiry: bigint;
  readonly total: bigint;
}
```

Timestamps are Unix seconds. `total` is expressed in payment-token atomic
units.

See
[`prepareNameRenewalPriceRead`](../actions/read/prepare-read-name-renewal-price.md)
for validation and error codes.
