"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  type NameResolverResult,
  readNameResolver,
  type ReadNameResolverErrorType,
} from "#/actions";
import { parseNameInput } from "#/lib";
import { asWagmiChainId } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export type NameResolverError = ReadNameResolverErrorType;

export type NameResolverQueryKey = readonly ["ens", "name-resolver", number, Address, string];

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
  const { chain, contracts } = useEnsConfig();
  const publicClient = usePublicClient({
    chainId: asWagmiChainId(chain.id),
  });
  const universalResolverAddress =
    parameters.universalResolverAddress ?? contracts.universalResolverV2.address;
  const parsed = parseNameInput(parameters.input);

  return useQuery<NameResolverResult, NameResolverError, selectData, NameResolverQueryKey>({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-resolver",
      chain.id,
      universalResolverAddress,
      parsed.isOk() ? parsed.value.normalizedName : (parameters.input ?? ""),
    ],
    enabled: (parameters.query?.enabled ?? true) && publicClient !== undefined && parsed.isOk(),
    queryFn: async () => {
      if (publicClient === undefined) {
        return Promise.reject("CONTRACT_READ_FAILED" satisfies NameResolverError);
      }

      const result = await readNameResolver(publicClient, {
        input: parameters.input,
        universalResolverAddress,
      });
      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
