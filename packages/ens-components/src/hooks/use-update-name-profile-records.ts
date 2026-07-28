"use client";

import type { UseMutationOptions } from "@tanstack/react-query";

import type {
  ExecuteContractWritesResult,
  PrepareNameProfileRecordsWriteError,
  PrepareNameProfileRecordsWriteParameters,
  PreparedNameProfileRecordsWrite,
} from "#/actions";
import { prepareNameProfileRecordsWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import { useEnsConfig } from "#/providers";

export type UpdateNameProfileRecordsVariables = Omit<
  PrepareNameProfileRecordsWriteParameters,
  "network"
> &
  PreparedWriteVariables;

export type UpdateNameProfileRecordsError =
  PreparedWriteMutationError<PrepareNameProfileRecordsWriteError>;

export interface UseUpdateNameProfileRecordsParameters {
  mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      UpdateNameProfileRecordsError,
      UpdateNameProfileRecordsVariables
    >,
    "mutationFn" | "mutationKey"
  >;
}

export function useUpdateNameProfileRecords(
  parameters: UseUpdateNameProfileRecordsParameters = {},
) {
  const { network } = useEnsConfig();

  return usePreparedContractWrite<
    UpdateNameProfileRecordsVariables,
    PreparedNameProfileRecordsWrite,
    PrepareNameProfileRecordsWriteError
  >({
    ...(parameters.mutation === undefined ? {} : { mutation: parameters.mutation }),
    mutationKey: ["update-name-profile-records"],
    prepare: async (variables, publicClient) =>
      await prepareNameProfileRecordsWrite(publicClient, {
        ...variables,
        network,
      }),
  });
}
