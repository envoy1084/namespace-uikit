# prepareSetL2PrimaryNameWrite

Prepares an ENS v2 `L2ReverseRegistrar.setName(string)` write. It does not
submit a transaction.

```ts
import { prepareSetL2PrimaryNameWrite } from "ens-components";

const prepared = prepareSetL2PrimaryNameWrite({
  account,
  input: "example.eth",
  l2ReverseRegistrarAddress,
  network: "testnet",
});
```

## Props

| Prop                        | Type                     | Description                                    |
| --------------------------- | ------------------------ | ---------------------------------------------- |
| `account`                   | `Address`                | Wallet account whose primary name is updated.  |
| `input`                     | `string`                 | ENS name or `.eth` label to set as primary.    |
| `l2ReverseRegistrarAddress` | `Address`                | Deployed ENS v2 reverse registrar address.     |
| `network`                   | `"mainnet" \| "testnet"` | Network associated with the reverse registrar. |

`setName(string)` derives the address being named from `msg.sender`. The stable
write kind is `set-l2-primary-name`.

When setting an Ethereum primary name, compose this write after
`prepareSetAddressRecordWrite` and before
`prepareSetL1PrimaryNameWrite`.

## Errors

- Name parsing errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_L2_REVERSE_REGISTRAR_ADDRESS`
