# prepareSetAddressRecordWrite

Prepares the Ethereum forward address record used to verify an L1 ENS primary
name. It does not submit a transaction.

```ts
import { ETH_COIN_TYPE, prepareSetAddressRecordWrite } from "ens-components/actions";

const prepared = prepareSetAddressRecordWrite({
  account,
  input: "example.eth",
  network: "testnet",
  owner: account,
  resolverAddress,
});
```

## Props

| Prop              | Type                     | Description                                        |
| ----------------- | ------------------------ | -------------------------------------------------- |
| `account`         | `Address`                | Wallet account authorized to update the resolver.  |
| `input`           | `string`                 | ENS name or `.eth` label.                          |
| `network`         | `"mainnet" \| "testnet"` | Network associated with the resolver.              |
| `owner`           | `Address`                | Address encoded into the forward address record.   |
| `resolverAddress` | `Address`                | Resolver assigned to the name during registration. |

The prepared request calls the multicoin
`setAddr(bytes32,uint256,bytes)` overload with coin type
`ETH_COIN_TYPE` (`60`) and the packed owner address. Its stable write kind is
`set-address-record`.

Execute the result with `executeContractWrites`. When setting a primary name,
place this write after registration and before the L2 and L1 reverse writes.

## Errors

- Name parsing errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_OWNER_ADDRESS`
- `INVALID_RESOLVER_ADDRESS`
