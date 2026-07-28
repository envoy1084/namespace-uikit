"use client";

import type {
  ExecuteContractWritesResult,
  PrepareRenewNameWriteError,
  PrepareRenewNameWriteProps,
  PreparedRenewNameWrite,
} from "#/actions";
import type { ParseNameInputError } from "#/lib";

import type { UseMutationOptions } from "@tanstack/react-query";

import { prepareRenewNameWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import { useEnsConfig } from "#/providers";

export type RenewNameVariables = Omit<
  PrepareRenewNameWriteProps,
  "network" | "registrarAddress"
> &
  PreparedWriteVariables;

export type RenewNameError = PreparedWriteMutationError<
  PrepareRenewNameWriteError | ParseNameInputError
>;

export interface UseRenewNameParameters {
  mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      RenewNameError,
      RenewNameVariables
    >,
    "mutationFn" | "mutationKey"
  >;
  registrarAddress?: PrepareRenewNameWriteProps["registrarAddress"];
}

export function useRenewName(parameters: UseRenewNameParameters = {}) {
  const { contracts, network } = useEnsConfig();
  const registrarAddress =
    parameters.registrarAddress ?? contracts.ethRegistrar.address;

  return usePreparedContractWrite<
    RenewNameVariables,
    PreparedRenewNameWrite,
    PrepareRenewNameWriteError | ParseNameInputError
  >({
    ...(parameters.mutation === undefined
      ? {}
      : { mutation: parameters.mutation }),
    mutationKey: ["renew-name", registrarAddress],
    prepare: async (variables) =>
      prepareRenewNameWrite({
        ...variables,
        network,
        registrarAddress,
      }),
  });
}
