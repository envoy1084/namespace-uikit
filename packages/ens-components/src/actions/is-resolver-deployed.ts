import type { EnsNetwork } from "#/data";

import { errAsync, ResultAsync } from "neverthrow";
import { isAddress, zeroAddress, type Address, type PublicClient } from "viem";

export type IsResolverDeployedError =
  | "CONTRACT_READ_FAILED"
  | "INVALID_RESOLVER_ADDRESS";

export interface IsResolverDeployedProps {
  readonly network: EnsNetwork;
  readonly resolverAddress: Address;
}

/** Checks whether a custom resolver address contains deployed bytecode. */
export function isResolverDeployed(
  publicClient: PublicClient,
  props: IsResolverDeployedProps,
): ResultAsync<boolean, IsResolverDeployedError> {
  if (
    !isAddress(props.resolverAddress) ||
    props.resolverAddress === zeroAddress
  ) {
    return errAsync("INVALID_RESOLVER_ADDRESS");
  }

  return ResultAsync.fromPromise(
    publicClient.getCode({ address: props.resolverAddress }),
    () => "CONTRACT_READ_FAILED" as const,
  ).map((bytecode) => bytecode !== undefined && bytecode !== "0x");
}
