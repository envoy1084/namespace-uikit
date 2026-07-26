# commitName

Builds and submits an ENS v2 `.eth` commitment transaction.

```ts
import type { Address } from "viem";

import { commitName } from "ens-components";
import { bytesToHex, zeroAddress, zeroHash } from "viem";

declare const registrarAddress: Address;

const secret = bytesToHex(crypto.getRandomValues(new Uint8Array(32)));

const result = await commitName(walletClient, {
  account,
  duration: 31_536_000n,
  input: "example",
  network: "testnet",
  owner: account,
  referrer: zeroHash,
  registrarAddress,
  resolverAddress: zeroAddress,
  secret,
  subregistryAddress: zeroAddress,
});

if (result.isOk()) {
  await publicClient.waitForTransactionReceipt({
    hash: result.value.transactionHash,
  });
}
```

## Signature

```ts
function commitName(
  walletClient: WalletClient,
  props: CommitNameProps,
): ResultAsync<CommitNameResult, CommitNameError | ParseNameInputError>;
```

`CommitNameProps` contains all
[`MakeNameCommitmentProps`](make-name-commitment.md) fields plus:

| Prop               | Type                     | Description                            |
| ------------------ | ------------------------ | -------------------------------------- |
| `account`          | `Address`                | Account that submits the transaction.  |
| `network`          | `"mainnet" \| "testnet"` | Network associated with the registrar. |
| `registrarAddress` | `Address`                | ENS v2 ETH registrar.                  |

## Result

```ts
interface CommitNameResult {
  readonly commitment: Hex;
  readonly label: string;
  readonly transactionHash: Hex;
}
```

The action returns after wallet submission. The caller must wait for a
successful receipt before starting the commitment timer or persisting it as
confirmed.

## Errors

- All `makeNameCommitment` errors
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_REGISTRAR_ADDRESS`
- `CONTRACT_WRITE_FAILED`

Wallet rejection and simulation/write failures are represented by
`CONTRACT_WRITE_FAILED`.
