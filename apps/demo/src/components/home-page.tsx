"use client";

import { useLayoutEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
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
} from "./home";
import { AppNavbar } from "./navbar";

const ensConfig = createEnsConfig("testnet");
const lightColorScheme = { colorScheme: "light" } as const;

export function HomePage() {
  const [queryClient] = useState(() => new QueryClient());

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousColorScheme = root.style.colorScheme;
    const previousTheme = root.getAttribute("data-vocs-theme");

    const applyLightScheme = () => {
      if (root.style.colorScheme !== "light") {
        root.style.colorScheme = "light";
      }
      if (root.getAttribute("data-vocs-theme") !== "light") {
        root.setAttribute("data-vocs-theme", "light");
      }
    };

    applyLightScheme();

    const observer = new MutationObserver(applyLightScheme);
    observer.observe(root, {
      attributeFilter: ["data-vocs-theme", "style"],
      attributes: true,
    });

    return () => {
      observer.disconnect();
      root.style.colorScheme = previousColorScheme;
      if (previousTheme === null) {
        root.removeAttribute("data-vocs-theme");
      } else {
        root.setAttribute("data-vocs-theme", previousTheme);
      }
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
