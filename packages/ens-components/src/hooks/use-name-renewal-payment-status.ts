"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  executeContractReads,
  type NameRenewalPaymentStatus,
  type NameRenewalPaymentStatusReadError,
  prepareNameRenewalPaymentStatusRead,
  type PrepareNameRenewalPaymentStatusReadError,
} from "#/actions";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { useEnsConfig } from "#/providers";

type NameRenewalPaymentStatusError =
  | "CONTRACT_READ_FAILED"
  | NameRenewalPaymentStatusReadError
  | ParseNameInputError
  | PrepareNameRenewalPaymentStatusReadError;

type NameRenewalPaymentStatusQueryKey = readonly [
  "ens",
  "name-renewal-payment-status",
  string,
  Address,
  Address,
  Address,
  Address | null,
  string,
  string,
];

export interface UseNameRenewalPaymentStatusParameters<selectData = NameRenewalPaymentStatus> {
  account: Address | null | undefined;
  duration: bigint;
  ethRegistryAddress?: Address;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  query?: Omit<
    UseQueryOptions<
      NameRenewalPaymentStatus,
      NameRenewalPaymentStatusError,
      selectData,
      NameRenewalPaymentStatusQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

export function useNameRenewalPaymentStatus<selectData = NameRenewalPaymentStatus>(
  parameters: UseNameRenewalPaymentStatusParameters<selectData>,
) {
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const account = parameters.account ?? null;
  const registrarAddress = parameters.registrarAddress ?? contracts.ethRegistrar.address;
  const ethRegistryAddress = parameters.ethRegistryAddress ?? contracts.ethRegistry.address;
  const paymentTokenAddress = parameters.paymentTokenAddress ?? contracts.paymentTokens[0].address;

  return useQuery<
    NameRenewalPaymentStatus,
    NameRenewalPaymentStatusError,
    selectData,
    NameRenewalPaymentStatusQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-renewal-payment-status",
      network,
      registrarAddress,
      ethRegistryAddress,
      paymentTokenAddress,
      account,
      parameters.duration.toString(),
      parameters.input ?? "",
    ],
    enabled: (parameters.query?.enabled ?? true) && publicClient !== undefined && account !== null,
    queryFn: async () => {
      if (publicClient === undefined || account === null) {
        return Promise.reject("CONTRACT_READ_FAILED" satisfies NameRenewalPaymentStatusError);
      }

      const prepared = prepareNameRenewalPaymentStatusRead({
        account,
        duration: parameters.duration,
        ethRegistryAddress,
        input: parameters.input,
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
