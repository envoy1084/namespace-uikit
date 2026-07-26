import type { EnsNetwork } from "#/data";

import { errAsync, ResultAsync } from "neverthrow";
import { isAddress, zeroAddress, type Address, type PublicClient } from "viem";

import { verifiableFactoryAbi } from "#/data/abi";

export type GetPermissionedResolverStatusError =
  | "CONTRACT_READ_FAILED"
  | "INVALID_FACTORY_ADDRESS"
  | "INVALID_IMPLEMENTATION_ADDRESS"
  | "INVALID_RESOLVER_ADDRESS";

export type PermissionedResolverStatus =
  | "INVALID"
  | "NOT_DEPLOYED"
  | "VERIFIED";

export interface GetPermissionedResolverStatusProps {
  readonly factoryAddress: Address;
  readonly implementationAddress: Address;
  readonly network: EnsNetwork;
  readonly resolverAddress: Address;
}

/** Checks whether a predicted resolver exists and matches its implementation. */
export function getPermissionedResolverStatus(
  publicClient: PublicClient,
  props: GetPermissionedResolverStatusProps,
): ResultAsync<PermissionedResolverStatus, GetPermissionedResolverStatusError> {
  const { factoryAddress, implementationAddress, resolverAddress } = props;

  if (!isAddress(factoryAddress) || factoryAddress === zeroAddress) {
    return errAsync("INVALID_FACTORY_ADDRESS");
  }

  if (
    !isAddress(implementationAddress) ||
    implementationAddress === zeroAddress
  ) {
    return errAsync("INVALID_IMPLEMENTATION_ADDRESS");
  }

  if (!isAddress(resolverAddress) || resolverAddress === zeroAddress) {
    return errAsync("INVALID_RESOLVER_ADDRESS");
  }

  return ResultAsync.fromPromise(
    (async () => {
      const bytecode = await publicClient.getCode({
        address: resolverAddress,
      });

      if (bytecode === undefined || bytecode === "0x") {
        return "NOT_DEPLOYED" as const;
      }

      const isVerified = await publicClient.readContract({
        address: factoryAddress,
        abi: verifiableFactoryAbi,
        functionName: "verifyContract",
        args: [resolverAddress, implementationAddress],
      });

      return isVerified ? ("VERIFIED" as const) : ("INVALID" as const);
    })(),
    () => "CONTRACT_READ_FAILED" as const,
  );
}
