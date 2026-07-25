import { errAsync, ResultAsync } from "neverthrow";
import { isAddress, type Address, type PublicClient } from "viem";

import type { EnsNetwork } from "../data";
import { ethRegistrarIsAvailableSnippet } from "../data/abi";
import { parseNameInput, type ParseNameInputError } from "./parse-name-input";

export type IsNameAvailableError =
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

  if (!isAddress(registrarAddress)) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  return ResultAsync.fromPromise(
    publicClient.readContract({
      address: registrarAddress,
      abi: ethRegistrarIsAvailableSnippet,
      functionName: "isAvailable",
      args: [parsedName.label],
    }),
    () => "CONTRACT_READ_FAILED" as const,
  );
}
