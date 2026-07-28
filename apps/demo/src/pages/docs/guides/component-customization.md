---
title: Component Customization
description: Customize ENS Components presentation, copy, graphics, and lifecycle events.
---

# Component Customization

Flow components support two presentation modes and three customization
surfaces.

## Presentation

`presentation="dialog"` renders a trigger and modal. `presentation="inline"`
renders the flow directly.

```tsx
<NameProfileEditor name="example.eth" initialRecords={records} presentation="inline" />
```

## Slots

Slots replace graphics and dialog triggers. `undefined` uses the package
default. Where supported, `null` hides the slot.

```tsx
<NameRenewal
  slots={{
    trigger: <button>Extend name</button>,
    successGraphic: <BrandSuccess />,
  }}
/>
```

## Messages

Messages override high-level labels and descriptions.

```tsx
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

```tsx
<NameRenewal
  events={{
    onRenew(event) {
      analytics.track("ens_name_renewed", event);
    },
  }}
/>
```

Events may return promises, but components do not await them.
