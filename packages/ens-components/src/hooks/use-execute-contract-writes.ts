"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { usePublicClient, useWalletClient } from "wagmi";

import type {
  ExecuteContractWritesParameters,
  ExecuteContractWritesResult,
  ExecuteContractWritesError,
} from "#/actions";
import { executeContractWrites } from "#/actions";
import { asWagmiChainId } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export type ExecuteContractWritesMutationError =
  | "PUBLIC_CLIENT_UNAVAILABLE"
  | "WALLET_CLIENT_UNAVAILABLE"
  | ExecuteContractWritesError;

export type ExecuteContractWritesVariables = Omit<ExecuteContractWritesParameters, "chain">;

export type ExecuteContractWritesMutation = (
  variables: ExecuteContractWritesVariables,
) => Promise<ExecuteContractWritesResult>;

export interface UseExecuteContractWritesParameters {
  mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      ExecuteContractWritesMutationError,
      ExecuteContractWritesVariables
    >,
    "mutationFn" | "mutationKey"
  >;
}

/**
 * Executes arbitrary prepared ENS writes using the chain configured by
 * `EnsProvider`.
 */
export function useExecuteContractWrites(parameters: UseExecuteContractWritesParameters = {}) {
  const { chain } = useEnsConfig();
  const wagmiChainId = asWagmiChainId(chain.id);
  const publicClient = usePublicClient({ chainId: wagmiChainId });
  const { data: walletClient } = useWalletClient({ chainId: wagmiChainId });

  return useMutation<
    ExecuteContractWritesResult,
    ExecuteContractWritesMutationError,
    ExecuteContractWritesVariables
  >({
    ...parameters.mutation,
    mutationKey: ["ens", "execute-contract-writes", chain.id],
    mutationFn: async (variables) => {
      if (publicClient === undefined) return Promise.reject("PUBLIC_CLIENT_UNAVAILABLE");
      if (walletClient === undefined) return Promise.reject("WALLET_CLIENT_UNAVAILABLE");

      const result = await executeContractWrites(walletClient, publicClient, {
        ...variables,
        chain,
      });
      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
