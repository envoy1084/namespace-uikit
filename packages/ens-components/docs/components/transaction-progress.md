# TransactionProgress

`TransactionProgress` displays an animated transaction confirmation estimate
and an optional block-explorer link. It does not poll for a receipt.

```tsx
import { TransactionProgress } from "ens-components";
import { sepolia } from "viem/chains";

<TransactionProgress
  account={account}
  blockExplorerUrl={sepolia.blockExplorers.default.url}
  chainId={sepolia.id}
  isConfirmed={receipt?.status === "success"}
  transactionHash={transactionHash}
/>;
```

## Props

| Prop               | Type        | Default           | Description                                                         |
| ------------------ | ----------- | ----------------- | ------------------------------------------------------------------- |
| `transactionHash`  | `Hex`       | `undefined`       | Transaction displayed by the progress indicator.                    |
| `account`          | `Address`   | `undefined`       | Account used for the explorer fallback before a batch exposes hash. |
| `chainId`          | `number`    | Required          | Selects the estimated confirmation duration.                        |
| `isConfirmed`      | `boolean`   | `false`           | Completes the progress animation when `true`.                       |
| `blockExplorerUrl` | `string`    | `undefined`       | Base explorer URL used to build the transaction or account link.    |
| `icon`             | `ReactNode` | Built-in shuriken | Decorative icon rotated inside the progress bar.                    |
| `className`        | `string`    | `undefined`       | Additional classes for the root element.                            |

Ethereum mainnet (`1`) and Sepolia (`11155111`) use a 16-second estimate.
Unknown chain IDs currently use the same estimate. When `isConfirmed` changes
to `true`, the remaining animation completes in 400 milliseconds.

The parent is responsible for waiting for the transaction receipt and setting
`isConfirmed`.
