"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createEnsConfig, EnsProvider } from "ens-components";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "../lib/wagmi";
import {
  HomeFooter,
  HomeHero,
  ProfileEditorShowcase,
  RegistrationShowcase,
  RenewalShowcase,
  ToolkitOverview,
  TransactionProgressShowcase,
} from "./home";
import { AppNavbar } from "./navbar";

const ensConfig = createEnsConfig("testnet");

export function HomePage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <EnsProvider config={ensConfig}>
          <div className="min-h-screen overflow-hidden bg-[#f4f4f4] font-sans text-[#1f1f1f]">
            <AppNavbar />
            <main id="content">
              <HomeHero />
              <ToolkitOverview />
              <RegistrationShowcase />
              <RenewalShowcase />
              <ProfileEditorShowcase />
              <TransactionProgressShowcase />
              <HomeFooter />
            </main>
          </div>
        </EnsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
