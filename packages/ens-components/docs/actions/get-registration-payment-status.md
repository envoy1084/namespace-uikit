# getRegistrationPaymentStatus

Reads the current price, token balance, and registrar allowance required for
registration.

```ts
import type { Address } from "viem";

import { getRegistrationPaymentStatus } from "ens-components";

declare const paymentTokenAddress: Address;
declare const registrarAddress: Address;

const result = await getRegistrationPaymentStatus(publicClient, {
  account,
  duration: 31_536_000n,
  input: "example",
  network: "testnet",
  paymentTokenAddress,
  registrarAddress,
});
```

## Signature

```ts
function getRegistrationPaymentStatus(
  publicClient: PublicClient,
  props: GetRegistrationPaymentStatusProps,
): ResultAsync<
  RegistrationPaymentStatus,
  GetRegistrationPaymentStatusError | ParseNameInputError
>;
```

## Props

| Prop                  | Type                          | Description                                 |
| --------------------- | ----------------------------- | ------------------------------------------- |
| `account`             | `Address`                     | Account paying for registration.            |
| `duration`            | `bigint`                      | Registration duration in seconds.           |
| `input`               | `string \| null \| undefined` | Label or second-level `.eth` name.          |
| `network`             | `"mainnet" \| "testnet"`      | Network associated with the addresses.      |
| `paymentTokenAddress` | `Address`                     | ERC-20 payment token.                       |
| `registrarAddress`    | `Address`                     | ENS v2 ETH registrar and allowance spender. |

## Result

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

One multicall reads availability, registration price, token decimals, account
balance, and registrar allowance.

## Errors

- All [`ParseNameInputError`](parse-name-input.md) codes
- `CONTRACT_READ_FAILED`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_DURATION`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_REGISTRAR_ADDRESS`
- `LABEL_TOO_SHORT`
- `NAME_NOT_AVAILABLE`
- `UNSUPPORTED_NAME`
