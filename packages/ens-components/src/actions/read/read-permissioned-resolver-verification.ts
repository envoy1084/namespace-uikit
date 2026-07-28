import { err, errAsync, ok, type Result, type ResultAsync } from "neverthrow";
import { type Address, type ContractFunctionParameters, type PublicClient } from "viem";

import { executeContractRead, type PreparedContractRead } from "#/actions/read/contract-reads";
import { verifiableFactoryAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";

export type PreparePermissionedResolverVerificationReadError =
  | "INVALID_FACTORY_ADDRESS"
  | "INVALID_IMPLEMENTATION_ADDRESS"
  | "INVALID_RESOLVER_ADDRESS";

export interface PreparePermissionedResolverVerificationReadParameters {
  readonly factoryAddress: Address;
  readonly implementationAddress: Address;
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

export type ReadPermissionedResolverVerificationParameters =
  PreparePermissionedResolverVerificationReadParameters;
export type ReadPermissionedResolverVerificationReturnType = boolean;
export type ReadPermissionedResolverVerificationErrorType =
  | PreparePermissionedResolverVerificationReadError
  | "CONTRACT_READ_FAILED";

/** Validates and prepares a VerifiableFactory implementation check. */
export function preparePermissionedResolverVerificationRead(
  parameters: PreparePermissionedResolverVerificationReadParameters,
): Result<
  PreparedPermissionedResolverVerificationRead,
  PreparePermissionedResolverVerificationReadError
> {
  if (!isNonZeroAddress(parameters.factoryAddress)) {
    return err("INVALID_FACTORY_ADDRESS");
  }
  if (!isNonZeroAddress(parameters.implementationAddress)) {
    return err("INVALID_IMPLEMENTATION_ADDRESS");
  }
  if (!isNonZeroAddress(parameters.resolverAddress)) {
    return err("INVALID_RESOLVER_ADDRESS");
  }

  return ok({
    kind: "permissioned-resolver-verification",
    metadata: {
      implementationAddress: parameters.implementationAddress,
      resolverAddress: parameters.resolverAddress,
    },
    request: {
      address: parameters.factoryAddress,
      abi: verifiableFactoryAbi,
      functionName: "verifyContract",
      args: [parameters.resolverAddress, parameters.implementationAddress],
    },
  });
}

/** Reads whether a resolver proxy was deployed from the expected implementation. */
export function readPermissionedResolverVerification(
  publicClient: PublicClient,
  parameters: ReadPermissionedResolverVerificationParameters,
): ResultAsync<
  ReadPermissionedResolverVerificationReturnType,
  ReadPermissionedResolverVerificationErrorType
> {
  const prepared = preparePermissionedResolverVerificationRead(parameters);
  if (prepared.isErr()) return errAsync(prepared.error);
  return executeContractRead(publicClient, prepared.value);
}
