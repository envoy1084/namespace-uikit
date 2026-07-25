import type { Chain } from "viem";

import { mainnet, sepolia } from "viem/chains";

import {
  mainnetContracts,
  testnetContracts,
  type EnsContracts,
} from "./addresses";

export type EnsNetwork = "mainnet" | "testnet";

export interface EnsNetworkConfiguration {
  readonly chain: Chain;
  readonly contracts: EnsContracts;
  readonly network: EnsNetwork;
}

export const ensNetworkConfigurations = {
  mainnet: {
    chain: mainnet,
    contracts: mainnetContracts,
    network: "mainnet",
  },
  testnet: {
    chain: sepolia,
    contracts: testnetContracts,
    network: "testnet",
  },
} as const satisfies Record<EnsNetwork, EnsNetworkConfiguration>;

export function getEnsNetworkConfiguration(
  network: EnsNetwork,
): EnsNetworkConfiguration {
  const configuration = (
    ensNetworkConfigurations as Readonly<
      Partial<Record<string, EnsNetworkConfiguration>>
    >
  )[network];

  if (configuration === undefined) {
    throw new Error(`Unsupported ENS network: ${String(network)}`);
  }

  return configuration;
}
