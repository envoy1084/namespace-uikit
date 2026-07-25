"use client";

import { createContext, useContext, type ReactNode } from "react";

import {
  getEnsNetworkConfiguration,
  type EnsNetwork,
  type EnsNetworkConfiguration,
} from "../data";

export type { EnsNetwork, EnsNetworkConfiguration } from "../data";

export interface EnsConfig {
  network: EnsNetwork;
}

export interface EnsProviderProps {
  children: ReactNode;
  config: Readonly<EnsConfig>;
}

const EnsConfigContext = createContext<EnsNetworkConfiguration | null>(null);

export function EnsProvider({ children, config }: EnsProviderProps) {
  const value = getEnsNetworkConfiguration(config.network);

  return (
    <EnsConfigContext.Provider value={value}>
      {children}
    </EnsConfigContext.Provider>
  );
}

export function useEnsConfig(): EnsNetworkConfiguration {
  const value = useContext(EnsConfigContext);

  if (value === null) {
    throw new Error("useEnsConfig must be used within an EnsProvider.");
  }

  return value;
}
