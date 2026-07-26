"use client";

import type { Address } from "viem";

import type { ParseNameInputError } from "#/lib/parse-name-input";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { usePublicClient } from "wagmi";

import {
  executeContractReads,
  prepareRegistrationPaymentStatusRead,
  type PrepareRegistrationPaymentStatusReadError,
  type RegistrationPaymentStatus,
  type RegistrationPaymentStatusReadError,
} from "#/actions";
import { useEnsConfig } from "#/providers";

type RegistrationPaymentStatusError =
  | "CONTRACT_READ_FAILED"
  | ParseNameInputError
  | PrepareRegistrationPaymentStatusReadError
  | RegistrationPaymentStatusReadError;
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
    parameters.paymentTokenAddress ?? contracts.paymentTokens[0].address;

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
        throw "CONTRACT_READ_FAILED" satisfies RegistrationPaymentStatusError;
      }

      const prepared = prepareRegistrationPaymentStatusRead({
        account,
        duration: parameters.duration,
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
