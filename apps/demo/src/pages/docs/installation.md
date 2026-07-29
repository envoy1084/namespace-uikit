---
title: Installation
description: Install ENS Components and its required peer dependencies.
---

# Installation

Install ENS Components and its peer dependencies.

:::code-group

```bash
npm install ens-components @tanstack/react-query@5.101.2 viem@^2.55.0 wagmi@^3.7.1
```

```bash [pnpm]
pnpm add ens-components @tanstack/react-query@5.101.2 viem@^2.55.0 wagmi@^3.7.1
```

```bash [yarn]
yarn add ens-components @tanstack/react-query@5.101.2 viem@^2.55.0 wagmi@^3.7.1
```

```bash [bun]
bun add ens-components @tanstack/react-query@5.101.2 viem@^2.55.0 wagmi@^3.7.1
```

:::

Import the stylesheet once from your application entry point.

```tsx [main.tsx]
import "ens-components/styles.css";
```

ENS Components ships compiled styles. Tailwind CSS is not required in the
consumer application.

## Peer dependencies

| Package              | Supported version |
| -------------------- | ----------------- |
| React                | `>=19.2.7 <20`    |
| React DOM            | `>=19.2.7 <20`    |
| TanStack React Query | `5.101.2`         |
| Viem                 | `>=2.55.0 <3`     |
| Wagmi                | `>=3.7.1 <4`      |

## Entry points

| Import path                 | Contents                                       |
| --------------------------- | ---------------------------------------------- |
| `ens-components`            | Components, configuration, providers, and data |
| `ens-components/hooks`      | React query and mutation hooks                 |
| `ens-components/actions`    | Prepared reads, prepared writes, and executors |
| `ens-components/icons`      | ENS record and payment-token icons             |
| `ens-components/styles.css` | Compiled package styles                        |

:::tip
Import from the narrow `hooks`, `actions`, and `icons` entry points when using
those APIs. This keeps application imports explicit and tree-shakeable.
:::

Continue to [Getting Started](/docs/getting-started).
