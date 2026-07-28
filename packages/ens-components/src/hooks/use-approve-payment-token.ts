"use client";

import type { UseMutationOptions } from "@tanstack/react-query";

import type {
  ExecuteContractWritesResult,
  PreparePaymentTokenApprovalWriteError,
  PreparePaymentTokenApprovalWriteParameters,
  PreparedPaymentTokenApprovalWrite,
} from "#/actions";
import { preparePaymentTokenApprovalWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";

export type ApprovePaymentTokenVariables = PreparePaymentTokenApprovalWriteParameters &
  PreparedWriteVariables;

export type ApprovePaymentTokenError =
  PreparedWriteMutationError<PreparePaymentTokenApprovalWriteError>;

export interface UseApprovePaymentTokenParameters {
  mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      ApprovePaymentTokenError,
      ApprovePaymentTokenVariables
    >,
    "mutationFn" | "mutationKey"
  >;
}

export function useApprovePaymentToken(parameters: UseApprovePaymentTokenParameters = {}) {
  return usePreparedContractWrite<
    ApprovePaymentTokenVariables,
    PreparedPaymentTokenApprovalWrite,
    PreparePaymentTokenApprovalWriteError
  >({
    ...(parameters.mutation === undefined ? {} : { mutation: parameters.mutation }),
    mutationKey: ["approve-payment-token"],
    prepare: async (variables) => preparePaymentTokenApprovalWrite(variables),
  });
}
