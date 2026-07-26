# approveRegistrationPayment

Submits an ERC-20 approval allowing the registrar to spend the registration
payment.

```ts
import type { Address } from "viem";

import { approveRegistrationPayment } from "ens-components";

declare const paymentTokenAddress: Address;
declare const registrarAddress: Address;

const result = await approveRegistrationPayment(walletClient, {
  account,
  amount: paymentStatus.total,
  network: "testnet",
  paymentTokenAddress,
  registrarAddress,
});
```

## Signature

```ts
function approveRegistrationPayment(
  walletClient: WalletClient,
  props: ApproveRegistrationPaymentProps,
): ResultAsync<Hex, ApproveRegistrationPaymentError>;
```

## Props

| Prop                  | Type                     | Description                            |
| --------------------- | ------------------------ | -------------------------------------- |
| `account`             | `Address`                | Account that owns the payment tokens.  |
| `amount`              | `bigint`                 | Approval amount in token atomic units. |
| `network`             | `"mainnet" \| "testnet"` | Network associated with the addresses. |
| `paymentTokenAddress` | `Address`                | ERC-20 token contract.                 |
| `registrarAddress`    | `Address`                | Approval spender.                      |

The successful result is the transaction hash. The caller must wait for the
receipt before registering.

## Errors

- `CONTRACT_WRITE_FAILED`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_APPROVAL_AMOUNT`
- `INVALID_PAYMENT_TOKEN_ADDRESS`
- `INVALID_REGISTRAR_ADDRESS`
