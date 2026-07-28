"use client";

import type {
  ExecuteContractWritesProps,
  ExecuteContractWritesResult,
  ExecuteContractWritesError,
} from "#/actions";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { usePublicClient, useWalletClient } from "wagmi";

import { executeContractWrites } from "#/actions";
import { useEnsConfig } from "#/providers";

export type ExecuteContractWritesMutationError =
  | "PUBLIC_CLIENT_UNAVAILABLE"
  | "WALLET_CLIENT_UNAVAILABLE"
  | ExecuteContractWritesError;

export type ExecuteContractWritesVariables = Omit<
  ExecuteContractWritesProps,
  "chain"
>;

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
export function useExecuteContractWrites(
  parameters: UseExecuteContractWritesParameters = {},
) {
  const { chain, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });

  return useMutation<
    ExecuteContractWritesResult,
    ExecuteContractWritesMutationError,
    ExecuteContractWritesVariables
  >({
    ...parameters.mutation,
    mutationKey: ["ens", "execute-contract-writes", network, chain.id],
    mutationFn: async (variables) => {
      if (publicClient === undefined) throw "PUBLIC_CLIENT_UNAVAILABLE";
      if (walletClient === undefined) throw "WALLET_CLIENT_UNAVAILABLE";

      const result = await executeContractWrites(walletClient, publicClient, {
        ...variables,
        chain,
      });
      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
