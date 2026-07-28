"use client";

import type { UseMutationOptions } from "@tanstack/react-query";

import type {
  ExecuteContractWritesResult,
  PreparePermissionedResolverDeploymentWriteError,
  PreparePermissionedResolverDeploymentWriteParameters,
  PreparedPermissionedResolverDeploymentWrite,
} from "#/actions";
import { preparePermissionedResolverDeploymentWrite } from "#/actions";
import {
  usePreparedContractWrite,
  type PreparedWriteMutationError,
  type PreparedWriteVariables,
} from "#/hooks/use-prepared-contract-write";
import { useEnsConfig } from "#/providers";

export type DeployPermissionedResolverVariables = Omit<
  PreparePermissionedResolverDeploymentWriteParameters,
  "factoryAddress" | "implementationAddress"
> &
  PreparedWriteVariables;

export type DeployPermissionedResolverError =
  PreparedWriteMutationError<PreparePermissionedResolverDeploymentWriteError>;

export interface UseDeployPermissionedResolverParameters {
  factoryAddress?: PreparePermissionedResolverDeploymentWriteParameters["factoryAddress"];
  implementationAddress?: PreparePermissionedResolverDeploymentWriteParameters["implementationAddress"];
  mutation?: Omit<
    UseMutationOptions<
      ExecuteContractWritesResult,
      DeployPermissionedResolverError,
      DeployPermissionedResolverVariables
    >,
    "mutationFn" | "mutationKey"
  >;
}

export function useDeployPermissionedResolver(
  parameters: UseDeployPermissionedResolverParameters = {},
) {
  const { contracts } = useEnsConfig();
  const factoryAddress = parameters.factoryAddress ?? contracts.verifiableFactory.address;
  const implementationAddress =
    parameters.implementationAddress ?? contracts.permissionedResolverImplementation.address;

  return usePreparedContractWrite<
    DeployPermissionedResolverVariables,
    PreparedPermissionedResolverDeploymentWrite,
    PreparePermissionedResolverDeploymentWriteError
  >({
    ...(parameters.mutation === undefined ? {} : { mutation: parameters.mutation }),
    mutationKey: ["deploy-permissioned-resolver", factoryAddress, implementationAddress],
    prepare: async (variables, publicClient) =>
      await preparePermissionedResolverDeploymentWrite(publicClient, {
        ...variables,
        factoryAddress,
        implementationAddress,
      }),
  });
}
