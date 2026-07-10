# Namespace UI Kit

Namespace UI Kit is the Namespace design-system package built on [HeroUI v3](https://heroui.com/). It preserves HeroUI's accessible React component APIs while applying Namespace theme colors and providing shared hooks, utilities, and icons.

## Repository

This pnpm and Turborepo monorepo contains:

- [`packages/uikit`](./packages/uikit) — the publishable `@thenamespace/uikit` package.
- [`apps/storybook`](./apps/storybook) — the component catalogue and visual development environment.

See the [package README](./packages/uikit/README.md) for installation, imports, theming, component subpaths, and API usage.

## Development

Requirements:

- Node.js 24 or newer
- pnpm 11

Install dependencies:

```bash
pnpm install
```

Start Storybook:

```bash
pnpm dev
```

Run the complete validation suite:

```bash
pnpm check
```

Build all workspace projects:

```bash
pnpm build
```

## Package usage

Install the package:

```bash
pnpm add @thenamespace/uikit
```

Import Tailwind CSS followed by the Namespace stylesheet in the application's main CSS entry:

```css
@import "tailwindcss";
@import "@thenamespace/uikit/styles.css";
```

Import components from the root package or individual component subpaths:

```tsx
import { Button, Card } from "@thenamespace/uikit";
import { Input } from "@thenamespace/uikit/input";
```

Component behavior and composition follow the [HeroUI component documentation](https://heroui.com/en/docs/react/components).

## Theme development

Namespace theme variables live in [`packages/uikit/src/styles/globals.css`](./packages/uikit/src/styles/globals.css). After changing them, synchronize Storybook's generated theme data:

```bash
pnpm sync-theme
```

## Releases

User-facing package changes require a Changesets entry:

```bash
pnpm changeset
```

The release workflow versions and publishes `@thenamespace/uikit` to npm. The Storybook application is private and excluded from releases.

## License

Apache-2.0
