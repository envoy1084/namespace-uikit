"use client";

import type { UseMutationOptions } from "@tanstack/react-query";

import type {
  ExecuteContractWritesResult,
  PrepareRegisterNameWriteError,
  PrepareRegisterNameWriteParameters,
  PreparedRegisterNameWrite,
} from "#/actions";
import { prepareRegisterNameWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import type { ParseNameInputError } from "#/lib";
import { useEnsConfig } from "#/providers";

export type RegisterNameVariables = Omit<PrepareRegisterNameWriteParameters, "registrarAddress"> &
  PreparedWriteVariables;

export type RegisterNameError = PreparedWriteMutationError<
  PrepareRegisterNameWriteError | ParseNameInputError
>;

export interface UseRegisterNameParameters {
  mutation?: Omit<
    UseMutationOptions<ExecuteContractWritesResult, RegisterNameError, RegisterNameVariables>,
    "mutationFn" | "mutationKey"
  >;
  registrarAddress?: PrepareRegisterNameWriteParameters["registrarAddress"];
}

export function useRegisterName(parameters: UseRegisterNameParameters = {}) {
  const { contracts } = useEnsConfig();
  const registrarAddress = parameters.registrarAddress ?? contracts.ethRegistrar.address;

  return usePreparedContractWrite<
    RegisterNameVariables,
    PreparedRegisterNameWrite,
    PrepareRegisterNameWriteError | ParseNameInputError
  >({
    ...(parameters.mutation === undefined ? {} : { mutation: parameters.mutation }),
    mutationKey: ["register-name", registrarAddress],
    prepare: async (variables) =>
      prepareRegisterNameWrite({
        ...variables,
        registrarAddress,
      }),
  });
}
