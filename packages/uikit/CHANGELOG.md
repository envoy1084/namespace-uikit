# @thenamespace/uikit

## 0.3.0

### Minor Changes

- [`f6de9a6`](https://github.com/thenamespace/uikit/commit/f6de9a62b9d777e68d54d80b2532bd91e76fcc2a) Thanks [@envoy1084](https://github.com/envoy1084)! - Upgrade the HeroUI-backed and custom component suite, standardize project icons on Huge Icons, and
  fix component behavior and styling across data grids, feedback, navigation, AI, and application
  layout components. Flatten component sources while preserving the existing one-level package
  subpath imports through a compact wildcard export.

### Patch Changes

- [`98b7690`](https://github.com/thenamespace/uikit/commit/98b76907c4b0cda45ebfcc63bfb13e608390c219) Thanks [@envoy1084](https://github.com/envoy1084)! - Upgrade HeroUI to 3.2.2 and align the React Aria dependency family with React Aria Components 1.19.

- [`cf0b4eb`](https://github.com/thenamespace/uikit/commit/cf0b4ebe8e45441b6e57ae2d971d2594fd628304) Thanks [@envoy1084](https://github.com/envoy1084)! - Align HeroUI and React Aria foundation packages as exact peers, broaden the supported React 19 and
  Tailwind CSS 4 ranges, and remove the stylesheet's external font request.

## 0.2.1

### Patch Changes

- [`dc131ee`](https://github.com/thenamespace/uikit/commit/dc131eed5e7dd594b344eaaefd072709f204a64e) Thanks [@envoy1084](https://github.com/envoy1084)! - Standardize icon usage on the native Hugeicons API exported from
  `@thenamespace/uikit/icons`. Documentation, demos, and Storybook now render
  icon data with `HugeiconsIcon`, and no longer depend on Gravity UI icons.

## 0.2.0

### Minor Changes

- [`3e6d445`](https://github.com/thenamespace/uikit/commit/3e6d445c26dd478fd0d13d316b56f58a4591830e) Thanks [@envoy1084](https://github.com/envoy1084)! - Expand Namespace UIKit into a complete, publishable component library:

  - Add 149 generated one-level component entry points spanning AI, charts, collections, colors, data display, date and time, feedback, forms, layout, navigation, overlays, and typography, alongside dedicated hooks, icons, and utilities exports.
  - Add advanced components including Data Grid, Agenda, Kanban, Rich Text Editor, App Layout, Sidebar, Sheet, Map, charts, and composable AI/chat primitives while reusing UIKit and HeroUI foundations.
  - Add package-owned component styles, documented class-name hooks, and interaction/accessibility parity across component states and compositions.
  - Use Satoshi as the default UIKit font and load the supported 400–900 weights from Fontshare.
  - Add Code Block syntax highlighting, pre-highlighted HTML support, copy actions, and optional line numbers.
  - Make Data Grid column schemas, row identities, sorting, pagination, selection, and visibility controls update reliably at runtime.
  - Generate and validate the package manifest and export map so every component remains available from both the root package and its one-level import path.

## 0.1.0

### Minor Changes

- [`929e46d`](https://github.com/thenamespace/uikit/commit/929e46d005e7a10813c4698137bead84cbf39c06) Thanks [@envoy1084](https://github.com/envoy1084)! - Publish the Namespace-themed HeroUI v3 component surface with component subpath exports, hooks, utilities, icons, and layered theme styles.
