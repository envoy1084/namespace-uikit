# registerName

Reveals a valid commitment and submits the final ENS v2 registration
transaction.

```ts
import type { Address } from "viem";

import { registerName } from "ens-components";

declare const paymentTokenAddress: Address;
declare const registrarAddress: Address;

const result = await registerName(walletClient, {
  account,
  duration,
  input: "example",
  network: "testnet",
  owner,
  paymentTokenAddress,
  referrer,
  registrarAddress,
  resolverAddress,
  secret,
  subregistryAddress,
});
```

## Signature

```ts
function registerName(
  walletClient: WalletClient,
  props: RegisterNameProps,
): ResultAsync<RegisterNameResult, RegisterNameError | ParseNameInputError>;
```

`RegisterNameProps` contains every
[`MakeNameCommitmentProps`](make-name-commitment.md) field plus:

| Prop                  | Type                     | Description                                     |
| --------------------- | ------------------------ | ----------------------------------------------- |
| `account`             | `Address`                | Account paying for and submitting registration. |
| `network`             | `"mainnet" \| "testnet"` | Network associated with the addresses.          |
| `paymentTokenAddress` | `Address`                | ERC-20 token approved for payment.              |
| `registrarAddress`    | `Address`                | ENS v2 ETH registrar.                           |

The owner, secret, duration, referrer, resolver, and subregistry must exactly
match the values used to create the commitment.

## Result

```ts
interface RegisterNameResult {
  readonly label: string;
  readonly transactionHash: Hex;
}
```

The action returns after wallet submission. Wait for a successful receipt and
read the registrar's `NameRegistered` event for authoritative price, duration,
and token ID values.

## Errors

- All `makeNameCommitment` errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_REGISTRAR_ADDRESS`
- `CONTRACT_WRITE_FAILED`
