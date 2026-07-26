import type { PreparedContractWrite } from "#/actions/contract-calls";
import type { EnsNetwork } from "#/data";

import { errAsync, ok, ResultAsync } from "neverthrow";
import {
  encodeFunctionData,
  isAddress,
  isHex,
  size,
  zeroAddress,
  type Address,
  type ContractFunctionParameters,
  type Hex,
  type PublicClient,
} from "viem";

import { permissionedResolverAbi, verifiableFactoryAbi } from "#/data/abi";

export const PERMISSIONED_RESOLVER_ALL_ROLES =
  0x1111111111111111111111111111111111111111111111111111111111111111n;

export type PreparePermissionedResolverDeploymentError =
  | "CONTRACT_SIMULATION_FAILED"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_FACTORY_ADDRESS"
  | "INVALID_IMPLEMENTATION_ADDRESS"
  | "INVALID_OWNER_ADDRESS"
  | "INVALID_RESOLVER_ADDRESS"
  | "INVALID_SALT";

export interface PreparePermissionedResolverDeploymentProps {
  /** Account that will call the factory. This affects the proxy address. */
  readonly account: Address;
  /** ENS VerifiableFactory address. */
  readonly factoryAddress: Address;
  /** Deployed PermissionedResolver implementation address. */
  readonly implementationAddress: Address;
  /** Network associated with the supplied addresses. */
  readonly network: EnsNetwork;
  /** Account receiving every resolver permission. */
  readonly owner: Address;
  /** Random bytes32 salt returned by `createResolverSalt`. */
  readonly salt: Hex;
}

type PermissionedResolverDeploymentRequest = ContractFunctionParameters<
  typeof verifiableFactoryAbi,
  "nonpayable",
  "deployProxy",
  readonly [Address, bigint, Hex]
>;

export interface PreparedPermissionedResolverDeploymentMetadata {
  readonly initData: Hex;
  readonly resolverAddress: Address;
  readonly salt: Hex;
}

export type PreparedPermissionedResolverDeployment = PreparedContractWrite<
  PermissionedResolverDeploymentRequest,
  "deploy-permissioned-resolver",
  PreparedPermissionedResolverDeploymentMetadata
>;

function isBytes32(value: Hex): boolean {
  return isHex(value) && size(value) === 32;
}

/**
 * Simulates a dedicated PermissionedResolver proxy deployment and returns the
 * exact address and encoded call required by sequential or atomic submission.
 */
export function preparePermissionedResolverDeployment(
  publicClient: PublicClient,
  props: PreparePermissionedResolverDeploymentProps,
): ResultAsync<
  PreparedPermissionedResolverDeployment,
  PreparePermissionedResolverDeploymentError
> {
  const { account, factoryAddress, implementationAddress, owner, salt } = props;

  if (!isAddress(account) || account === zeroAddress) {
    return errAsync("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isAddress(factoryAddress) || factoryAddress === zeroAddress) {
    return errAsync("INVALID_FACTORY_ADDRESS");
  }

  if (
    !isAddress(implementationAddress) ||
    implementationAddress === zeroAddress
  ) {
    return errAsync("INVALID_IMPLEMENTATION_ADDRESS");
  }

  if (!isAddress(owner) || owner === zeroAddress) {
    return errAsync("INVALID_OWNER_ADDRESS");
  }

  if (!isBytes32(salt)) {
    return errAsync("INVALID_SALT");
  }

  const initData = encodeFunctionData({
    abi: permissionedResolverAbi,
    functionName: "initialize",
    args: [owner, PERMISSIONED_RESOLVER_ALL_ROLES],
  });
  const saltValue = BigInt(salt);
  const data = encodeFunctionData({
    abi: verifiableFactoryAbi,
    functionName: "deployProxy",
    args: [implementationAddress, saltValue, initData],
  });
  const request = {
    address: factoryAddress,
    abi: verifiableFactoryAbi,
    functionName: "deployProxy",
    args: [implementationAddress, saltValue, initData],
  } as const satisfies PermissionedResolverDeploymentRequest;

  return ResultAsync.fromPromise(
    publicClient.simulateContract({
      account,
      address: factoryAddress,
      abi: verifiableFactoryAbi,
      functionName: "deployProxy",
      args: [implementationAddress, saltValue, initData],
    }),
    () => "CONTRACT_SIMULATION_FAILED" as const,
  ).andThen(({ result: resolverAddress }) => {
    if (!isAddress(resolverAddress) || resolverAddress === zeroAddress) {
      return errAsync("INVALID_RESOLVER_ADDRESS" as const);
    }

    return ok({
      account,
      call: {
        data,
        to: factoryAddress,
        value: 0n,
      },
      kind: "deploy-permissioned-resolver" as const,
      metadata: {
        initData,
        resolverAddress,
        salt,
      },
      request,
    });
  });
}
