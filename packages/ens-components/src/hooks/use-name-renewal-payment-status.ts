"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  type NameRenewalPaymentStatus,
  readNameRenewalPaymentStatus,
  type ReadNameRenewalPaymentStatusErrorType,
} from "#/actions";
import { asWagmiChainId } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

type NameRenewalPaymentStatusError = ReadNameRenewalPaymentStatusErrorType;

type NameRenewalPaymentStatusQueryKey = readonly [
  "ens",
  "name-renewal-payment-status",
  number,
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
  const { chain, contracts } = useEnsConfig();
  const publicClient = usePublicClient({
    chainId: asWagmiChainId(chain.id),
  });
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
      chain.id,
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

      const result = await readNameRenewalPaymentStatus(publicClient, {
        account,
        duration: parameters.duration,
        ethRegistryAddress,
        input: parameters.input,
        paymentTokenAddress,
        registrarAddress,
      });
      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
