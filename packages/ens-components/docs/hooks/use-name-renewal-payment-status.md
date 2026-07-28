# useNameRenewalPaymentStatus

Reads a renewal quote together with an account's payment-token balance and
allowance.

```tsx
import { useNameRenewalPaymentStatus } from "ens-components/hooks";
import { useAccount } from "wagmi";

const { address } = useAccount();
const payment = useNameRenewalPaymentStatus({
  account: address,
  duration: 31_557_600n,
  input: "example.eth",
});
```

## Parameters

```ts
interface UseNameRenewalPaymentStatusParameters<
  selectData = NameRenewalPaymentStatus,
> {
  account: Address | null | undefined;
  duration: bigint;
  ethRegistryAddress?: Address;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  registrarAddress?: Address;
  query?: Omit<
    UseQueryOptions<
      NameRenewalPaymentStatus,
      NameRenewalPaymentStatusError,
      selectData
    >,
    "queryFn" | "queryKey"
  >;
}
```

Contract and token addresses default to `EnsProvider`. The query is disabled
when `account` is absent or no public client is available.

## Result data

The result extends the renewal quote with `allowance`, `balance`,
`hasSufficientAllowance`, and `hasSufficientBalance`. All token amounts use
atomic units.

See
[`prepareNameRenewalPaymentStatusRead`](../actions/read/prepare-read-name-renewal-payment-status.md)
for the prepared read plan.
