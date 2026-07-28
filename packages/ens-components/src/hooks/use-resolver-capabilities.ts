"use client";

import type { Address } from "viem";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { isAddress, zeroAddress } from "viem";
import { usePublicClient } from "wagmi";

import {
  executeContractRead,
  preparePermissionedResolverSupportRead,
  preparePermissionedResolverVerificationRead,
  type PreparePermissionedResolverSupportReadError,
  type PreparePermissionedResolverVerificationReadError,
} from "#/actions";
import { useEnsConfig } from "#/providers";

export type ResolverCapabilityStatus =
  | "NOT_DEPLOYED"
  | "UNSUPPORTED"
  | "UNVERIFIED"
  | "VERIFIED";

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
  | PreparePermissionedResolverSupportReadError
  | PreparePermissionedResolverVerificationReadError;

export type ResolverCapabilitiesQueryKey = readonly [
  "ens",
  "resolver-capabilities",
  string,
  Address,
  Address,
  Address,
];

export interface UseResolverCapabilitiesParameters<
  selectData = ResolverCapabilities,
> {
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
  const { chain, contracts, network } = useEnsConfig();
  const publicClient = usePublicClient({ chainId: chain.id });
  const resolverAddress = parameters.resolverAddress ?? zeroAddress;
  const factoryAddress =
    parameters.factoryAddress ?? contracts.verifiableFactory.address;
  const implementationAddress =
    parameters.implementationAddress ??
    contracts.permissionedResolverImplementation.address;
  const isValidResolver =
    isAddress(resolverAddress) && resolverAddress !== zeroAddress;

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
      network,
      resolverAddress,
      factoryAddress,
      implementationAddress,
    ],
    enabled:
      (parameters.query?.enabled ?? true) &&
      publicClient !== undefined &&
      isValidResolver,
    queryFn: async () => {
      if (publicClient === undefined || !isValidResolver) {
        throw "INVALID_RESOLVER_ADDRESS" satisfies ResolverCapabilitiesError;
      }

      let bytecode: `0x${string}` | undefined;
      try {
        bytecode = await publicClient.getCode({ address: resolverAddress });
      } catch {
        throw "CONTRACT_READ_FAILED" satisfies ResolverCapabilitiesError;
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

      const supportRead = preparePermissionedResolverSupportRead({
        network,
        resolverAddress,
      });
      if (supportRead.isErr()) throw supportRead.error;
      const verificationRead = preparePermissionedResolverVerificationRead({
        factoryAddress,
        implementationAddress,
        network,
        resolverAddress,
      });
      if (verificationRead.isErr()) throw verificationRead.error;

      const [support, verification] = await Promise.all([
        executeContractRead(publicClient, supportRead.value),
        executeContractRead(publicClient, verificationRead.value),
      ]);
      if (support.isErr() || verification.isErr()) {
        throw "CONTRACT_READ_FAILED" satisfies ResolverCapabilitiesError;
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
