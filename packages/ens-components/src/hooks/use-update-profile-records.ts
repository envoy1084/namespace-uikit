"use client";

import type { UseMutationOptions } from "@tanstack/react-query";

import type {
  ExecuteContractWritesResult,
  PrepareProfileRecordsWriteError,
  PrepareProfileRecordsWriteParameters,
  PreparedProfileRecordsWrite,
} from "#/actions";
import { prepareProfileRecordsWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import { useEnsConfig } from "#/providers";

export type UpdateProfileRecordsVariables = Omit<PrepareProfileRecordsWriteParameters, "network"> &
  PreparedWriteVariables;

export type UpdateProfileRecordsError = PreparedWriteMutationError<PrepareProfileRecordsWriteError>;

export interface UseUpdateProfileRecordsParameters {
  mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      UpdateProfileRecordsError,
      UpdateProfileRecordsVariables
    >,
    "mutationFn" | "mutationKey"
  >;
}

export function useUpdateProfileRecords(parameters: UseUpdateProfileRecordsParameters = {}) {
  const { network } = useEnsConfig();

  return usePreparedContractWrite<
    UpdateProfileRecordsVariables,
    PreparedProfileRecordsWrite,
    PrepareProfileRecordsWriteError
  >({
    ...(parameters.mutation === undefined ? {} : { mutation: parameters.mutation }),
    mutationKey: ["update-profile-records"],
    prepare: async (variables, publicClient) =>
      await prepareProfileRecordsWrite(publicClient, {
        ...variables,
        network,
      }),
  });
}
