"use client";

import { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { EnsProvider } from "ens-components";
import { WagmiProvider } from "wagmi";

import {
  HomeFooter,
  HomeHero,
  ProfileEditorShowcase,
  RegistrationShowcase,
  RenewalShowcase,
  ToolkitOverview,
} from "@/components/home";
import { AppNavbar } from "@/components/navbar";
import { wagmiConfig } from "@/lib/wagmi";

const ensConfig = { network: "testnet" } as const;
const lightColorScheme = { colorScheme: "light" } as const;

export function HomePage() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const root = document.documentElement;
    const previousColorScheme = root.style.colorScheme;

    root.style.colorScheme = "light";

    return () => {
      root.style.colorScheme = previousColorScheme;
    };
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <EnsProvider config={ensConfig}>
          <RainbowKitProvider>
            <div
              className="min-h-screen overflow-hidden bg-[#f4f4f4] font-sans text-[#1f1f1f]"
              style={lightColorScheme}
            >
              <AppNavbar />
              <main id="content">
                <HomeHero />
                <ToolkitOverview />
                <RegistrationShowcase />
                <RenewalShowcase />
                <ProfileEditorShowcase />
                <HomeFooter />
              </main>
            </div>
          </RainbowKitProvider>
        </EnsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
