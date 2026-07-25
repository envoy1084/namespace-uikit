"use client";

import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { useDebounceValue } from "usehooks-ts";
import { BaseError, ContractFunctionRevertedError, isAddress } from "viem";
import { usePublicClient } from "wagmi";

import { useEnsConfig } from "../providers";
import { normalizeEthNameInput } from "./name-availability";

const DEFAULT_DEBOUNCE_MS = 350;
const DEFAULT_STALE_TIME_MS = 15_000;
const DEFAULT_GC_TIME_MS = 5 * 60_000;
const DEBOUNCE_OPTIONS = { trailing: true } as const;

type RetryOption =
  | boolean
  | number
  | ((failureCount: number, error: Error) => boolean);

export type NameAvailabilityStatus =
  | "idle"
  | "disabled"
  | "invalid"
  | "debouncing"
  | "checking"
  | "available"
  | "unavailable"
  | "unsupported-chain"
  | "configuration-error"
  | "error";

export interface UseNameAvailabilityOptions {
  /**
   * Enables the availability request. Input parsing still runs when disabled.
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Delay applied before an RPC request is made.
   *
   * @default 350
   */
  debounceMs?: number;
  /**
   * How long a successful result remains fresh.
   *
   * @default 15000
   */
  staleTime?: number;
  /**
   * How long an unused result remains in the query cache.
   *
   * @default 300000
   */
  gcTime?: number;
  /**
   * TanStack Query retry behavior. Contract reverts are not retried by default.
   */
  retry?: RetryOption;
}

function toNonNegativeInteger(value: number | undefined, fallback: number) {
  if (value === undefined || !Number.isFinite(value)) return fallback;
  return Math.max(0, Math.trunc(value));
}

function retryAvailabilityRequest(failureCount: number, error: Error) {
  if (failureCount >= 2) return false;

  if (
    error instanceof ContractFunctionRevertedError ||
    (error instanceof BaseError &&
      error.walk((cause) => cause instanceof ContractFunctionRevertedError) !==
        null)
  ) {
    return false;
  }

  return true;
}

/**
 * Checks whether a second-level `.eth` name is available from the ENSv2
 * ETHRegistrar.
 *
 * The input may be either a label (`"vitalik"`) or a full name
 * (`"vitalik.eth"`). It is trimmed, normalized according to ENSIP-15, and
 * debounced before the contract is queried.
 *
 * `EnsProvider`, a `WagmiProvider` configured for the selected chain, and a
 * `QueryClientProvider` are required above the consuming component.
 */
export function useNameAvailability(
  name: string | null | undefined,
  options: UseNameAvailabilityOptions = {},
) {
  const input = name ?? "";
  const enabled = options.enabled ?? true;
  const { chain, contracts, network } = useEnsConfig();
  const chainId = chain.id;
  const ethRegistrar = contracts.ethRegistrar;
  const registrarAddress = ethRegistrar?.address;
  const debounceMs = toNonNegativeInteger(
    options.debounceMs,
    DEFAULT_DEBOUNCE_MS,
  );
  const staleTime = toNonNegativeInteger(
    options.staleTime,
    DEFAULT_STALE_TIME_MS,
  );
  const gcTime = toNonNegativeInteger(options.gcTime, DEFAULT_GC_TIME_MS);

  const [debouncedValue] = useDebounceValue(
    input,
    debounceMs,
    DEBOUNCE_OPTIONS,
  );
  const debouncedInput = debounceMs === 0 ? input : debouncedValue;

  const inputState = useMemo(() => normalizeEthNameInput(input), [input]);
  const debouncedInputState = useMemo(
    () => normalizeEthNameInput(debouncedInput),
    [debouncedInput],
  );

  const isDebouncing = input !== debouncedInput;
  const hasValidRegistrar =
    ethRegistrar !== null && isAddress(ethRegistrar.address);
  const publicClient = usePublicClient({ chainId });

  const currentLabel = inputState.isValid ? inputState.label : undefined;
  const debouncedLabel = debouncedInputState.isValid
    ? debouncedInputState.label
    : undefined;
  const isCurrentInput =
    !isDebouncing &&
    currentLabel !== undefined &&
    currentLabel === debouncedLabel;
  const queryEnabled =
    enabled &&
    isCurrentInput &&
    hasValidRegistrar &&
    publicClient !== undefined;

  const queryKey = [
    "ens-components",
    "ens-v2",
    "name-availability",
    network,
    chainId,
    registrarAddress ?? null,
    debouncedLabel ?? null,
  ] as const;

  const query = useQuery<boolean, Error>({
    queryKey,
    enabled: queryEnabled,
    staleTime,
    gcTime,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: options.retry ?? retryAvailabilityRequest,
    retryDelay: (attemptIndex) => Math.min(1_000 * 2 ** attemptIndex, 10_000),
    queryFn: async ({ signal }) => {
      if (
        publicClient === undefined ||
        debouncedLabel === undefined ||
        ethRegistrar === null ||
        !isAddress(ethRegistrar.address)
      ) {
        throw new Error("The ENSv2 availability query is not ready.");
      }

      signal.throwIfAborted();
      const available = await publicClient.readContract({
        address: ethRegistrar.address,
        abi: ethRegistrar.snippets.ethRegistrarIsAvailableSnippet,
        functionName: "isAvailable",
        args: [debouncedLabel],
      });
      signal.throwIfAborted();

      return available;
    },
  });

  let status: NameAvailabilityStatus;
  if (!enabled) {
    status = "disabled";
  } else if (!inputState.isValid) {
    status = inputState.error.code === "empty" ? "idle" : "invalid";
  } else if (isDebouncing) {
    status = "debouncing";
  } else if (!hasValidRegistrar) {
    status = "configuration-error";
  } else if (publicClient === undefined) {
    status = "unsupported-chain";
  } else if (query.isPending) {
    status = "checking";
  } else if (query.isError) {
    status = "error";
  } else {
    status = query.data ? "available" : "unavailable";
  }

  const hasCurrentResult = isCurrentInput && query.isSuccess;

  return {
    network,
    chainId,
    registrarAddress,
    input,
    debouncedInput,
    normalizedName: inputState.isValid ? inputState.name : undefined,
    label: currentLabel,
    validationError: inputState.isValid ? undefined : inputState.error,
    isValid: inputState.isValid,
    isDebouncing,
    isChecking: queryEnabled && query.isFetching,
    isAvailable: hasCurrentResult ? query.data : undefined,
    isUnavailable: hasCurrentResult ? !query.data : false,
    status,
    error: query.error,
    queryKey,
    query,
    refetch: query.refetch,
  } as const;
}
