# makeNameCommitment

Builds the ENS v2 commitment hash locally without a contract call.

```ts
import { makeNameCommitment } from "ens-components";
import { bytesToHex, zeroAddress, zeroHash } from "viem";

const secret = bytesToHex(crypto.getRandomValues(new Uint8Array(32)));

const result = makeNameCommitment({
  duration: 31_557_600n,
  input: "example",
  owner,
  referrer: zeroHash,
  resolverAddress: zeroAddress,
  secret,
  subregistryAddress: zeroAddress,
});
```

## Signature

```ts
function makeNameCommitment(
  props: MakeNameCommitmentProps,
): Result<
  MakeNameCommitmentResult,
  MakeNameCommitmentError | ParseNameInputError
>;
```

## Props

| Prop                 | Type                          | Description                                          |
| -------------------- | ----------------------------- | ---------------------------------------------------- |
| `duration`           | `bigint`                      | Registration duration in seconds; must fit `uint64`. |
| `input`              | `string \| null \| undefined` | Label or second-level `.eth` name.                   |
| `owner`              | `Address`                     | Address that will own the name.                      |
| `referrer`           | `Hex`                         | 32-byte referrer identifier.                         |
| `resolverAddress`    | `Address`                     | Initial resolver or `zeroAddress`.                   |
| `secret`             | `Hex`                         | Cryptographically random 32-byte secret.             |
| `subregistryAddress` | `Address`                     | Initial subregistry or `zeroAddress`.                |

## Result

```ts
interface MakeNameCommitmentResult {
  readonly commitment: Hex;
  readonly label: string;
}
```

The commitment hashes the label and every commitment-bound property. Persist
all input values and reuse them unchanged for `prepareRegisterName`.

## Errors

- All [`ParseNameInputError`](parse-name-input.md) codes
- `INVALID_DURATION`
- `INVALID_OWNER_ADDRESS`
- `INVALID_REFERRER`
- `INVALID_RESOLVER_ADDRESS`
- `INVALID_SECRET`
- `INVALID_SUBREGISTRY_ADDRESS`
- `LABEL_TOO_SHORT`
- `UNSUPPORTED_NAME`
