# prepareSetPrimaryNameWrite

Prepares an ENS v2 `DefaultReverseRegistrarAdapter.setName` write. It does not
submit a transaction.

```ts
import { prepareSetPrimaryNameWrite } from "ens-components";

const prepared = prepareSetPrimaryNameWrite({
  account,
  input: "example.eth",
  network: "testnet",
  owner: account,
  reverseRegistrarAddress,
});
```

## Props

| Prop                      | Type                     | Description                                          |
| ------------------------- | ------------------------ | ---------------------------------------------------- |
| `account`                 | `Address`                | Wallet account that submits the write.               |
| `input`                   | `string`                 | ENS name or `.eth` label to set as primary.          |
| `network`                 | `"mainnet" \| "testnet"` | Network associated with the adapter.                 |
| `owner`                   | `Address`                | Address whose primary name is updated.               |
| `reverseRegistrarAddress` | `Address`                | ENS v2 reverse-registrar adapter deployment address. |

The connected account must be allowed to name `owner`. An EOA can name itself.
The adapter also supports compatible contract ownership and delegated contract
naming. The stable write kind is `set-primary-name`.

The name's resolver must first contain a matching default EVM forward address
record. Compose this write after `prepareSetAddressRecordWrite`.

## Errors

- Name parsing errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_OWNER_ADDRESS`
- `INVALID_REVERSE_REGISTRAR_ADDRESS`
