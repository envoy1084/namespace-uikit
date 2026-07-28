---
title: Custom Configuration
description: Configure ENS Components for a compatible ENS deployment.
---

# Custom Configuration

Pass a named preset or a complete `EnsConfig` to `createEnsConfig`.
Configuration objects are not merged with presets.

```ts
import { createEnsConfig, testnetContracts } from "ens-components";
import { sepolia } from "viem/chains";

const config = createEnsConfig({
  chain: sepolia,
  contracts: testnetContracts,
  indexerUrl: "https://graphql.ens.dev/graphql",
});
```

## Required contracts

A custom configuration must provide:

- ETH registrar
- ENS registry
- Universal Resolver v2
- Permissioned Resolver implementation
- Verifiable Factory
- L1 reverse registrar
- L2 reverse registrar
- at least one ERC-20 payment token

Each contract entry contains both `address` and `abi`.

## Chain alignment

The configured chain must also exist in the nearest Wagmi configuration.
Hooks select Wagmi clients by `EnsConfig.chain.id`.

## Compatibility

Custom contracts must implement the ABI and behavior expected by the package.
The configuration API does not adapt ENS v1 contracts or incompatible
registrar and resolver implementations.

See [Contracts](/docs/config/contracts) for the complete shape.
