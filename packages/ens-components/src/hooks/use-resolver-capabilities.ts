"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { Address } from "viem";
import { isAddress, zeroAddress } from "viem";
import { usePublicClient } from "wagmi";

import {
  readPermissionedResolverSupport,
  readPermissionedResolverVerification,
  type ReadPermissionedResolverSupportErrorType,
  type ReadPermissionedResolverVerificationErrorType,
} from "#/actions";
import { asWagmiChainId } from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

export type ResolverCapabilityStatus = "NOT_DEPLOYED" | "UNSUPPORTED" | "UNVERIFIED" | "VERIFIED";

export interface ResolverCapabilities {
  readonly isDeployed: boolean;
  readonly isPermissionedResolver: boolean;
  readonly isVerifiedDeployment: boolean;
  readonly resolverAddress: Address;
  readonly status: ResolverCapabilityStatus;
}

export type ResolverCapabilitiesError =
  | "CONTRACT_READ_FAILED"
  | "INVALID_RESOLVER_ADDRESS"
  | ReadPermissionedResolverSupportErrorType
  | ReadPermissionedResolverVerificationErrorType;

export type ResolverCapabilitiesQueryKey = readonly [
  "ens",
  "resolver-capabilities",
  number,
  Address,
  Address,
  Address,
];

export interface UseResolverCapabilitiesParameters<selectData = ResolverCapabilities> {
  factoryAddress?: Address;
  implementationAddress?: Address;
  query?: Omit<
    UseQueryOptions<
      ResolverCapabilities,
      ResolverCapabilitiesError,
      selectData,
      ResolverCapabilitiesQueryKey
    >,
    "queryFn" | "queryKey"
  >;
  resolverAddress: Address | null | undefined;
}

export function useResolverCapabilities<selectData = ResolverCapabilities>(
  parameters: UseResolverCapabilitiesParameters<selectData>,
) {
  const { chain, contracts } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: asWagmiChainId(chain.id) });
  const resolverAddress = parameters.resolverAddress ?? zeroAddress;
  const factoryAddress = parameters.factoryAddress ?? contracts.verifiableFactory.address;
  const implementationAddress =
    parameters.implementationAddress ?? contracts.permissionedResolverImplementation.address;
  const isValidResolver = isAddress(resolverAddress) && resolverAddress !== zeroAddress;

  return useQuery<
    ResolverCapabilities,
    ResolverCapabilitiesError,
    selectData,
    ResolverCapabilitiesQueryKey
  >({
    ...parameters.query,
    queryKey: [
      "ens",
      "resolver-capabilities",
      chain.id,
      resolverAddress,
      factoryAddress,
      implementationAddress,
    ],
    enabled: (parameters.query?.enabled ?? true) && publicClient !== undefined && isValidResolver,
    queryFn: async () => {
      if (publicClient === undefined || !isValidResolver) {
        return Promise.reject("INVALID_RESOLVER_ADDRESS" satisfies ResolverCapabilitiesError);
      }

      let bytecode: `0x${string}` | undefined;
      try {
        bytecode = await publicClient.getCode({ address: resolverAddress });
      } catch {
        return Promise.reject("CONTRACT_READ_FAILED" satisfies ResolverCapabilitiesError);
      }
      if (bytecode === undefined || bytecode === "0x") {
        return {
          isDeployed: false,
          isPermissionedResolver: false,
          isVerifiedDeployment: false,
          resolverAddress,
          status: "NOT_DEPLOYED",
        };
      }

      const [support, verification] = await Promise.all([
        readPermissionedResolverSupport(publicClient, { resolverAddress }),
        readPermissionedResolverVerification(publicClient, {
          factoryAddress,
          implementationAddress,
          resolverAddress,
        }),
      ]);
      if (support.isErr() || verification.isErr()) {
        return Promise.reject("CONTRACT_READ_FAILED" satisfies ResolverCapabilitiesError);
      }

      const status = !support.value
        ? "UNSUPPORTED"
        : verification.value
          ? "VERIFIED"
          : "UNVERIFIED";

      return {
        isDeployed: true,
        isPermissionedResolver: support.value,
        isVerifiedDeployment: verification.value,
        resolverAddress,
        status,
      };
    },
  });
}
