import type { PreparedContractRead } from "#/actions/read/contract-reads";
import type { EnsNetwork } from "#/data";

import { err, ok, type Result } from "neverthrow";
import { type Address, type ContractFunctionParameters } from "viem";

import { verifiableFactoryAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";

export type PreparePermissionedResolverVerificationReadError =
  | "INVALID_FACTORY_ADDRESS"
  | "INVALID_IMPLEMENTATION_ADDRESS"
  | "INVALID_RESOLVER_ADDRESS";

export interface PreparePermissionedResolverVerificationReadProps {
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

/** Validates and prepares a VerifiableFactory implementation check. */
export function preparePermissionedResolverVerificationRead(
  props: PreparePermissionedResolverVerificationReadProps,
): Result<
  PreparedPermissionedResolverVerificationRead,
  PreparePermissionedResolverVerificationReadError
> {
  if (!isNonZeroAddress(props.factoryAddress)) {
    return err("INVALID_FACTORY_ADDRESS");
  }
  if (!isNonZeroAddress(props.implementationAddress)) {
    return err("INVALID_IMPLEMENTATION_ADDRESS");
  }
  if (!isNonZeroAddress(props.resolverAddress)) {
    return err("INVALID_RESOLVER_ADDRESS");
  }

  return ok({
    kind: "permissioned-resolver-verification",
    metadata: {
      implementationAddress: props.implementationAddress,
      resolverAddress: props.resolverAddress,
    },
    request: {
      address: props.factoryAddress,
      abi: verifiableFactoryAbi,
      functionName: "verifyContract",
      args: [props.resolverAddress, props.implementationAddress],
    },
  });
}
