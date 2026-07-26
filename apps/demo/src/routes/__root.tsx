import { Outlet, createRootRoute } from "@tanstack/react-router";

// oxlint-disable-next-line import/no-unassigned-import
import "../styles.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { EnsProvider } from "ens-components";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "@/lib/wagmi";

export const Route = createRootRoute({
  component: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <EnsProvider config={{ network: "testnet" }}>
          <RainbowKitProvider>
            <Outlet />
          </RainbowKitProvider>
        </EnsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
