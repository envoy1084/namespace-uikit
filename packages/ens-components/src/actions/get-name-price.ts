import { errAsync, ResultAsync } from "neverthrow";
import { isAddress, type Address, type PublicClient } from "viem";

import type { EnsNetwork } from "../data";
import { ethRegistrarGetRegisterPriceSnippet } from "../data/abi";
import {
  isNameAvailable,
  type IsNameAvailableError,
} from "./is-name-available";
import { parseNameInput, type ParseNameInputError } from "./parse-name-input";

const MAX_UINT64 = (1n << 64n) - 1n;

export type GetNamePriceError =
  | "INVALID_DURATION"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "NAME_NOT_AVAILABLE"
  | "CONTRACT_READ_FAILED";

export interface GetNamePriceProps {
  /** Registration duration in seconds. */
  readonly duration: bigint;
  /** Label or ENS name to normalize and price. */
  readonly input: string | null | undefined;
  /** Network associated with the supplied contract addresses. */
  readonly network: EnsNetwork;
  /** ERC-20 token used to pay for registration. */
  readonly paymentTokenAddress: Address;
  /** ENSv2 ETHRegistrar address on the supplied network. */
  readonly registrarAddress: Address;
}

export interface NamePrice {
  /** Registration price excluding any expiry premium. */
  readonly base: bigint;
  /** Additional premium for a recently expired name. */
  readonly premium: bigint;
  /** Total payment-token amount required for registration. */
  readonly total: bigint;
}

/**
 * Gets the current ENSv2 registration price for an available second-level
 * `.eth` name.
 *
 * Amounts are returned in the payment token's atomic units. All contract
 * configuration is explicit and no values are derived from the public client.
 */
export function getNamePrice(
  publicClient: PublicClient,
  props: GetNamePriceProps,
): ResultAsync<
  NamePrice,
  GetNamePriceError | IsNameAvailableError | ParseNameInputError
> {
  const { duration, input, network, paymentTokenAddress, registrarAddress } =
    props;
  const parsedInput = parseNameInput(input);

  if (parsedInput.isErr()) {
    return errAsync(parsedInput.error);
  }

  if (duration <= 0n || duration > MAX_UINT64) {
    return errAsync("INVALID_DURATION");
  }

  if (!isAddress(paymentTokenAddress)) {
    return errAsync("INVALID_PAYMENT_TOKEN_ADDRESS");
  }

  return isNameAvailable(publicClient, {
    input,
    network,
    registrarAddress,
  }).andThen((available) => {
    if (!available) {
      return errAsync("NAME_NOT_AVAILABLE" as const);
    }

    return ResultAsync.fromPromise(
      publicClient.readContract({
        address: registrarAddress,
        abi: ethRegistrarGetRegisterPriceSnippet,
        functionName: "getRegisterPrice",
        args: [parsedInput.value.label, duration, paymentTokenAddress],
      }),
      () => "CONTRACT_READ_FAILED" as const,
    ).map(([base, premium]) => ({
      base,
      premium,
      total: base + premium,
    }));
  });
}
