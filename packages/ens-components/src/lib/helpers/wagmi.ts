import type { ResolvedRegister } from "wagmi";

type WagmiChainId = ResolvedRegister["config"]["chains"][number]["id"];

/**
 * Bridges a runtime ENS config chain ID into wagmi's application-specific
 * configured-chain union. The consumer remains responsible for registering
 * the same chain in its wagmi config.
 */
export function asWagmiChainId(chainId: number): WagmiChainId {
  return chainId as WagmiChainId;
}
