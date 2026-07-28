---
title: NameProfileEditor
description: Edit records on an ENS v2 PermissionedResolver.
---

# NameProfileEditor

Edits records on an ENS v2 PermissionedResolver with validation, permission
checks, review, submission, and confirmation states.

The application supplies the current records. Fetching, caching, and refreshing
that snapshot remain under application control.

## Import

```ts
import { NameProfileEditor, type NameProfileFormValues } from "ens-components";
```

## Usage

```tsx
const records: NameProfileFormValues = {
  abi: [],
  addresses: [
    {
      coinType: "60",
      value: "0x0000000000000000000000000000000000000000",
    },
  ],
  contenthash: "",
  data: [],
  interfaces: [],
  name: "",
  pubkey: { x: "", y: "" },
  text: [
    { key: "description", value: "Building useful things." },
    { key: "com.example.status", value: "Available" },
  ],
};

export function ProfileEditor() {
  return (
    <NameProfileEditor
      initialRecords={records}
      name="example.eth"
      events={{
        onUpdate: ({ values }) => {
          // Replace the cached snapshot with the confirmed values.
        },
      }}
    />
  );
}
```

### Presentation

The default `dialog` presentation renders a trigger and opens the flow in a
modal.

```tsx
<NameProfileEditor initialRecords={records} name="example.eth" presentation="dialog" />
```

Use `inline` when the editor belongs directly in the page layout.

```tsx
<NameProfileEditor
  className="max-w-md"
  initialRecords={records}
  name="example.eth"
  presentation="inline"
/>
```

## Props

| Prop              | Type                                 | Default    | Description                                                 |
| ----------------- | ------------------------------------ | ---------- | ----------------------------------------------------------- |
| `name`            | `string`                             | Required   | ENS name whose resolver records are edited.                 |
| `initialRecords`  | `NameProfileFormValues`              | Required   | Complete record snapshot used as the diff baseline.         |
| `resolverAddress` | `Address`                            | Discovered | Optional resolver override.                                 |
| `presentation`    | `"dialog" \| "inline"`               | `"dialog"` | Selects the outer presentation.                             |
| `uploadImage`     | `NameProfileImageUpload`             | None       | Uploads an avatar or header and returns the record URI.     |
| `slots`           | `NameProfileEditorSlots`             | `{}`       | Replaces supported media, graphics, and the dialog trigger. |
| `messages`        | `Partial<NameProfileEditorMessages>` | Defaults   | Overrides user-facing labels and descriptions.              |
| `events`          | `NameProfileEditorEvents`            | `{}`       | Receives confirmed updates and errors.                      |
| `className`       | `string`                             | None       | Class name applied to the inline surface.                   |

When `resolverAddress` is omitted, the component discovers the current
resolver through Universal Resolver v2.

## Initial records

`initialRecords` must be the complete current snapshot. Omit unset keyed
records from their arrays and use an empty string for unset scalar records.

| Field         | Record shape                               | Value format                                              |
| ------------- | ------------------------------------------ | --------------------------------------------------------- |
| `text`        | `{ key: string; value: string }[]`         | Unique non-empty keys. Custom keys are supported.         |
| `addresses`   | `{ coinType: string; value: string }[]`    | Decimal ENSIP-9 coin type and its human-readable address. |
| `contenthash` | `string`                                   | Supported content URI, or `""`.                           |
| `abi`         | `{ contentType: string; value: string }[]` | Power-of-two content type and `0x`-prefixed ABI bytes.    |
| `data`        | `{ key: string; value: string }[]`         | Unique key and `0x`-prefixed bytes.                       |
| `interfaces`  | `{ interfaceId; implementer }[]`           | Four-byte EIP-165 ID and an EVM address.                  |
| `name`        | `string`                                   | Normalized ENS name, or `""`.                             |
| `pubkey`      | `{ x: string; y: string }`                 | Two 32-byte hex coordinates, or two empty strings.        |

Unknown text keys are rendered as custom key-value fields. Coin types not
listed as presets are rendered as custom address fields when
`@ensdomains/address-encoder` supports them. Unsupported coin types produce a
field error instead of being discarded.

Call `normalizeProfileRecords(records)` when the source is untrusted or loosely
typed:

```ts
const normalized = normalizeProfileRecords(records);

if (normalized.isErr()) {
  console.error(normalized.error);
} else {
  const initialRecords = normalized.value;
}
```

The normalizer returns a `neverthrow` result. It canonicalizes supported
addresses and content hashes, normalizes ENS names, removes empty keyed values,
sorts keyed records, and rejects duplicate keys.

Structured text records receive additional validation:

- `email` must contain a complete email address.
- `url` must use HTTP or HTTPS.
- `timezone` must be an IANA timezone.
- `avatar` and `header` accept HTTP, HTTPS, IPFS, IPNS, data, or `eip155` URIs.

