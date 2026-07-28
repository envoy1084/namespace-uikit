"use client";

import type { UseMutationOptions } from "@tanstack/react-query";

import type {
  ExecuteContractWritesResult,
  PrepareCommitNameWriteError,
  PrepareCommitNameWriteParameters,
  PreparedCommitNameWrite,
} from "#/actions";
import { prepareCommitNameWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import type { ParseNameInputError } from "#/lib";
import { useEnsConfig } from "#/providers";

export type CommitNameVariables = Omit<
  PrepareCommitNameWriteParameters,
  "network" | "registrarAddress"
> &
  PreparedWriteVariables;

export type CommitNameError = PreparedWriteMutationError<
  PrepareCommitNameWriteError | ParseNameInputError
>;

export interface UseCommitNameParameters {
  mutation?: Omit<
    UseMutationOptions<ExecuteContractWritesResult, CommitNameError, CommitNameVariables>,
    "mutationFn" | "mutationKey"
  >;
  registrarAddress?: PrepareCommitNameWriteParameters["registrarAddress"];
}

export function useCommitName(parameters: UseCommitNameParameters = {}) {
  const { contracts, network } = useEnsConfig();
  const registrarAddress = parameters.registrarAddress ?? contracts.ethRegistrar.address;

  return usePreparedContractWrite<
    CommitNameVariables,
    PreparedCommitNameWrite,
    PrepareCommitNameWriteError | ParseNameInputError
  >({
    ...(parameters.mutation === undefined ? {} : { mutation: parameters.mutation }),
    mutationKey: ["commit-name", registrarAddress],
    prepare: async (variables) =>
      prepareCommitNameWrite({
        ...variables,
        network,
        registrarAddress,
      }),
  });
}
