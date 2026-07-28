"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { Address } from "viem";

import type {
  ExecuteContractWritesResult,
  PrepareSetAddressRecordWriteError,
  PrepareSetL1PrimaryNameWriteError,
  PrepareSetL2PrimaryNameWriteError,
} from "#/actions";
import {
  prepareSetAddressRecordWrite,
  prepareSetL1PrimaryNameWrite,
  prepareSetL2PrimaryNameWrite,
} from "#/actions";
import {
  useExecuteContractWrites,
  type ExecuteContractWritesMutationError,
} from "#/hooks/use-execute-contract-writes";
import type {
  PreparedWriteExecutionOptions,
  PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import type { ParseNameInputError } from "#/lib";
import { useEnsConfig } from "#/providers";

export interface SetPrimaryNameVariables extends PreparedWriteVariables {
  readonly account: Address;
  readonly input: string | null | undefined;
  readonly owner?: Address;
  readonly resolverAddress: Address;
}

export type SetPrimaryNameError =
  | ExecuteContractWritesMutationError
  | PrepareSetAddressRecordWriteError
  | PrepareSetL1PrimaryNameWriteError
  | PrepareSetL2PrimaryNameWriteError
  | ParseNameInputError;

export interface UseSetPrimaryNameParameters {
  l1ReverseRegistrarAddress?: Address;
  l2ReverseRegistrarAddress?: Address;
  mutation?: Omit<
    UseMutationOptions<ExecuteContractWritesResult, SetPrimaryNameError, SetPrimaryNameVariables>,
    "mutationFn" | "mutationKey"
  >;
}

export function useSetPrimaryName(parameters: UseSetPrimaryNameParameters = {}) {
  const { chain, contracts } = useEnsConfig();
  const l1ReverseRegistrarAddress =
    parameters.l1ReverseRegistrarAddress ?? contracts.l1ReverseRegistrar.address;
  const l2ReverseRegistrarAddress =
    parameters.l2ReverseRegistrarAddress ?? contracts.l2ReverseRegistrar.address;
  const execution = useExecuteContractWrites();

  return useMutation<ExecuteContractWritesResult, SetPrimaryNameError, SetPrimaryNameVariables>({
    ...parameters.mutation,
    mutationKey: [
      "ens",
      "set-primary-name",
      chain.id,
      l1ReverseRegistrarAddress,
      l2ReverseRegistrarAddress,
    ],
    mutationFn: async (variables) => {
      const shared = {
        account: variables.account,
        input: variables.input,
      };
      const addressRecord = prepareSetAddressRecordWrite({
        ...shared,
        owner: variables.owner ?? variables.account,
        resolverAddress: variables.resolverAddress,
      });
      if (addressRecord.isErr()) throw addressRecord.error;
      const l2PrimaryName = prepareSetL2PrimaryNameWrite({
        ...shared,
        l2ReverseRegistrarAddress,
      });
      if (l2PrimaryName.isErr()) throw l2PrimaryName.error;
      const l1PrimaryName = prepareSetL1PrimaryNameWrite({
        ...shared,
        l1ReverseRegistrarAddress,
      });
      if (l1PrimaryName.isErr()) throw l1PrimaryName.error;

      return execution.mutateAsync({
        calls: [addressRecord.value, l2PrimaryName.value, l1PrimaryName.value],
        confirmation: variables.execution?.confirmation ?? "confirmed",
        ...(variables.execution?.onProgress === undefined
          ? {}
          : { onProgress: variables.execution.onProgress }),
        strategy: variables.execution?.strategy ?? "auto",
        ...(variables.execution?.timeout === undefined
          ? {}
          : { timeout: variables.execution.timeout }),
      });
    },
  });
}

export type { PreparedWriteExecutionOptions };