## Permission behavior

The editor remains interactive without a connected wallet and when the
connected account lacks permissions. This lets users compose changes before
connecting or switching accounts.

The Next button is the permission boundary:

- `Connect wallet` when no account is connected.
- `Checking access` while resolver permissions are loading.
- `No update permission` when any pending change is unauthorized.
- `Next` when the draft is valid, changed, and authorized.

The component discovers the resolver, verifies `IPermissionedResolver`, and
reads Enhanced Access Control roles for the exact changed records. It supports
resolver owners, name-wide delegates, global key or coin-type delegates, and
name-specific key or coin-type delegates. NFT ownership alone is not treated
as resolver write permission.

Permissions and the current resolver are checked again before submission. The
exact `multicallWithNodeCheck` call is simulated from the connected account.
Account, network, resolver, wallet rejection, and confirmation failures are
reported through `events.onError`.

## Image uploads and media placeholders

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

`uploadImage` receives the selected file and the target `avatar` or `header`
record. It must return the URI stored on the resolver. Without `uploadImage`,
the media controls add or focus a normal URI text field instead of opening a
file picker.

Placeholder slots only control the empty media preview. They do not create
records or upload files.

## Slots

| Slot                      | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `trigger`                 | Dialog trigger. Ignored by inline mode.            |
| `avatarPlaceholder`       | Empty-avatar preview content.                      |
| `headerPlaceholder`       | Empty-header preview content.                      |
| `reviewGraphic`           | Graphic on the change review screen.               |
| `successGraphic`          | Graphic after the update confirms.                 |
| `transactionProgressIcon` | Icon animated while the transaction is confirming. |

An `undefined` slot uses the default. Passing `null` hides the slot content.

## Messages

| Key                        | Default                                        |
| -------------------------- | ---------------------------------------------- |
| `triggerLabel`             | `Edit profile`                                 |
| `dialogLabel`              | `Edit {name} profile`                          |
| `profileMediaLabel`        | `Profile media`                                |
| `addAvatarLabel`           | `Add profile avatar`                           |
| `editAvatarLabel`          | `Edit profile avatar`                          |
| `addHeaderLabel`           | `Add profile header`                           |
| `editHeaderLabel`          | `Edit profile header`                          |
| `searchLabel`              | `Search profile records`                       |
| `searchPlaceholder`        | `Search records`                               |
| `profileSectionsLabel`     | `Profile sections`                             |
| `noMatchingRecordsLabel`   | `No matching records`                          |
| `nextLabel`                | `Next`                                         |
| `connectWalletLabel`       | `Connect wallet`                               |
| `checkingAccessLabel`      | `Checking access`                              |
| `noPermissionLabel`        | `No update permission`                         |
| `backLabel`                | `Back to profile editor`                       |
| `reviewTitle`              | `Review changes`                               |
| `reviewDescription`        | `Review the records you are about to update.`  |
| `addedLabel`               | `Added`                                        |
| `changedLabel`             | `Changed`                                      |
| `removedLabel`             | `Removed`                                      |
| `updateLabel`              | `Update`                                       |
| `switchNetworkLabel`       | `Switch network`                               |
| `switchingNetworkLabel`    | `Switching network`                            |
| `preparingUpdateLabel`     | `Preparing update`                             |
| `confirmInWalletLabel`     | `Confirm in wallet`                            |
| `transactionProgressLabel` | `Transaction confirmation in progress`         |
| `explorerLinkLabel`        | `Check on Etherscan`                           |
| `successTitle`             | `Profile updated`                              |
| `successDescription`       | `Your ENS profile records are now up to date.` |
| `updatedRecordsLabel`      | `Updated records`                              |
| `doneLabel`                | `Done`                                         |

Only provide the keys you need to replace:

```tsx
<NameProfileEditor
  initialRecords={records}
  messages={{
    triggerLabel: "Manage profile",
    updateLabel: "Save records",
  }}
  name="example.eth"
/>
```

`dialogLabel` replaces every `{name}` token with the current ENS name. Labels
that are not visible are used as accessible names for the dialog, search,
media controls, navigation, and transaction progress.

## Callbacks

```tsx
<NameProfileEditor
  events={{
    onUpdate: ({ account, changes, receipt, resolverAddress, transactionHash, values }) => {},
    onError: ({ account, error, phase, resolverAddress, transactionHash }) => {},
  }}
  initialRecords={records}
  name="example.eth"
/>
```

`onUpdate` runs once after the resolver multicall confirms and includes the
canonical updated snapshot. Replace or invalidate the application cache from
this callback.

`onError` uses phase `resolver`, `permission`, or `update`. A transaction hash
is present when submission reached the network. Consumer callback failures do
not change an already-confirmed flow.
