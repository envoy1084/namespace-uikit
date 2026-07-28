"use client";

import type { Result } from "neverthrow";

import type {
  ExecuteContractWritesResult,
  ExecuteContractWritesError,
  PreparedContractWrite,
} from "#/actions";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { usePublicClient, useWalletClient } from "wagmi";

import { executeContractWrites } from "#/actions";
import { useEnsConfig } from "#/providers";

export interface PreparedWriteExecutionOptions {
  readonly confirmation?: "confirmed" | "submitted";
  readonly onProgress?: Parameters<
    typeof executeContractWrites
  >[2]["onProgress"];
  readonly strategy?: "atomic" | "auto" | "sequential" | "single";
  readonly timeout?: number;
}

export interface PreparedWriteVariables {
  readonly execution?: PreparedWriteExecutionOptions;
}

export type PreparedWriteMutationError<prepareError> =
  | "PUBLIC_CLIENT_UNAVAILABLE"
  | "WALLET_CLIENT_UNAVAILABLE"
  | ExecuteContractWritesError
  | prepareError;

type AwaitableResult<value, error> =
  | PromiseLike<Result<value, error>>
  | Result<value, error>;

interface UsePreparedContractWriteParameters<
  variables extends PreparedWriteVariables,
  prepared extends PreparedContractWrite,
  prepareError,
> {
  readonly mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      PreparedWriteMutationError<prepareError>,
      variables
    >,
    "mutationFn" | "mutationKey"
  >;
  readonly mutationKey: readonly unknown[];
  readonly prepare: (
    variables: variables,
    publicClient: NonNullable<ReturnType<typeof usePublicClient>>,
  ) => AwaitableResult<prepared, prepareError>;
}

export function usePreparedContractWrite<
  variables extends PreparedWriteVariables,
  prepared extends PreparedContractWrite,
  prepareError,
>(
  parameters: UsePreparedContractWriteParameters<
    variables,
    prepared,
    prepareError
  >,
) {
  const { chain, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: walletClient } = useWalletClient({ chainId: chain.id });

  return useMutation<
    ExecuteContractWritesResult,
    PreparedWriteMutationError<prepareError>,
    variables
  >({
    ...parameters.mutation,
    mutationKey: ["ens", ...parameters.mutationKey, network, chain.id],
    mutationFn: async (variables) => {
      if (publicClient === undefined) throw "PUBLIC_CLIENT_UNAVAILABLE";
      if (walletClient === undefined) throw "WALLET_CLIENT_UNAVAILABLE";

      const prepared = await parameters.prepare(variables, publicClient);
      if (prepared.isErr()) throw prepared.error;
      const execution = variables.execution;
      const result = await executeContractWrites(walletClient, publicClient, {
        calls: [prepared.value],
        chain,
        confirmation: execution?.confirmation ?? "confirmed",
        ...(execution?.onProgress === undefined
          ? {}
          : { onProgress: execution.onProgress }),
        strategy: execution?.strategy ?? "single",
        ...(execution?.timeout === undefined
          ? {}
          : { timeout: execution.timeout }),
      });
      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
