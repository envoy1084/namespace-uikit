"use client";

import type { UseMutationOptions } from "@tanstack/react-query";

import type {
  ExecuteContractWritesResult,
  PrepareRenewNameWriteError,
  PrepareRenewNameWriteParameters,
  PreparedRenewNameWrite,
} from "#/actions";
import { prepareRenewNameWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import type { ParseNameInputError } from "#/lib";
import { useEnsConfig } from "#/providers";

export type RenewNameVariables = Omit<
  PrepareRenewNameWriteParameters,
  "network" | "registrarAddress"
> &
  PreparedWriteVariables;

export type RenewNameError = PreparedWriteMutationError<
  PrepareRenewNameWriteError | ParseNameInputError
>;

export interface UseRenewNameParameters {
  mutation?: Omit<
    UseMutationOptions<ExecuteContractWritesResult, RenewNameError, RenewNameVariables>,
    "mutationFn" | "mutationKey"
  >;
  registrarAddress?: PrepareRenewNameWriteParameters["registrarAddress"];
}

export function useRenewName(parameters: UseRenewNameParameters = {}) {
  const { contracts, network } = useEnsConfig();
  const registrarAddress = parameters.registrarAddress ?? contracts.ethRegistrar.address;

  return usePreparedContractWrite<
    RenewNameVariables,
    PreparedRenewNameWrite,
    PrepareRenewNameWriteError | ParseNameInputError
  >({
    ...(parameters.mutation === undefined ? {} : { mutation: parameters.mutation }),
    mutationKey: ["renew-name", registrarAddress],
    prepare: async (variables) =>
      prepareRenewNameWrite({
        ...variables,
        network,
        registrarAddress,
      }),
  });
}
