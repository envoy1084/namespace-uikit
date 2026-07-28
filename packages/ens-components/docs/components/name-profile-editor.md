# NameProfileEditor

`NameProfileEditor` edits records on an ENS v2 `PermissionedResolver`. It
provides an editor, change review, transaction progress, and confirmation
screen.

The parent application supplies the current normalized records. This keeps
record fetching and caching outside the component.

It requires `WagmiProvider`, `QueryClientProvider`, and
[`EnsProvider`](../providers/ens-provider.md).

## Basic usage

```tsx
import { NameProfileEditor, type NameProfileFormValues } from "ens-components";

const records: NameProfileFormValues = {
  abi: [],
  addresses: [{ coinType: "60", value: "0x..." }],
  contenthash: "",
  data: [],
  interfaces: [],
  name: "",
  pubkey: { x: "", y: "" },
  text: [{ key: "description", value: "Building useful things." }],
};

<NameProfileEditor initialRecords={records} name="example.eth" />;
```

The default presentation renders an `Edit profile` trigger and opens a dialog.
Set `presentation="inline"` to render directly in the page.

## Props

| Prop              | Type                                 | Default    | Description                                                       |
| ----------------- | ------------------------------------ | ---------- | ----------------------------------------------------------------- |
| `name`            | `string`                             | Required   | ENS name whose resolver records are edited.                       |
| `initialRecords`  | `NameProfileFormValues`              | Required   | Complete normalized record snapshot used as the diff baseline.    |
| `resolverAddress` | `Address`                            | Discovered | Optional resolver override.                                       |
| `presentation`    | `"dialog" \| "inline"`               | `"dialog"` | Selects the outer presentation.                                   |
| `uploadImage`     | `NameProfileImageUpload`             | None       | Uploads avatar or header files and returns the stored record URI. |
| `slots`           | `NameProfileEditorSlots`             | `{}`       | Replaces supported visuals and the dialog trigger.                |
| `messages`        | `Partial<NameProfileEditorMessages>` | Defaults   | Overrides high-level interface copy.                              |
| `events`          | `NameProfileEditorEvents`            | `{}`       | Receives confirmed updates and errors.                            |
| `className`       | `string`                             | None       | Class name applied to the inline surface.                         |

When `resolverAddress` is omitted, the component discovers it through the
configured Universal Resolver v2.

## Records

The component supports:

- Text records, including custom keys
- ENSIP-9 multicoin addresses
- Contenthash
- ABI records
- Arbitrary keyed data
- EIP-165 interface implementers
- Resolver name
- SECP256k1 public key coordinates

Use `normalizeProfileRecords(records)` before rendering when records come from
an untrusted or loosely typed source. It returns a `neverthrow` result with a
canonical `NameProfileFormValues` value.

## Image uploads and placeholders

```tsx
<NameProfileEditor
  initialRecords={records}
  name="example.eth"
  uploadImage={async (file, { name, record }) => {
    return uploadAndReturnUri(file, { name, record });
  }}
  slots={{
    avatarPlaceholder: <AvatarPlaceholder />,
    headerPlaceholder: <HeaderPlaceholder />,
  }}
/>
```

`uploadImage` must return the URI stored in the `avatar` or `header` text
record. Without it, the media controls are disabled.

## Permission behavior

When a wallet is connected, the component discovers the name's resolver,
verifies `IPermissionedResolver`, and reads Enhanced Access Control roles for
every displayed record.

Fixed record controls are disabled when the account lacks permission. The Next
button remains disabled while permission reads are pending or when a pending
change is unauthorized. Before submission, the exact
`multicallWithNodeCheck` transaction is simulated from the connected account.

The checks support:

- Resolver owners with all roles
- Name-wide record delegates
- Global record-key or coin-type delegates
- Name-specific record-key or coin-type delegates

NFT ownership alone is not treated as resolver write permission.

## Slots

| Slot                      | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `trigger`                 | Dialog trigger. Ignored by inline mode.            |
| `avatarPlaceholder`       | Empty-avatar content.                              |
| `headerPlaceholder`       | Empty-header content.                              |
| `reviewGraphic`           | Graphic on the change review screen.               |
| `successGraphic`          | Graphic after the update confirms.                 |
| `transactionProgressIcon` | Icon animated while the transaction is confirming. |

An `undefined` slot uses the default. Passing `null` hides optional content.

## Messages

| Key                  | Default                                        |
| -------------------- | ---------------------------------------------- |
| `triggerLabel`       | `Edit profile`                                 |
| `searchPlaceholder`  | `Search records`                               |
| `reviewTitle`        | `Review changes`                               |
| `reviewDescription`  | `Review the records you are about to update.`  |
| `updateLabel`        | `Update`                                       |
| `successTitle`       | `Profile updated`                              |
| `successDescription` | `Your ENS profile records are now up to date.` |
| `doneLabel`          | `Done`                                         |

## Lifecycle events

```tsx
<NameProfileEditor
  events={{
    onUpdate: ({ changes, transactionHash, values }) => {},
    onError: ({ error, phase, transactionHash }) => {},
  }}
  initialRecords={records}
  name="example.eth"
/>
```

`onUpdate` runs after the resolver transaction confirms. `onError` uses the
phase `"resolver"`, `"permission"`, or `"update"`. Consumer callback failures
do not change an already-confirmed flow.
