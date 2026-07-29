---
title: Component Customization
description: Customize ENS Components presentation, copy, graphics, and lifecycle events.
---

# Component Customization

Flow components support dialog and inline presentation, replaceable visual
slots, message overrides, and lifecycle events.

## Presentation

`presentation="dialog"` renders a trigger and modal. `presentation="inline"`
renders the flow directly.

```tsx [inline-profile.tsx]
<NameProfileEditor name="example.eth" initialRecords={records} presentation="inline" />
```

## Slots

Slots replace graphics and dialog triggers. `undefined` uses the package
default. Where supported, `null` hides the slot.

```tsx [renewal-slots.tsx]
<NameRenewal
  slots={{
    trigger: <button>Extend name</button>,
    successGraphic: <BrandSuccess />,
  }}
/>
```

:::note
An omitted slot uses the package default. Where the component type permits it,
`null` hides that slot.
:::

## Messages

Messages override high-level labels and descriptions.

```tsx [registration-messages.tsx]
<NameRegistration
  messages={{
    doneLabel: "Continue",
    triggerLabel: "Claim a name",
  }}
/>
```

Protocol-critical warnings, transaction states, and validation errors are not
message overrides.

## Events

Events report confirmed lifecycle transitions and failures.

```tsx [renewal-events.tsx]
<NameRenewal
  events={{
    onRenew(event) {
      analytics.track("ens_name_renewed", event);
    },
  }}
/>
```

Events may return promises, but components do not await them.

Refer to each component page for its complete `slots`, `messages`, and `events`
types.
