---
title: Installation
description: Install ENS Components and its required peer dependencies.
---

# Installation

Install ENS Components with Wagmi, Viem, and TanStack Query.

```bash
npm install ens-components @tanstack/react-query@5.101.2 viem@^2.55.0 wagmi@^3.7.1
```

Import the package stylesheet once from the application root.

```tsx
import "ens-components/styles.css";
```

## Requirements

| Package              | Supported version |
| -------------------- | ----------------- |
| React                | `>=19.2.7 <20`    |
| React DOM            | `>=19.2.7 <20`    |
| TanStack React Query | `5.101.2`         |
| Viem                 | `>=2.55.0 <3`     |
| Wagmi                | `>=3.7.1 <4`      |

No Tailwind CSS configuration is required. ENS Components ships compiled
component styles and imports the required UI kit styles.

## Package entry points

| Import path                 | Contents                                       |
| --------------------------- | ---------------------------------------------- |
| `ens-components`            | Components, configuration, providers, and data |
| `ens-components/hooks`      | React query and mutation hooks                 |
| `ens-components/actions`    | Prepared reads, prepared writes, and executors |
| `ens-components/icons`      | ENS record and payment-token icons             |
| `ens-components/styles.css` | Compiled package styles                        |

Continue to [Getting Started](/docs/getting-started).
