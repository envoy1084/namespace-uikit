# isNameAvailable

Checks whether a normalized second-level `.eth` name is available at an
explicit ENS v2 registrar.

```ts
import type { Address } from "viem";

import { isNameAvailable } from "ens-components";

declare const registrarAddress: Address;

const result = await isNameAvailable(publicClient, {
  input: "example",
  network: "testnet",
  registrarAddress,
});

if (result.isOk()) {
  console.log(result.value); // boolean
}
```

## Signature

```ts
function isNameAvailable(
  publicClient: PublicClient,
  props: IsNameAvailableProps,
): ResultAsync<boolean, IsNameAvailableError | ParseNameInputError>;
```

## Props

| Prop               | Type                          | Description                                    |
| ------------------ | ----------------------------- | ---------------------------------------------- |
| `input`            | `string \| null \| undefined` | Label or ENS name to normalize.                |
| `network`          | `"mainnet" \| "testnet"`      | Network associated with the registrar address. |
| `registrarAddress` | `Address`                     | ENS v2 ETH registrar to query.                 |

Only second-level `.eth` names with at least three Unicode code points are
accepted.

## Errors

- All [`ParseNameInputError`](parse-name-input.md) codes
- `LABEL_TOO_SHORT`
- `UNSUPPORTED_NAME`
- `INVALID_REGISTRAR_ADDRESS`
- `CONTRACT_READ_FAILED`

The action performs one contract read. It does not debounce, cache, or read
React context. Use [`useNameAvailability`](../hooks/use-name-availability.md)
for UI queries.
