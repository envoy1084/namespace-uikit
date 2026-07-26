# NameRegistration

`NameRegistration` provides the complete ENS v2 registration flow for
second-level `.eth` names:

1. Check availability and price.
2. Submit and persist a commitment.
3. Wait for the commitment minimum age.
4. Approve the ERC-20 payment token when required.
5. Submit the registration transaction.
6. Display the confirmed registration.

It requires `WagmiProvider`, `QueryClientProvider`, and
[`EnsProvider`](../providers/ens-provider.md).

## Basic usage

```tsx
import { NameRegistration } from "ens-components";

<NameRegistration />;
```

The default presentation renders a `Register` trigger and opens the flow in a
dialog.

## Inline presentation

```tsx
<NameRegistration presentation="inline" />
```

Inline mode renders the flow directly and ignores `slots.trigger`.

## Props

| Prop                  | Type                                | Default              | Description                                                    |
| --------------------- | ----------------------------------- | -------------------- | -------------------------------------------------------------- |
| `presentation`        | `"dialog" \| "inline"`              | `"dialog"`           | Selects the outer presentation.                                |
| `defaultInput`        | `string`                            | `""`                 | Initial name input.                                            |
| `defaultDuration`     | `bigint`                            | `31_536_000n`        | Initial duration in seconds. Values below 28 days are clamped. |
| `defaultDurationMode` | `"date" \| "duration"`              | `"duration"`         | Initial duration control.                                      |
| `defaultReferrer`     | `Hex`                               | `zeroHash`           | Initial 32-byte referrer identifier.                           |
| `slots`               | `NameRegistrationSlots`             | `{}`                 | Replaces branded visual elements.                              |
| `messages`            | `Partial<NameRegistrationMessages>` | Default English copy | Overrides high-level interface copy.                           |
| `events`              | `NameRegistrationEvents`            | `{}`                 | Receives confirmed transactions and flow errors.               |

The default values initialize internal state. They are not controlled props.

## Slots

```tsx
<NameRegistration
  slots={{
    trigger: <button>Claim a name</button>,
    searchGraphic: <SearchGraphic />,
    processGraphic: <ProcessGraphic />,
    successGraphic: <SuccessGraphic />,
    transactionProgressIcon: <BrandIcon />,
  }}
/>
```

| Slot                      | Description                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| `trigger`                 | Replaces the dialog trigger. Ignored by inline mode.                      |
| `searchGraphic`           | Graphic on the availability and pricing screen.                           |
| `processGraphic`          | Graphic above the commitment flow.                                        |
| `successGraphic`          | Graphic on the completed registration screen.                             |
| `transactionProgressIcon` | Icon animated during commitment, approval, and registration confirmation. |

An `undefined` slot uses the default. Passing `null` hides a graphic.

## Messages

```tsx
<NameRegistration
  messages={{
    doneLabel: "Continue",
    searchTitle: "Claim your onchain identity",
    successTitle: "Your name is ready",
  }}
/>
```

| Key                  | Default                                    |
| -------------------- | ------------------------------------------ |
| `triggerLabel`       | `Register`                                 |
| `searchTitle`        | `Register your ENS Name`                   |
| `searchDescription`  | `Register your ENS name and set a profile` |
| `searchPlaceholder`  | `Search Label, eg- vitalik`                |
| `processTitle`       | `ENS Registration Process`                 |
| `processDescription` | `Registration consists of 3 steps`         |
| `successTitle`       | `Hooray! You've registered`                |
| `doneLabel`          | `Done`                                     |

Protocol-critical step descriptions, errors, and transaction states are not
customizable through `messages`.

## Lifecycle events

```tsx
<NameRegistration
  events={{
    onCommit: ({ commitment, transactionHash }) => {},
    onApprove: ({ amount, transactionHash }) => {},
    onRegister: ({ name, tokenId, transactionHash }) => {},
    onError: ({ error, phase, transactionHash }) => {},
  }}
/>
```

| Event        | When it runs                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| `onCommit`   | The commitment receipt succeeds and the commitment is stored locally.                                   |
| `onApprove`  | A required ERC-20 approval receipt succeeds. It does not run when the existing allowance is sufficient. |
| `onRegister` | The registration receipt succeeds and registration details are available.                               |
| `onError`    | An attempted commitment, approval, or registration phase cannot complete.                               |

Confirmed transaction events contain `chainId`, `network`,
`transactionHash`, and the Viem `TransactionReceipt`. Operation-specific
payloads include the related addresses and values.

`onError.phase` is `"commitment"`, `"approval"`, or `"registration"`.
`transactionHash` is included when a transaction was submitted.

Callbacks may return a promise, but the flow does not wait for it. Thrown or
rejected callback errors do not change an already-confirmed transaction flow.

## Resuming registration

The component can resume a confirmed commitment from the same browser origin
when the name, wallet, duration, referrer, network, and contracts still match.
Progress is not synchronized across browsers or devices.

## Current constraints

- Only second-level `.eth` names are supported.
- Labels must contain at least three Unicode code points.
- Registration uses the payment token configured by `EnsProvider`.
- Only the ENS v2 Sepolia testnet configuration is currently available.
