---
title: createEnsConfig
description: Create the chain, contract, indexer, and payment-token configuration used by ENS Components.
---

# createEnsConfig

Creates the configuration consumed by `EnsProvider`.

## Import

```ts [ens.ts]
import { createEnsConfig } from "ens-components";
```

## Usage

```ts
const ensConfig = createEnsConfig("testnet");
```

Pass the result to [`EnsProvider`](/docs/config/ens-provider).

## Parameters

### preset

`"testnet" | "mainnet"`

`"testnet"` selects the ENS v2 Sepolia deployment. `"mainnet"` currently
throws because ENS v2 mainnet is not supported.

### config

`EnsConfig`

```ts [types.ts]
interface EnsConfig {
  readonly chain: Chain;
  readonly contracts: EnsContracts;
  readonly indexerUrl: string;
}
```

A raw configuration is returned unchanged. It is not merged with a preset.

## Return Type

`EnsConfig`

## Error

`createEnsConfig("mainnet")` throws until an ENS v2 mainnet deployment is
available. Invalid raw configuration values fail with a configuration error.

:::tip
Use the `testnet` preset unless you are integrating another compatible ENS v2
deployment.
:::
