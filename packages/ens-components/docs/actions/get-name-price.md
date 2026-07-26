# getNamePrice

Returns the registration price and ERC-20 decimals for an available
second-level `.eth` name.

```ts
import type { Address } from "viem";

import { REGISTRATION_SECONDS_PER_YEAR, getNamePrice } from "ens-components";

declare const paymentTokenAddress: Address;
declare const registrarAddress: Address;

const result = await getNamePrice(publicClient, {
  duration: REGISTRATION_SECONDS_PER_YEAR,
  input: "example",
  network: "testnet",
  paymentTokenAddress,
  registrarAddress,
});
```

## Signature

```ts
function getNamePrice(
  publicClient: PublicClient,
  props: GetNamePriceProps,
): ResultAsync<NamePrice, GetNamePriceError | ParseNameInputError>;
```

## Props

| Prop                  | Type                          | Description                                          |
| --------------------- | ----------------------------- | ---------------------------------------------------- |
| `duration`            | `bigint`                      | Registration duration in seconds; must fit `uint64`. |
| `input`               | `string \| null \| undefined` | Label or second-level `.eth` name.                   |
| `network`             | `"mainnet" \| "testnet"`      | Network associated with the addresses.               |
| `paymentTokenAddress` | `Address`                     | ERC-20 token used for payment.                       |
| `registrarAddress`    | `Address`                     | ENS v2 ETH registrar.                                |

## Result

```ts
interface NamePrice {
  readonly base: bigint;
  readonly decimals: number;
  readonly premium: bigint;
  readonly total: bigint;
}
```

Amounts are token atomic units. `total` is `base + premium`.

## Contract reads

One multicall reads:

- `isAvailable(label)`
- `getRegisterPrice(label, duration, paymentTokenAddress)`
- ERC-20 `decimals()`

## Errors

- All [`ParseNameInputError`](parse-name-input.md) codes
- `CONTRACT_READ_FAILED`
- `INVALID_DURATION`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_REGISTRAR_ADDRESS`
- `LABEL_TOO_SHORT`
- `NAME_NOT_AVAILABLE`
- `UNSUPPORTED_NAME`
