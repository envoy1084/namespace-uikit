# prepareSetL1PrimaryNameWrite

Prepares a registry-backed `ReverseRegistrar.setName(string)` write for
Ethereum's `addr.reverse` namespace. It does not submit a transaction.

```ts
import { prepareSetL1PrimaryNameWrite } from "ens-components";

const prepared = prepareSetL1PrimaryNameWrite({
  account,
  input: "example.eth",
  l1ReverseRegistrarAddress,
  network: "testnet",
});
```

## Props

| Prop                        | Type                     | Description                                    |
| --------------------------- | ------------------------ | ---------------------------------------------- |
| `account`                   | `Address`                | Wallet account whose primary name is updated.  |
| `input`                     | `string`                 | ENS name or `.eth` label to set as primary.    |
| `l1ReverseRegistrarAddress` | `Address`                | Deployed L1 reverse registrar address.         |
| `network`                   | `"mainnet" \| "testnet"` | Network associated with the reverse registrar. |

`setName(string)` derives the address being named from `msg.sender`. The stable
write kind is `set-l1-primary-name`.

For parity with the ENS app, compose this write after the explicit Ethereum
forward address record and the ENS v2 reverse write.

## Errors

- Name parsing errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_L1_REVERSE_REGISTRAR_ADDRESS`
