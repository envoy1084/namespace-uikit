"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useDebounceValue } from "usehooks-ts";
import type { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  executeContractRead,
  prepareNameAvailabilityRead,
  type PrepareNameAvailabilityReadError,
} from "#/actions";
import { asWagmiChainId } from "#/lib/helpers";
import { parseNameInput, type ParseNameInputError } from "#/lib/parse-name-input";
import { useEnsConfig } from "#/providers";

type NameAvailabilityError =
  | "CONTRACT_READ_FAILED"
  | ParseNameInputError
  | PrepareNameAvailabilityReadError;
type NameAvailabilityQueryKey = readonly ["ens", "name-availability", number, Address, string];

export interface UseNameAvailabilityParameters<selectData = boolean> {
  input: string | null | undefined;
  query?: Omit<
    UseQueryOptions<boolean, NameAvailabilityError, selectData, NameAvailabilityQueryKey>,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

export function useNameAvailability<selectData = boolean>(
  parameters: UseNameAvailabilityParameters<selectData>,
) {
  const input = parameters.input ?? "";
  const { chain, contracts } = useEnsConfig();
  const publicClient = usePublicClient({
    chainId: asWagmiChainId(chain.id),
  });
  const [debouncedInput] = useDebounceValue(input, 300);
  const isDebounced = input === debouncedInput;
  const parsedInput = parseNameInput(debouncedInput);
  const isValidInput =
    parsedInput.isOk() && parsedInput.value.nameLevel === 2 && parsedInput.value.tld === "eth";
  const registrarAddress = parameters.registrarAddress ?? contracts.ethRegistrar.address;

  return useQuery<boolean, NameAvailabilityError, selectData, NameAvailabilityQueryKey>({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-availability",
      chain.id,
      registrarAddress,
      isDebounced && parsedInput.isOk() ? parsedInput.value.normalizedName : input,
    ],
    enabled:
      (parameters.query?.enabled ?? true) &&
      publicClient !== undefined &&
      isDebounced &&
      isValidInput,
    queryFn: async () => {
      if (publicClient === undefined) {
        return Promise.reject("CONTRACT_READ_FAILED" satisfies NameAvailabilityError);
      }

      const prepared = prepareNameAvailabilityRead({
        input: debouncedInput,
        registrarAddress,
      });
      if (prepared.isErr()) throw prepared.error;

      const result = await executeContractRead(publicClient, prepared.value);
      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
