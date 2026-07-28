"use client";

import type {
  ExecuteContractWritesResult,
  PrepareCommitNameWriteError,
  PrepareCommitNameWriteProps,
  PreparedCommitNameWrite,
} from "#/actions";
import type { ParseNameInputError } from "#/lib";

import type { UseMutationOptions } from "@tanstack/react-query";

import { prepareCommitNameWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import { useEnsConfig } from "#/providers";

export type CommitNameVariables = Omit<
  PrepareCommitNameWriteProps,
  "network" | "registrarAddress"
> &
  PreparedWriteVariables;

export type CommitNameError = PreparedWriteMutationError<
  PrepareCommitNameWriteError | ParseNameInputError
>;

export interface UseCommitNameParameters {
  mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      CommitNameError,
      CommitNameVariables
    >,
    "mutationFn" | "mutationKey"
  >;
  registrarAddress?: PrepareCommitNameWriteProps["registrarAddress"];
}

export function useCommitName(parameters: UseCommitNameParameters = {}) {
  const { contracts, network } = useEnsConfig();
  const registrarAddress =
    parameters.registrarAddress ?? contracts.ethRegistrar.address;

  return usePreparedContractWrite<
    CommitNameVariables,
    PreparedCommitNameWrite,
    PrepareCommitNameWriteError | ParseNameInputError
  >({
    ...(parameters.mutation === undefined
      ? {}
      : { mutation: parameters.mutation }),
    mutationKey: ["commit-name", registrarAddress],
    prepare: async (variables) =>
      prepareCommitNameWrite({
        ...variables,
        network,
        registrarAddress,
      }),
  });
}
