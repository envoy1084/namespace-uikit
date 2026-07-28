"use client";

import type { UseMutationOptions } from "@tanstack/react-query";

import type {
  ExecuteContractWritesResult,
  PrepareSetAddressRecordWriteError,
  PrepareSetAddressRecordWriteParameters,
  PreparedSetAddressRecordWrite,
} from "#/actions";
import { prepareSetAddressRecordWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";

export type SetAddressRecordVariables = PrepareSetAddressRecordWriteParameters &
  PreparedWriteVariables;

export type SetAddressRecordError = PreparedWriteMutationError<PrepareSetAddressRecordWriteError>;

export interface UseSetAddressRecordParameters {
  mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      SetAddressRecordError,
      SetAddressRecordVariables
    >,
    "mutationFn" | "mutationKey"
  >;
}

export function useSetAddressRecord(parameters: UseSetAddressRecordParameters = {}) {
  return usePreparedContractWrite<
    SetAddressRecordVariables,
    PreparedSetAddressRecordWrite,
    PrepareSetAddressRecordWriteError
  >({
    ...(parameters.mutation === undefined ? {} : { mutation: parameters.mutation }),
    mutationKey: ["set-address-record"],
    prepare: async (variables) => prepareSetAddressRecordWrite(variables),
  });
}
