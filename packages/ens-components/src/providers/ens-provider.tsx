"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { EnsConfig } from "#/data";

export interface EnsProviderProps {
  children: ReactNode;
  config: Readonly<EnsConfig>;
}

const EnsConfigContext = createContext<EnsConfig | null>(null);

export function EnsProvider({ children, config }: EnsProviderProps) {
  return <EnsConfigContext.Provider value={config}>{children}</EnsConfigContext.Provider>;
}

export function useEnsConfig(): EnsConfig {
  const value = useContext(EnsConfigContext);

  if (value === null) {
    throw new Error("useEnsConfig must be used within an EnsProvider.");
  }

  return value;
}
