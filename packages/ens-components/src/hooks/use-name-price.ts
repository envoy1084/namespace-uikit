"use client";

import type { Address } from "viem";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useDebounceValue } from "usehooks-ts";
import { usePublicClient } from "wagmi";

import {
  getNamePrice,
  parseNameInput,
  type GetNamePriceError,
  type NamePrice,
  type ParseNameInputError,
} from "../actions";
import { useEnsConfig } from "../providers";

type NamePriceError = GetNamePriceError | ParseNameInputError;
type NamePriceQueryKey = readonly [
  "ens",
  "name-price",
  string,
  Address,
  Address,
  string,
  string,
];

export interface UseNamePriceParameters<selectData = NamePrice> {
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  query?: Omit<
    UseQueryOptions<NamePrice, NamePriceError, selectData, NamePriceQueryKey>,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

export function useNamePrice<selectData = NamePrice>(
  parameters: UseNamePriceParameters<selectData>,
) {
  const input = parameters.input ?? "";
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const [debouncedInput] = useDebounceValue(input, 300);
  const parsedInput = parseNameInput(debouncedInput);
  const isValidInput =
    parsedInput.isOk() &&
    parsedInput.value.nameLevel === 2 &&
    parsedInput.value.tld === "eth";
  const registrarAddress =
    parameters.registrarAddress ?? contracts.ethRegistrar.address;
  const paymentTokenAddress =
    parameters.paymentTokenAddress ?? contracts.mockUsdc.address;

  return useQuery<NamePrice, NamePriceError, selectData, NamePriceQueryKey>({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-price",
      network,
      registrarAddress,
      paymentTokenAddress,
      parameters.duration.toString(),
      parsedInput.isOk() ? parsedInput.value.normalizedName : debouncedInput,
    ],
    enabled:
      (parameters.query?.enabled ?? true) &&
      publicClient !== undefined &&
      isValidInput,
    queryFn: async () => {
      if (publicClient === undefined) {
        throw "CONTRACT_READ_FAILED" satisfies GetNamePriceError;
      }

      const result = await getNamePrice(publicClient, {
        duration: parameters.duration,
        input: debouncedInput,
        network,
        paymentTokenAddress,
        registrarAddress,
      });

      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
