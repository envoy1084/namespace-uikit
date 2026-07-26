"use client";

import type { Address } from "viem";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useDebounceValue } from "usehooks-ts";
import { usePublicClient } from "wagmi";

import {
  executeContractReads,
  type NamePrice,
  prepareNamePriceRead,
  type NamePriceReadError,
  type PrepareNamePriceReadError,
} from "#/actions";
import {
  parseNameInput,
  type ParseNameInputError,
} from "#/lib/parse-name-input";
import { useEnsConfig } from "#/providers";

type NamePriceError =
  | "CONTRACT_READ_FAILED"
  | NamePriceReadError
  | ParseNameInputError
  | PrepareNamePriceReadError;
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
    parameters.paymentTokenAddress ?? contracts.paymentTokens[0].address;

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
        throw "CONTRACT_READ_FAILED" satisfies NamePriceError;
      }

      const prepared = prepareNamePriceRead({
        duration: parameters.duration,
        input: debouncedInput,
        network,
        paymentTokenAddress,
        registrarAddress,
      });
      if (prepared.isErr()) throw prepared.error;

      const result = await executeContractReads(publicClient, prepared.value);
      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
