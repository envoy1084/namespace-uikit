import type { Chain } from "viem";
import { sepolia } from "viem/chains";

import { testnetContracts, type EnsContracts } from "#/data/addresses";

export type EnsConfigPreset = "mainnet" | "testnet";

export interface EnsConfig {
  readonly chain: Chain;
  readonly contracts: EnsContracts;
  readonly indexerUrl: string;
}

export const ensConfigPresets = {
  testnet: {
    chain: sepolia,
    contracts: testnetContracts,
    indexerUrl: "https://graphql.ens.dev/graphql",
  },
} as const satisfies Record<Exclude<EnsConfigPreset, "mainnet">, EnsConfig>;

export function createEnsConfig(preset: EnsConfigPreset): EnsConfig;
export function createEnsConfig(config: EnsConfig): EnsConfig;
export function createEnsConfig(input: EnsConfigPreset | EnsConfig): EnsConfig {
  if (typeof input !== "string") return input;

  if (input === "mainnet") {
    throw new Error("ENS v2 mainnet is not supported yet. Use the testnet preset.");
  }

  return ensConfigPresets.testnet;
}
