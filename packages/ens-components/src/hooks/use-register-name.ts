"use client";

import type {
  ExecuteContractWritesResult,
  PrepareRegisterNameWriteError,
  PrepareRegisterNameWriteProps,
  PreparedRegisterNameWrite,
} from "#/actions";
import type { ParseNameInputError } from "#/lib";

import type { UseMutationOptions } from "@tanstack/react-query";

import { prepareRegisterNameWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import { useEnsConfig } from "#/providers";

export type RegisterNameVariables = Omit<
  PrepareRegisterNameWriteProps,
  "network" | "registrarAddress"
> &
  PreparedWriteVariables;

export type RegisterNameError = PreparedWriteMutationError<
  PrepareRegisterNameWriteError | ParseNameInputError
>;

export interface UseRegisterNameParameters {
  mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      RegisterNameError,
      RegisterNameVariables
    >,
    "mutationFn" | "mutationKey"
  >;
  registrarAddress?: PrepareRegisterNameWriteProps["registrarAddress"];
}

export function useRegisterName(parameters: UseRegisterNameParameters = {}) {
  const { contracts, network } = useEnsConfig();
  const registrarAddress =
    parameters.registrarAddress ?? contracts.ethRegistrar.address;

  return usePreparedContractWrite<
    RegisterNameVariables,
    PreparedRegisterNameWrite,
    PrepareRegisterNameWriteError | ParseNameInputError
  >({
    ...(parameters.mutation === undefined
      ? {}
      : { mutation: parameters.mutation }),
    mutationKey: ["register-name", registrarAddress],
    prepare: async (variables) =>
      prepareRegisterNameWrite({
        ...variables,
        network,
        registrarAddress,
      }),
  });
}
