import type { EnsNetwork } from "#/data";

import { errAsync, ResultAsync } from "neverthrow";
import { isAddress, zeroAddress, type Address, type PublicClient } from "viem";

import {
  parseNameInput,
  type ParseNameInputError,
} from "#/actions/parse-name-input";
import { ethRegistrarAbi } from "#/data/abi";

export type IsNameAvailableError =
  | "LABEL_TOO_SHORT"
  | "UNSUPPORTED_NAME"
  | "INVALID_REGISTRAR_ADDRESS"
  | "CONTRACT_READ_FAILED";

export interface IsNameAvailableProps {
  /** Label or ENS name to normalize and check. */
  readonly input: string | null | undefined;
  /** Network associated with the supplied registrar address. */
  readonly network: EnsNetwork;
  /** ENSv2 ETHRegistrar address on the supplied network. */
  readonly registrarAddress: Address;
}

/**
 * Parses a label or ENS name and checks it against the supplied ENSv2
 * ETHRegistrar.
 *
 * All contract configuration is explicit. This action does not read React
 * context, derive a network from the public client, debounce, or cache.
 */
export function isNameAvailable(
  publicClient: PublicClient,
  props: IsNameAvailableProps,
): ResultAsync<boolean, IsNameAvailableError | ParseNameInputError> {
  const { input, registrarAddress } = props;
  const parsedInput = parseNameInput(input);

  if (parsedInput.isErr()) {
    return errAsync(parsedInput.error);
  }

  const parsedName = parsedInput.value;

  if (parsedName.nameLevel !== 2 || parsedName.tld !== "eth") {
    return errAsync("UNSUPPORTED_NAME");
  }

  if ([...parsedName.label].length < 3) {
    return errAsync("LABEL_TOO_SHORT");
  }

  if (!isAddress(registrarAddress) || registrarAddress === zeroAddress) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  return ResultAsync.fromPromise(
    publicClient.readContract({
      address: registrarAddress,
      abi: ethRegistrarAbi,
      functionName: "isAvailable",
      args: [parsedName.label],
    }),
    () => "CONTRACT_READ_FAILED" as const,
  );
}
