import type { PreparedContractRead } from "#/actions/contract-reads";
import type { EnsNetwork } from "#/data";

import { err, errAsync, ok, ResultAsync, type Result } from "neverthrow";
import {
  isAddress,
  zeroAddress,
  type Address,
  type ContractFunctionParameters,
  type PublicClient,
} from "viem";

import { executeContractRead } from "#/actions/contract-reads";
import { verifiableFactoryAbi } from "#/data/abi";

export type GetPermissionedResolverStatusError =
  | "CONTRACT_READ_FAILED"
  | PreparePermissionedResolverVerificationReadError;

export type PreparePermissionedResolverVerificationReadError =
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

type PermissionedResolverVerificationRequest = ContractFunctionParameters<
  typeof verifiableFactoryAbi,
  "view",
  "verifyContract",
  readonly [Address, Address]
>;

export type PreparedPermissionedResolverVerificationRead = PreparedContractRead<
  PermissionedResolverVerificationRequest,
  boolean,
  "permissioned-resolver-verification",
  {
    readonly implementationAddress: Address;
    readonly resolverAddress: Address;
  }
>;

export function preparePermissionedResolverVerificationRead(
  props: GetPermissionedResolverStatusProps,
): Result<
  PreparedPermissionedResolverVerificationRead,
  PreparePermissionedResolverVerificationReadError
> {
  const { factoryAddress, implementationAddress, resolverAddress } = props;

  if (!isAddress(factoryAddress) || factoryAddress === zeroAddress) {
    return err("INVALID_FACTORY_ADDRESS");
  }
  if (
    !isAddress(implementationAddress) ||
    implementationAddress === zeroAddress
  ) {
    return err("INVALID_IMPLEMENTATION_ADDRESS");
  }
  if (!isAddress(resolverAddress) || resolverAddress === zeroAddress) {
    return err("INVALID_RESOLVER_ADDRESS");
  }

  return ok({
    kind: "permissioned-resolver-verification",
    metadata: { implementationAddress, resolverAddress },
    request: {
      address: factoryAddress,
      abi: verifiableFactoryAbi,
      functionName: "verifyContract",
      args: [resolverAddress, implementationAddress],
    },
  });
}

/** Checks whether a predicted resolver exists and matches its implementation. */
export function getPermissionedResolverStatus(
  publicClient: PublicClient,
  props: GetPermissionedResolverStatusProps,
): ResultAsync<PermissionedResolverStatus, GetPermissionedResolverStatusError> {
  const prepared = preparePermissionedResolverVerificationRead(props);
  if (prepared.isErr()) return errAsync(prepared.error);

  return ResultAsync.fromPromise(
    (async () => {
      const bytecode = await publicClient.getCode({
        address: props.resolverAddress,
      });

      if (bytecode === undefined || bytecode === "0x") {
        return "NOT_DEPLOYED" as const;
      }

      const isVerified = await executeContractRead(
        publicClient,
        prepared.value,
      );
      if (isVerified.isErr()) throw isVerified.error;

      return isVerified.value ? ("VERIFIED" as const) : ("INVALID" as const);
    })(),
    () => "CONTRACT_READ_FAILED" as const,
  );
}
