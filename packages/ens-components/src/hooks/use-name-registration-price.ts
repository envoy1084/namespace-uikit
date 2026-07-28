"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useDebounceValue } from "usehooks-ts";
import type { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  executeContractReads,
  type NameRegistrationPrice,
  prepareNameRegistrationPriceRead,
  type NameRegistrationPriceReadError,
  type PrepareNameRegistrationPriceReadError,
} from "#/actions";
import { parseNameInput, type ParseNameInputError } from "#/lib/parse-name-input";
import { useEnsConfig } from "#/providers";

type NameRegistrationPriceError =
  | "CONTRACT_READ_FAILED"
  | NameRegistrationPriceReadError
  | ParseNameInputError
  | PrepareNameRegistrationPriceReadError;
type NameRegistrationPriceQueryKey = readonly [
  "ens",
  "name-registration-price",
  string,
  Address,
  Address,
  string,
  string,
];

export interface UseNameRegistrationPriceParameters<selectData = NameRegistrationPrice> {
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  query?: Omit<
    UseQueryOptions<
      NameRegistrationPrice,
      NameRegistrationPriceError,
      selectData,
      NameRegistrationPriceQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

export function useNameRegistrationPrice<selectData = NameRegistrationPrice>(
  parameters: UseNameRegistrationPriceParameters<selectData>,
) {
  const input = parameters.input ?? "";
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const [debouncedInput] = useDebounceValue(input, 300);
  const parsedInput = parseNameInput(debouncedInput);
  const isValidInput =
    parsedInput.isOk() && parsedInput.value.nameLevel === 2 && parsedInput.value.tld === "eth";
  const registrarAddress = parameters.registrarAddress ?? contracts.ethRegistrar.address;
  const paymentTokenAddress = parameters.paymentTokenAddress ?? contracts.paymentTokens[0].address;

  return useQuery<
    NameRegistrationPrice,
    NameRegistrationPriceError,
    selectData,
    NameRegistrationPriceQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-registration-price",
      network,
      registrarAddress,
      paymentTokenAddress,
      parameters.duration.toString(),
      parsedInput.isOk() ? parsedInput.value.normalizedName : debouncedInput,
    ],
    enabled: (parameters.query?.enabled ?? true) && publicClient !== undefined && isValidInput,
    queryFn: async () => {
      if (publicClient === undefined) {
        return Promise.reject("CONTRACT_READ_FAILED" satisfies NameRegistrationPriceError);
      }

      const prepared = prepareNameRegistrationPriceRead({
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
