"use client";

import type { Address } from "viem";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useDebounceValue } from "usehooks-ts";
import { usePublicClient } from "wagmi";

import {
  isNameAvailable,
  parseNameInput,
  type IsNameAvailableError,
  type ParseNameInputError,
} from "../actions";
import { useEnsConfig } from "../providers";

type NameAvailabilityError = IsNameAvailableError | ParseNameInputError;
type NameAvailabilityQueryKey = readonly [
  "ens",
  "name-availability",
  string,
  Address,
  string,
];

export interface UseNameAvailabilityParameters<selectData = boolean> {
  input: string | null | undefined;
  query?: Omit<
    UseQueryOptions<
      boolean,
      NameAvailabilityError,
      selectData,
      NameAvailabilityQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

export function useNameAvailability<selectData = boolean>(
  parameters: UseNameAvailabilityParameters<selectData>,
) {
  const input = parameters.input ?? "";
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const [debouncedInput] = useDebounceValue(input, 300);
  const isDebounced = input === debouncedInput;
  const parsedInput = parseNameInput(debouncedInput);
  const isValidInput =
    parsedInput.isOk() &&
    parsedInput.value.nameLevel === 2 &&
    parsedInput.value.tld === "eth";
  const registrarAddress =
    parameters.registrarAddress ?? contracts.ethRegistrar.address;

  return useQuery<
    boolean,
    NameAvailabilityError,
    selectData,
    NameAvailabilityQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-availability",
      network,
      registrarAddress,
      isDebounced && parsedInput.isOk()
        ? parsedInput.value.normalizedName
        : input,
    ],
    enabled:
      (parameters.query?.enabled ?? true) &&
      publicClient !== undefined &&
      isDebounced &&
      isValidInput,
    queryFn: async () => {
      if (publicClient === undefined) {
        throw "CONTRACT_READ_FAILED" satisfies IsNameAvailableError;
      }

      const result = await isNameAvailable(publicClient, {
        input: debouncedInput,
        network,
        registrarAddress,
      });

      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
