"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { Address } from "viem";
import { useWalletClient } from "wagmi";

import { supportsAtomicBatchCalls, type SupportsAtomicBatchCallsError } from "#/actions";
import { useEnsConfig } from "#/providers";

export interface WalletCapabilities {
  readonly atomicBatchCalls: boolean;
  readonly chainId: number;
}

export type WalletCapabilitiesError = SupportsAtomicBatchCallsError;

export type WalletCapabilitiesQueryKey = readonly [
  "ens",
  "wallet-capabilities",
  string,
  number,
  Address | null,
];

export interface UseWalletCapabilitiesParameters<selectData = WalletCapabilities> {
  account: Address | null | undefined;
  query?: Omit<
    UseQueryOptions<
      WalletCapabilities,
      WalletCapabilitiesError,
      selectData,
      WalletCapabilitiesQueryKey
    >,
    "queryFn" | "queryKey"
  >;
}

export function useWalletCapabilities<selectData = WalletCapabilities>(
  parameters: UseWalletCapabilitiesParameters<selectData>,
) {
  const { chain, network } = useEnsConfig();
  const account = parameters.account ?? null;
  const { data: walletClient } = useWalletClient({ chainId: chain.id });

  return useQuery<
    WalletCapabilities,
    WalletCapabilitiesError,
    selectData,
    WalletCapabilitiesQueryKey
  >({
    ...parameters.query,
    queryKey: ["ens", "wallet-capabilities", network, chain.id, account],
    enabled: (parameters.query?.enabled ?? true) && walletClient !== undefined && account !== null,
    queryFn: async () => {
      if (walletClient === undefined || account === null) {
        return Promise.reject("CAPABILITIES_REQUEST_FAILED" satisfies WalletCapabilitiesError);
      }

      const result = await supportsAtomicBatchCalls(walletClient, {
        account,
        chainId: chain.id,
      });
      if (result.isErr()) throw result.error;

      return {
        atomicBatchCalls: result.value,
        chainId: chain.id,
      };
    },
  });
}
