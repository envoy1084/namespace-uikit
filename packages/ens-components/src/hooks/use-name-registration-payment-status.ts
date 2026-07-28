"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { Address } from "viem";
import { usePublicClient } from "wagmi";

import {
  executeContractReads,
  prepareNameRegistrationPaymentStatusRead,
  type PrepareNameRegistrationPaymentStatusReadError,
  type NameRegistrationPaymentStatus,
  type NameRegistrationPaymentStatusReadError,
} from "#/actions";
import { asWagmiChainId } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { useEnsConfig } from "#/providers";

type NameRegistrationPaymentStatusError =
  | "CONTRACT_READ_FAILED"
  | ParseNameInputError
  | PrepareNameRegistrationPaymentStatusReadError
  | NameRegistrationPaymentStatusReadError;
type NameRegistrationPaymentStatusQueryKey = readonly [
  "ens",
  "name-registration-payment-status",
  number,
  Address,
  Address,
  Address | null,
  string,
  string,
];

export interface UseNameRegistrationPaymentStatusParameters<
  selectData = NameRegistrationPaymentStatus,
> {
  account: Address | null | undefined;
  duration: bigint;
  input: string | null | undefined;
  paymentTokenAddress?: Address;
  query?: Omit<
    UseQueryOptions<
      NameRegistrationPaymentStatus,
      NameRegistrationPaymentStatusError,
      selectData,
      NameRegistrationPaymentStatusQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  registrarAddress?: Address;
}

export function useNameRegistrationPaymentStatus<selectData = NameRegistrationPaymentStatus>(
  parameters: UseNameRegistrationPaymentStatusParameters<selectData>,
) {
  const { chain, contracts } = useEnsConfig();
  const publicClient = usePublicClient({
    chainId: asWagmiChainId(chain.id),
  });
  const account = parameters.account ?? null;
  const registrarAddress = parameters.registrarAddress ?? contracts.ethRegistrar.address;
  const paymentTokenAddress = parameters.paymentTokenAddress ?? contracts.paymentTokens[0].address;

  return useQuery<
    NameRegistrationPaymentStatus,
    NameRegistrationPaymentStatusError,
    selectData,
    NameRegistrationPaymentStatusQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-registration-payment-status",
      chain.id,
      registrarAddress,
      paymentTokenAddress,
      account,
      parameters.duration.toString(),
      parameters.input ?? "",
    ],
    enabled: (parameters.query?.enabled ?? true) && publicClient !== undefined && account !== null,
    queryFn: async () => {
      if (publicClient === undefined || account === null) {
        return Promise.reject("CONTRACT_READ_FAILED" satisfies NameRegistrationPaymentStatusError);
      }

      const prepared = prepareNameRegistrationPaymentStatusRead({
        account,
        duration: parameters.duration,
        input: parameters.input,
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
