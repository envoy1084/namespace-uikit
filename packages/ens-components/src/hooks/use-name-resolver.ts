"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  executeContractRead,
  prepareNameResolverRead,
  type NameResolverResult,
  type PrepareNameResolverReadError,
} from "#/actions";
import { parseNameInput, type ParseNameInputError } from "#/lib";
import { useEnsConfig } from "#/providers";

export type NameResolverError =
  | "CONTRACT_READ_FAILED"
  | ParseNameInputError
  | PrepareNameResolverReadError;

export type NameResolverQueryKey = readonly ["ens", "name-resolver", string, Address, string];

export interface UseNameResolverParameters<selectData = NameResolverResult> {
  input: string | null | undefined;
  query?: Omit<
    UseQueryOptions<NameResolverResult, NameResolverError, selectData, NameResolverQueryKey>,
    "queryFn" | "queryKey"
  >;
  universalResolverAddress?: Address;
}

export function useNameResolver<selectData = NameResolverResult>(
  parameters: UseNameResolverParameters<selectData>,
) {
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const universalResolverAddress =
    parameters.universalResolverAddress ?? contracts.universalResolverV2.address;
  const parsed = parseNameInput(parameters.input);

  return useQuery<NameResolverResult, NameResolverError, selectData, NameResolverQueryKey>({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-resolver",
      network,
      universalResolverAddress,
      parsed.isOk() ? parsed.value.normalizedName : (parameters.input ?? ""),
    ],
    enabled: (parameters.query?.enabled ?? true) && publicClient !== undefined && parsed.isOk(),
    queryFn: async () => {
      if (publicClient === undefined) {
        return Promise.reject("CONTRACT_READ_FAILED" satisfies NameResolverError);
      }

      const prepared = prepareNameResolverRead({
        input: parameters.input,
        network,
        universalResolverAddress,
      });
      if (prepared.isErr()) throw prepared.error;

      const result = await executeContractRead(publicClient, prepared.value);
      if (result.isErr()) throw result.error;
      const [resolverAddress, node, offset] = result.value;

      return {
        name: prepared.value.metadata.name,
        node,
        offset,
        resolverAddress,
      };
    },
  });
}
