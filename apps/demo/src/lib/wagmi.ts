import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error(
    "VITE_WALLETCONNECT_PROJECT_ID is required. Add it to apps/demo/.env.local or the deployment environment.",
  );
}

export const wagmiConfig = getDefaultConfig({
  appName: "ENS Components Demo",
  projectId: walletConnectProjectId,
  chains: [sepolia],
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
