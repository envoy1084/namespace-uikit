# prepareSetPrimaryNameWrite

Prepares a canonical ENS `DefaultReverseRegistrar.setName(string)` write. It
does not submit a transaction.

```ts
import { prepareSetPrimaryNameWrite } from "ens-components";

const prepared = prepareSetPrimaryNameWrite({
  account,
  input: "example.eth",
  network: "testnet",
  reverseRegistrarAddress,
});
```

## Props

| Prop                      | Type                     | Description                                     |
| ------------------------- | ------------------------ | ----------------------------------------------- |
| `account`                 | `Address`                | Wallet account whose primary name is updated.   |
| `input`                   | `string`                 | ENS name or `.eth` label to set as primary.     |
| `network`                 | `"mainnet" \| "testnet"` | Network associated with the reverse registrar.  |
| `reverseRegistrarAddress` | `Address`                | Canonical default reverse registrar deployment. |

`setName(string)` derives the address being named from `msg.sender`, so
`account` is both the submitting wallet and the address whose default primary
name is updated. The stable write kind is `set-primary-name`.

The name's resolver must first contain a matching default EVM forward address
record. Compose this write after `prepareSetAddressRecordWrite`.

## Errors

- Name parsing errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_REVERSE_REGISTRAR_ADDRESS`
