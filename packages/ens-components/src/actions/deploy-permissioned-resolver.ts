import type { EnsNetwork } from "#/data";

import { errAsync, ResultAsync } from "neverthrow";
import {
  isAddress,
  isHex,
  size,
  zeroAddress,
  type Address,
  type Hex,
  type WalletClient,
} from "viem";

import { verifiableFactoryAbi } from "#/data/abi";

export type DeployPermissionedResolverError =
  | "CONTRACT_WRITE_FAILED"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_FACTORY_ADDRESS"
  | "INVALID_IMPLEMENTATION_ADDRESS"
  | "INVALID_INIT_DATA"
  | "INVALID_SALT";

export interface DeployPermissionedResolverProps {
  readonly account: Address;
  readonly factoryAddress: Address;
  readonly implementationAddress: Address;
  readonly initData: Hex;
  readonly network: EnsNetwork;
  readonly salt: Hex;
}

function isBytes32(value: Hex): boolean {
  return isHex(value) && size(value) === 32;
}

/** Submits a prepared PermissionedResolver proxy deployment. */
export function deployPermissionedResolver(
  walletClient: WalletClient,
  props: DeployPermissionedResolverProps,
): ResultAsync<Hex, DeployPermissionedResolverError> {
  const { account, factoryAddress, implementationAddress, initData, salt } =
    props;

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

  if (!isHex(initData) || size(initData) === 0) {
    return errAsync("INVALID_INIT_DATA");
  }

  if (!isBytes32(salt)) {
    return errAsync("INVALID_SALT");
  }

  return ResultAsync.fromPromise(
    walletClient.writeContract({
      account,
      address: factoryAddress,
      abi: verifiableFactoryAbi,
      chain: walletClient.chain,
      functionName: "deployProxy",
      args: [implementationAddress, BigInt(salt), initData],
    }),
    () => "CONTRACT_WRITE_FAILED" as const,
  );
}
