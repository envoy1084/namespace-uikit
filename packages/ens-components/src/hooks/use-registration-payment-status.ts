"use client";

import type { Address } from "viem";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { usePublicClient } from "wagmi";

import {
  getRegistrationPaymentStatus,
  type GetRegistrationPaymentStatusError,
  type ParseNameInputError,
  type RegistrationPaymentStatus,
} from "#/actions";
import { useEnsConfig } from "#/providers";

type RegistrationPaymentStatusError =
  | GetRegistrationPaymentStatusError
  | ParseNameInputError;
type RegistrationPaymentStatusQueryKey = readonly [
  "ens",
  "registration-payment-status",
  string,
  Address,
  Address,
  Address | null,
  string,
  string,
];

export interface UseRegistrationPaymentStatusParameters<
  selectData = RegistrationPaymentStatus,
> {
  account: Address | null | undefined;
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  query?: Omit<
    UseQueryOptions<
      RegistrationPaymentStatus,
      RegistrationPaymentStatusError,
      selectData,
      RegistrationPaymentStatusQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

export function useRegistrationPaymentStatus<
  selectData = RegistrationPaymentStatus,
>(parameters: UseRegistrationPaymentStatusParameters<selectData>) {
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const account = parameters.account ?? null;
  const registrarAddress =
    parameters.registrarAddress ?? contracts.ethRegistrar.address;
  const paymentTokenAddress =
    parameters.paymentTokenAddress ?? contracts.mockUsdc.address;

  return useQuery<
    RegistrationPaymentStatus,
    RegistrationPaymentStatusError,
    selectData,
    RegistrationPaymentStatusQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "registration-payment-status",
      network,
      registrarAddress,
      paymentTokenAddress,
      account,
      parameters.duration.toString(),
      parameters.input ?? "",
    ],
    enabled:
      (parameters.query?.enabled ?? true) &&
      publicClient !== undefined &&
      account !== null,
    queryFn: async () => {
      if (publicClient === undefined || account === null) {
        throw "CONTRACT_READ_FAILED" satisfies GetRegistrationPaymentStatusError;
      }

      const result = await getRegistrationPaymentStatus(publicClient, {
        account,
        duration: parameters.duration,
        input: parameters.input,
        network,
        paymentTokenAddress,
        registrarAddress,
      });

      if (result.isErr()) throw result.error;
      return result.value;
    },
  });
}
