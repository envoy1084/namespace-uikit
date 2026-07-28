import type { PreparedContractRead } from "#/actions/read/contract-reads";
import type { EnsNetwork } from "#/data";

import { err, ok, type Result } from "neverthrow";
import { type Address, type ContractFunctionParameters, type Hex } from "viem";

import { permissionedResolverAbi } from "#/data/abi";
import { isNonZeroAddress } from "#/lib/helpers";

/** ERC-165 interface ID advertised by the deployed ENS v2 PermissionedResolver. */
export const PERMISSIONED_RESOLVER_INTERFACE_ID =
  "0x2c7442c9" as const satisfies Hex;

export type PreparePermissionedResolverSupportReadError =
  "INVALID_RESOLVER_ADDRESS";

export interface PreparePermissionedResolverSupportReadProps {
  readonly network: EnsNetwork;
  readonly resolverAddress: Address;
}

type PermissionedResolverSupportRequest = ContractFunctionParameters<
  typeof permissionedResolverAbi,
  "view",
  "supportsInterface",
  readonly [Hex]
>;

export type PreparedPermissionedResolverSupportRead = PreparedContractRead<
  PermissionedResolverSupportRequest,
  boolean,
  "permissioned-resolver-support",
  {
    readonly resolverAddress: Address;
  }
>;

/** Prepares an ERC-165 check for the ENS v2 PermissionedResolver interface. */
export function preparePermissionedResolverSupportRead(
  props: PreparePermissionedResolverSupportReadProps,
): Result<
  PreparedPermissionedResolverSupportRead,
  PreparePermissionedResolverSupportReadError
> {
  if (!isNonZeroAddress(props.resolverAddress)) {
    return err("INVALID_RESOLVER_ADDRESS");
  }

  return ok({
    kind: "permissioned-resolver-support",
    metadata: {
      resolverAddress: props.resolverAddress,
    },
    request: {
      address: props.resolverAddress,
      abi: permissionedResolverAbi,
      functionName: "supportsInterface",
      args: [PERMISSIONED_RESOLVER_INTERFACE_ID],
    },
  });
}
