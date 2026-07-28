import type { Chain } from "viem";

import { sepolia } from "viem/chains";

import { testnetContracts, type EnsContracts } from "#/data/addresses";

export type EnsNetwork = "mainnet" | "testnet";

interface EnsNetworkConfigurationShape {
  readonly chain: Chain;
  readonly contracts: EnsContracts;
  readonly indexerUrl: string;
  readonly network: EnsNetwork;
}

export const ensNetworkConfigurations = {
  testnet: {
    chain: sepolia,
    contracts: testnetContracts,
    indexerUrl: "https://graphql.ens.dev/graphql",
    network: "testnet",
  },
} as const satisfies Record<
  Exclude<EnsNetwork, "mainnet">,
  EnsNetworkConfigurationShape
>;

export type EnsNetworkConfiguration =
  (typeof ensNetworkConfigurations)[keyof typeof ensNetworkConfigurations];

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
