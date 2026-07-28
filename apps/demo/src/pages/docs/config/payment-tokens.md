---
title: Payment Tokens
description: Configure ERC-20 tokens accepted by an ENS v2 registrar.
---

# Payment Tokens

ENS v2 registration and renewal use ERC-20 payment tokens. Every
configuration must contain at least one token.

```ts
interface EnsPaymentToken {
  readonly address: Address;
  readonly decimals: number;
  readonly icon: EnsIconComponent;
  readonly name: string;
  readonly symbol: string;
}

type EnsPaymentTokens = readonly [EnsPaymentToken, ...EnsPaymentToken[]];
```

Components render the configured tokens in their payment selector. Hooks use
the first token when `paymentTokenAddress` is omitted.

## Testnet tokens

| Token     | Address                                      | Decimals |
| --------- | -------------------------------------------- | -------- |
| Mock USDC | `0xba11ebdb3f9a2c5946d8629517f06364e53a2e10` | 6        |
| Mock DAI  | `0x2922bcd677af690fcd1ecc699519e4bfabc73ff8` | 18       |

## Custom token

```ts
import { UsdcIcon } from "ens-components/icons";

const paymentToken = {
  address: "0x...",
  decimals: 6,
  icon: UsdcIcon,
  name: "USD Coin",
  symbol: "USDC",
} as const;
```

The token must implement ERC-20 `decimals`, `balanceOf`, `allowance`, and
`approve`. The configured registrar must accept the token for pricing and
payment.
