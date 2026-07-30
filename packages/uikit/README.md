# Namespace UI Kit

Namespace UI Kit is the Namespace theme and package surface built on top of [HeroUI v3](https://www.heroui.com/). It preserves HeroUI's component APIs while providing Namespace color tokens, shared icons, hooks, utilities, and component subpath exports.

## Requirements

- React and React DOM 19
- Tailwind CSS 4
- HeroUI 3.2.2
- React Aria Components 1.19.0

## Installation

```bash
pnpm add @thenamespace/uikit
```

HeroUI and the React Aria foundation are exact peer dependencies. Current package managers install
them automatically; keeping them as peers ensures the application and UI kit share one set of
contexts and types. React 19 and Tailwind CSS 4 use compatible major-version peer ranges.

If an existing application reports a peer conflict, remove direct React Aria version overrides and
regenerate its lockfile so the versions required by the UI kit can resolve together.

## Styles

Import Tailwind first, followed by the UI kit, in the application's main CSS file:

```css
@import "tailwindcss";
@import "@thenamespace/uikit/styles.css";
```

The `@thenamespace/uikit/styles` alias is also supported.

Import the stylesheet once at the application root. JavaScript component imports do not automatically inject CSS. The stylesheet contains HeroUI's layered base and component styles followed by Namespace theme variables. It does not set application layout or body styles.

The theme uses `"Satoshi"` as its preferred sans-serif font but does not load fonts or make external
network requests. Applications can load Satoshi themselves or override `--font-sans`.

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

Namespace UI Kit targets HeroUI v3. All component source files live directly in
`src/components`, and `src/components/index.ts` exposes the root barrel.

Public component imports are one level deep. For example,
`src/components/agenda.tsx` is published as `@thenamespace/uikit/agenda`.
When adding a component, place its TSX file directly in `src/components` and
export it from `src/components/index.ts`. Edit `package.template.json` for package
metadata and fixed exports, then run `pnpm generate:package` from this package (or
simply run the build) to construct `package.json`. A source-aware wildcard maps
every public component subpath to its flat source and distribution entry, keeping
the published manifest compact. The current generated version is preserved so
Changesets version bumps remain intact during release builds.
