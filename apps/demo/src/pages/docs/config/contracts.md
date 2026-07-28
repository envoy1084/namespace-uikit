---
title: Contracts
description: Configure contract addresses and ABIs for an ENS v2 deployment.
---

# Contracts

`EnsContracts` contains every contract used by package components, hooks, and
actions.

```ts
interface EnsContracts {
  readonly ethRegistrar: Contract<typeof ethRegistrarAbi>;
  readonly ethRegistry: Contract<typeof ethRegistryAbi>;
  readonly universalResolverV2: Contract<typeof universalResolverV2Abi>;
  readonly permissionedResolverImplementation: Contract<typeof permissionedResolverAbi>;
  readonly verifiableFactory: Contract<typeof verifiableFactoryAbi>;
  readonly l1ReverseRegistrar: Contract<typeof l1ReverseRegistrarAbi>;
  readonly l2ReverseRegistrar: Contract<typeof l2ReverseRegistrarAbi>;
  readonly paymentTokens: EnsPaymentTokens;
}
```

Each contract entry has `address` and `abi` properties. The exported ABIs are
JSON ABI arrays with literal types.

## Testnet addresses

| Contract                             | Sepolia address                              |
| ------------------------------------ | -------------------------------------------- |
| ETH Registrar                        | `0x8c2e866b439358c41ae05de9cbe8a00bfefaffca` |
| ENS Registry                         | `0xdedb92913a25abe1f7bcdd85d8a344a43b398b67` |
| Universal Resolver v2                | `0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe` |
| Permissioned Resolver implementation | `0xdce5205a553573ffd47629327dddf36186022ffa` |
| Verifiable Factory                   | `0xd2a632d8a8b67c2c4398c255cbd7af8dd7236198` |
| L1 Reverse Registrar                 | `0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6` |
| L2 Reverse Registrar                 | `0xEb8269Fb39290F31C4c29CEc548807cA2133AbB4` |

Import `testnetContracts` to inspect or reuse the built-in contract set.

```ts
import { testnetContracts } from "ens-components";
```
