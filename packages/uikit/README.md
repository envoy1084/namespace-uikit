# Namespace UI Kit

Namespace UI Kit is the Namespace theme and package surface built on top of [HeroUI v3](https://www.heroui.com/). It preserves HeroUI's component APIs while providing Namespace color tokens, shared icons, hooks, utilities, and component subpath exports.

## Requirements

- React 19
- React DOM 19
- Tailwind CSS 4

## Installation

```bash
pnpm add @thenamespace/uikit
```

The package includes its HeroUI runtime dependencies. React, React DOM, and Tailwind CSS remain peer dependencies so an application uses a single compatible copy.

## Styles

Import Tailwind first, followed by the UI kit, in the application's main CSS file:

```css
@import "tailwindcss";
@import "@thenamespace/uikit/styles.css";
```

The `@thenamespace/uikit/styles` alias is also supported.

Import the stylesheet once at the application root. JavaScript component imports do not automatically inject CSS. The stylesheet contains HeroUI's layered base and component styles followed by Namespace theme variables. It does not set application layout or body styles.

The theme supports HeroUI's standard selectors:

```html
<!-- Choose one theme selector on the document root. -->
<html class="dark">
  …
</html>
<!-- or -->
<html data-theme="dark">
  …
</html>
```

Namespace variables are declared in the CSS `theme` layer, so applications can override them after the import:

```css
@import "tailwindcss";
@import "@thenamespace/uikit/styles.css";

@layer theme {
  :root {
    --accent: oklch(55% 0.2 260);
  }
}
```

## Components

Use the root package for normal application imports:

```tsx
import { Button, Card, Input } from "@thenamespace/uikit";

export function Example() {
  return (
    <Card>
      <Input aria-label="Name" placeholder="Name" />
      <Button>Continue</Button>
    </Card>
  );
}
```

Every HeroUI component also has a tree-shakeable subpath:

```tsx
import { Button } from "@thenamespace/uikit/button";
import { Card } from "@thenamespace/uikit/card";
```

Namespace components currently pass through HeroUI's API. Refer to the [HeroUI component documentation](https://www.heroui.com/docs/react/components) for component props, composition, accessibility, and examples.

## Hooks and utilities

```ts
import { useTheme } from "@thenamespace/uikit/hooks";
import { cn, tv } from "@thenamespace/uikit/utils";
```

These paths expose the hooks and utilities that HeroUI makes public from its root package. They do not rely on private HeroUI source paths.

## Icons

The icons entry exposes Hugeicons together with HeroUI's shared interface icons:

```tsx
import { Icon, IconSearch, CloseIcon } from "@thenamespace/uikit/icons";
```

For the three overlapping names `CircleDashedIcon`, `DangerIcon`, and `ExternalLinkIcon`, the HeroUI component icons take precedence. Hugeicons data remains available through its other named exports.

## HeroUI references

- [HeroUI quick start](https://www.heroui.com/docs/react/getting-started/quick-start)
- [HeroUI components](https://www.heroui.com/docs/react/components)
- [HeroUI theming](https://www.heroui.com/docs/react/getting-started/theming)
- [HeroUI styling](https://www.heroui.com/docs/handbook/styling)
- [HeroUI composition](https://www.heroui.com/docs/handbook/composition)

Namespace UI Kit targets HeroUI v3. Component source is organized by domain under
`src/components` (`ai`, `buttons`, `charts`, `collections`, `colors`,
`data-display`, `date-and-time`, `feedback`, `forms`, `layout`, `navigation`,
`overlays`, `typography`, and `utilities`). Each domain re-exports its components
and component-owned helper hooks through its `index.ts`.

Public component imports intentionally remain one level deep regardless of their
source group. For example, `src/components/date-and-time/agenda.tsx` is published
as `@thenamespace/uikit/agenda`, not `@thenamespace/uikit/date-and-time/agenda`.
When adding a component, place it in the appropriate domain and add its flat
source-condition mapping to `package.json`; the build discovers grouped component
entries automatically.
