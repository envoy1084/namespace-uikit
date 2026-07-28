"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { Address } from "viem";
import { isAddress, zeroAddress } from "viem";
import { usePublicClient } from "wagmi";

import type {
  NameProfilePermissionRequest,
  NameProfilePermissions,
  ReadNameProfilePermissionsErrorType,
  ReadNameResolverErrorType,
  ReadPermissionedResolverSupportErrorType,
} from "#/actions";
import {
  getNameProfilePermissionId,
  readNameProfilePermissions,
  readNameResolver,
  readPermissionedResolverSupport,
} from "#/actions";
import { asWagmiChainId } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";
import { useEnsConfig } from "#/providers";

export type NameProfilePermissionsError =
  | "CONTRACT_READ_FAILED"
  | "RESOLVER_NOT_FOUND"
  | "UNSUPPORTED_RESOLVER"
  | ParseNameInputError
  | ReadNameProfilePermissionsErrorType
  | ReadNameResolverErrorType
  | ReadPermissionedResolverSupportErrorType;

type NameProfilePermissionsQueryKey = readonly [
  "ens",
  "name-profile-permissions",
  number,
  string,
  Address | undefined,
  Address | undefined,
  readonly string[],
];

export interface UseNameProfilePermissionsParameters<selectData = NameProfilePermissions> {
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
  const { chain, contracts } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: asWagmiChainId(chain.id) });
  const parsed = parseNameInput(parameters.input);
  const requestIds = parameters.requests.map(getNameProfilePermissionId);
  const isValidResolver =
    parameters.resolverAddress === undefined ||
    (isAddress(parameters.resolverAddress) && parameters.resolverAddress !== zeroAddress);

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
        return Promise.reject("CONTRACT_READ_FAILED" satisfies NameProfilePermissionsError);
      }

      let resolverAddress = parameters.resolverAddress;
      if (resolverAddress === undefined) {
        const resolverResult = await readNameResolver(publicClient, {
          input: parameters.input,
          universalResolverAddress: contracts.universalResolverV2.address,
        });
        if (resolverResult.isErr()) throw resolverResult.error;
        resolverAddress = resolverResult.value.resolverAddress;
      }

      if (resolverAddress === zeroAddress) {
        return Promise.reject("RESOLVER_NOT_FOUND" satisfies NameProfilePermissionsError);
      }

      const support = await readPermissionedResolverSupport(publicClient, { resolverAddress });
      if (support.isErr()) throw support.error;
      if (!support.value) {
        return Promise.reject("UNSUPPORTED_RESOLVER" satisfies NameProfilePermissionsError);
      }

      const permissions = await readNameProfilePermissions(publicClient, {
        account: parameters.account,
        input: parameters.input,
        requests: parameters.requests,
        resolverAddress,
      });
      if (permissions.isErr()) throw permissions.error;
      return permissions.value;
    },
  });
}
