import type { Chain } from "viem";

import { sepolia } from "viem/chains";

import { testnetContracts, type EnsContracts } from "#/data/addresses";

export type EnsNetwork = "mainnet" | "testnet";

export interface EnsNetworkConfiguration {
  readonly chain: Chain;
  readonly contracts: EnsContracts;
  readonly network: EnsNetwork;
}

export const ensNetworkConfigurations = {
  testnet: {
    chain: sepolia,
    contracts: testnetContracts,
    network: "testnet",
  },
} as const satisfies Record<
  Exclude<EnsNetwork, "mainnet">,
  EnsNetworkConfiguration
>;

export function getEnsNetworkConfiguration(
  network: EnsNetwork,
): EnsNetworkConfiguration {
  if (network === "mainnet") {
    throw new Error(
      "ENS v2 mainnet is not supported yet. Use the testnet network.",
    );
  }

  return ensNetworkConfigurations.testnet;
}
