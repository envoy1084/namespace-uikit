# useRegistrationPaymentStatus

Reads registration price, ERC-20 balance, and registrar allowance in one
batched query.

```tsx
import { useRegistrationPaymentStatus } from "ens-components/hooks";

const payment = useRegistrationPaymentStatus({
  account: address,
  duration: 31_557_600n,
  input: "example",
});

const canRegister = payment.data?.hasSufficientBalance && payment.data.hasSufficientAllowance;
```

## Parameters

```ts
interface UseRegistrationPaymentStatusParameters<selectData = RegistrationPaymentStatus> {
  account: Address | null | undefined;
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  registrarAddress?: Address;
  query?: Omit<
    UseQueryOptions<RegistrationPaymentStatus, RegistrationPaymentStatusError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

The query is disabled when `account` is `null` or `undefined`, when no public
client is available, or when `query.enabled` is `false`.

The registrar defaults to the contract selected by `EnsProvider`. The payment
token defaults to the first token in the provider configuration.

## Result data

```ts
interface RegistrationPaymentStatus {
  readonly allowance: bigint;
  readonly balance: bigint;
  readonly base: bigint;
  readonly decimals: number;
  readonly hasSufficientAllowance: boolean;
  readonly hasSufficientBalance: boolean;
  readonly premium: bigint;
  readonly total: bigint;
}
```

Amounts are payment-token atomic units. The generated query key includes the
network, contract addresses, account, duration, and input.

See
[`prepareRegistrationPaymentStatusRead`](../actions/read/prepare-read-registration-payment-status)
for reads and error codes.
