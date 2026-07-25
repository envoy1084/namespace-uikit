"use client";

import { useQuery } from "@tanstack/react-query";

import { useDebounceValue } from "usehooks-ts";
import { usePublicClient } from "wagmi";

import {
  isNameAvailable,
  parseNameInput,
  type IsNameAvailableError,
  type ParseNameInputError,
} from "../actions";
import { useEnsConfig } from "../providers";

export interface UseNameAvailabilityOptions {
  debounceMs?: number;
  enabled?: boolean;
}

export function useNameAvailability(
  value: string | null | undefined,
  options: UseNameAvailabilityOptions = {},
) {
  const input = value ?? "";
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const [debouncedInput] = useDebounceValue(input, options.debounceMs ?? 300);
  const parsedInput = parseNameInput(debouncedInput);
  const isDebouncing = input !== debouncedInput;
  const validationError: ParseNameInputError | "UNSUPPORTED_NAME" | undefined =
    parsedInput.isErr()
      ? parsedInput.error
      : parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth"
        ? "UNSUPPORTED_NAME"
        : undefined;
  const registrarAddress = contracts.ethRegistrar.address;

  const query = useQuery<boolean, IsNameAvailableError | ParseNameInputError>({
    queryKey: [
      "ens",
      "name-availability",
      network,
      registrarAddress,
      parsedInput.isOk() ? parsedInput.value.normalizedName : debouncedInput,
    ],
    enabled:
      (options.enabled ?? true) &&
      publicClient !== undefined &&
      validationError === undefined,
    retry: false,
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

  return {
    ...query,
    isAvailable: isDebouncing ? undefined : query.data,
    isDebouncing,
    validationError,
  };
}
