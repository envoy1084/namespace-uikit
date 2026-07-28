"use client";

import type { Address } from "viem";

import type {
  NameProfilePermissionRequest,
  NameProfilePermissions,
  PrepareNameProfilePermissionsReadError,
  PrepareNameResolverReadError,
  PreparePermissionedResolverSupportReadError,
} from "#/actions";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { isAddress, zeroAddress } from "viem";
import { usePublicClient } from "wagmi";

import {
  executeContractRead,
  executeContractReads,
  getNameProfilePermissionId,
  prepareNameProfilePermissionsRead,
  prepareNameResolverRead,
  preparePermissionedResolverSupportRead,
} from "#/actions";
import { parseNameInput } from "#/lib/parse-name-input";
import { useEnsConfig } from "#/providers";

export type NameProfilePermissionsError =
  | "CONTRACT_READ_FAILED"
  | "RESOLVER_NOT_FOUND"
  | "UNSUPPORTED_RESOLVER"
  | ParseNameInputError
  | PrepareNameProfilePermissionsReadError
  | PrepareNameResolverReadError
  | PreparePermissionedResolverSupportReadError;

type NameProfilePermissionsQueryKey = readonly [
  "ens",
  "name-profile-permissions",
  string,
  number,
  string,
  Address | undefined,
  Address | undefined,
  readonly string[],
];

export interface UseNameProfilePermissionsParameters<
  selectData = NameProfilePermissions,
> {
  account?: Address | undefined;
  input: string | null | undefined;
  query?: Omit<
    UseQueryOptions<
      NameProfilePermissions,
      NameProfilePermissionsError,
      selectData,
      NameProfilePermissionsQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  requests: readonly NameProfilePermissionRequest[];
  resolverAddress?: Address | undefined;
}

export function useNameProfilePermissions<selectData = NameProfilePermissions>(
  parameters: UseNameProfilePermissionsParameters<selectData>,
) {
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const parsed = parseNameInput(parameters.input);
  const requestIds = parameters.requests.map(getNameProfilePermissionId);
  const isValidResolver =
    parameters.resolverAddress === undefined ||
    (isAddress(parameters.resolverAddress) &&
      parameters.resolverAddress !== zeroAddress);

  return useQuery<
    NameProfilePermissions,
    NameProfilePermissionsError,
    selectData,
    NameProfilePermissionsQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "name-profile-permissions",
      network,
      chain.id,
      parsed.isOk() ? parsed.value.normalizedName : (parameters.input ?? ""),
      parameters.account,
      parameters.resolverAddress,
      requestIds,
    ],
    enabled:
      (parameters.query?.enabled ?? true) &&
      publicClient !== undefined &&
      parameters.account !== undefined &&
      parsed.isOk() &&
      isValidResolver &&
      parameters.requests.length > 0,
    queryFn: async () => {
      if (publicClient === undefined || parameters.account === undefined) {
        throw "CONTRACT_READ_FAILED" satisfies NameProfilePermissionsError;
      }

      let resolverAddress = parameters.resolverAddress;
      if (resolverAddress === undefined) {
        const resolverRead = prepareNameResolverRead({
          input: parameters.input,
          network,
          universalResolverAddress: contracts.universalResolverV2.address,
        });
        if (resolverRead.isErr()) throw resolverRead.error;

        const resolverResult = await executeContractRead(
          publicClient,
          resolverRead.value,
        );
        if (resolverResult.isErr()) throw resolverResult.error;
        resolverAddress = resolverResult.value[0];
      }

      if (resolverAddress === zeroAddress) {
        throw "RESOLVER_NOT_FOUND" satisfies NameProfilePermissionsError;
      }

      const supportRead = preparePermissionedResolverSupportRead({
        network,
        resolverAddress,
      });
      if (supportRead.isErr()) throw supportRead.error;
      const support = await executeContractRead(
        publicClient,
        supportRead.value,
      );
      if (support.isErr()) throw support.error;
      if (!support.value) {
        throw "UNSUPPORTED_RESOLVER" satisfies NameProfilePermissionsError;
      }

      const permissionRead = prepareNameProfilePermissionsRead({
        account: parameters.account,
        input: parameters.input,
        network,
        requests: parameters.requests,
        resolverAddress,
      });
      if (permissionRead.isErr()) throw permissionRead.error;

      const permissions = await executeContractReads(
        publicClient,
        permissionRead.value,
      );
      if (permissions.isErr()) throw permissions.error;
      return permissions.value;
    },
  });
}
