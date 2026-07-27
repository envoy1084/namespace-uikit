"use client";

import type { Address } from "viem";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useDebounceValue } from "usehooks-ts";
import { usePublicClient } from "wagmi";

import {
  executeContractReads,
  type NameRenewalPrice,
  type NameRenewalPriceReadError,
  prepareNameRenewalPriceRead,
  type PrepareNameRenewalPriceReadError,
} from "#/actions";
import {
  parseNameInput,
  type ParseNameInputError,
} from "#/lib/parse-name-input";
import { useEnsConfig } from "#/providers";

type NameRenewalPriceError =
  | "CONTRACT_READ_FAILED"
  | NameRenewalPriceReadError
  | ParseNameInputError
  | PrepareNameRenewalPriceReadError;

type NameRenewalPriceQueryKey = readonly [
  "ens",
  "name-renewal-price",
  string,
  Address,
  Address,
  Address,
  string,
  string,
];

export interface UseNameRenewalPriceParameters<selectData = NameRenewalPrice> {
  duration: bigint;
  ethRegistryAddress?: Address;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  query?: Omit<
    UseQueryOptions<
      NameRenewalPrice,
      NameRenewalPriceError,
      selectData,
      NameRenewalPriceQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

export function useNameRenewalPrice<selectData = NameRenewalPrice>(
  parameters: UseNameRenewalPriceParameters<selectData>,
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
  const ethRegistryAddress =
    parameters.ethRegistryAddress ?? contracts.ethRegistry.address;
  const paymentTokenAddress =
    parameters.paymentTokenAddress ?? contracts.paymentTokens[0].address;

  return useQuery<
    NameRenewalPrice,
    NameRenewalPriceError,
    selectData,
    NameRenewalPriceQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-renewal-price",
      network,
      registrarAddress,
      ethRegistryAddress,
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
        throw "CONTRACT_READ_FAILED" satisfies NameRenewalPriceError;
      }

      const prepared = prepareNameRenewalPriceRead({
        duration: parameters.duration,
        ethRegistryAddress,
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
