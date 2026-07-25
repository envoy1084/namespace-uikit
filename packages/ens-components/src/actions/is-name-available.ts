import { errAsync, ResultAsync } from "neverthrow";
import { isAddress, type Address, type PublicClient } from "viem";

import type { EnsNetwork } from "../data";
import { ethRegistrarIsAvailableSnippet } from "../data/abi";

const MAX_LABEL_BYTES = 255;
const UTF8_ENCODER = new TextEncoder();

export type IsNameAvailableError =
  | "INVALID_LABEL"
  | "INVALID_REGISTRAR_ADDRESS"
  | "CONTRACT_READ_FAILED";

export interface IsNameAvailableProps {
  /** Normalized label without `.eth`. */
  readonly label: string;
  /** Network associated with the supplied registrar address. */
  readonly network: EnsNetwork;
  /** ENSv2 ETHRegistrar address on the supplied network. */
  readonly registrarAddress: Address;
}

/**
 * Checks a normalized label directly against the supplied ENSv2 ETHRegistrar.
 *
 * All contract configuration is explicit. This action does not read React
 * context, derive a network from the public client, normalize names, debounce,
 * or cache.
 */
export function isNameAvailable(
  publicClient: PublicClient,
  props: IsNameAvailableProps,
): ResultAsync<boolean, IsNameAvailableError> {
  const { label, registrarAddress } = props;
  const labelLength = UTF8_ENCODER.encode(label).byteLength;

  if (
    labelLength === 0 ||
    labelLength > MAX_LABEL_BYTES ||
    label.includes(".")
  ) {
    return errAsync("INVALID_LABEL");
  }

  if (!isAddress(registrarAddress)) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  return ResultAsync.fromPromise(
    publicClient.readContract({
      address: registrarAddress,
      abi: ethRegistrarIsAvailableSnippet,
      functionName: "isAvailable",
      args: [label],
    }),
    () => "CONTRACT_READ_FAILED" as const,
  );
}
