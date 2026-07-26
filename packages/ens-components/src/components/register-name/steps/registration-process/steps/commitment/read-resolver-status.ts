import type { EnsNetwork } from "#/data";

import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { type Address, type PublicClient } from "viem";

import {
  executeContractRead,
  preparePermissionedResolverVerificationRead,
  type PreparePermissionedResolverVerificationReadError,
} from "#/actions";
import { isNonZeroAddress } from "#/lib/helpers";

export type PermissionedResolverStatus =
  | "INVALID"
  | "NOT_DEPLOYED"
  | "VERIFIED";

export interface ReadPermissionedResolverStatusProps {
  readonly factoryAddress: Address;
  readonly implementationAddress: Address;
  readonly network: EnsNetwork;
  readonly resolverAddress: Address;
}

export type ReadPermissionedResolverStatusError =
  | "CONTRACT_READ_FAILED"
  | PreparePermissionedResolverVerificationReadError;

export type IsResolverDeployedError =
  | "CONTRACT_READ_FAILED"
  | "INVALID_RESOLVER_ADDRESS";

export function isResolverDeployed(
  publicClient: PublicClient,
  resolverAddress: Address,
): ResultAsync<boolean, IsResolverDeployedError> {
  if (!isNonZeroAddress(resolverAddress)) {
    return errAsync("INVALID_RESOLVER_ADDRESS");
  }

  return ResultAsync.fromPromise(
    publicClient.getCode({ address: resolverAddress }),
    () => "CONTRACT_READ_FAILED" as const,
  ).map((bytecode) => bytecode !== undefined && bytecode !== "0x");
}

export function readPermissionedResolverStatus(
  publicClient: PublicClient,
  props: ReadPermissionedResolverStatusProps,
): ResultAsync<
  PermissionedResolverStatus,
  ReadPermissionedResolverStatusError
> {
  const prepared = preparePermissionedResolverVerificationRead(props);
  if (prepared.isErr()) return errAsync(prepared.error);

  return isResolverDeployed(publicClient, props.resolverAddress).andThen(
    (isDeployed) => {
      if (!isDeployed) return okAsync("NOT_DEPLOYED" as const);

      return executeContractRead(publicClient, prepared.value).map(
        (isVerified) =>
          isVerified ? ("VERIFIED" as const) : ("INVALID" as const),
      );
    },
  );
}
