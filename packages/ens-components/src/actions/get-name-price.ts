import type { EnsNetwork } from "#/data";

import { err, errAsync, ok, ResultAsync } from "neverthrow";
import {
  erc20Abi,
  isAddress,
  zeroAddress,
  type Address,
  type PublicClient,
} from "viem";

import {
  parseNameInput,
  type ParseNameInputError,
} from "#/actions/parse-name-input";
import { ethRegistrarAbi } from "#/data/abi";

const MAX_UINT64 = (1n << 64n) - 1n;

export type GetNamePriceError =
  | "INVALID_DURATION"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS"
  | "LABEL_TOO_SHORT"
  | "NAME_NOT_AVAILABLE"
  | "UNSUPPORTED_NAME"
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
  /** Number of decimal places used by the payment token. */
  readonly decimals: number;
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
): ResultAsync<NamePrice, GetNamePriceError | ParseNameInputError> {
  const { duration, input, paymentTokenAddress, registrarAddress } = props;
  const parsedInput = parseNameInput(input);

  if (parsedInput.isErr()) {
    return errAsync(parsedInput.error);
  }

  if (duration <= 0n || duration > MAX_UINT64) {
    return errAsync("INVALID_DURATION");
  }

  if (parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth") {
    return errAsync("UNSUPPORTED_NAME");
  }

  if ([...parsedInput.value.label].length < 3) {
    return errAsync("LABEL_TOO_SHORT");
  }

  if (!isAddress(registrarAddress) || registrarAddress === zeroAddress) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  if (!isAddress(paymentTokenAddress) || paymentTokenAddress === zeroAddress) {
    return errAsync("INVALID_PAYMENT_TOKEN_ADDRESS");
  }

  const label = parsedInput.value.label;

  return ResultAsync.fromPromise(
    publicClient.multicall({
      allowFailure: true,
      contracts: [
        {
          address: registrarAddress,
          abi: ethRegistrarAbi,
          functionName: "isAvailable",
          args: [label],
        },
        {
          address: registrarAddress,
          abi: ethRegistrarAbi,
          functionName: "getRegisterPrice",
          args: [label, duration, paymentTokenAddress],
        },
        {
          address: paymentTokenAddress,
          abi: erc20Abi,
          functionName: "decimals",
        },
      ],
    }),
    () => "CONTRACT_READ_FAILED" as const,
  ).andThen(([availability, price, tokenDecimals]) => {
    if (availability.status === "failure") {
      return err("CONTRACT_READ_FAILED" as const);
    }

    if (!availability.result) {
      return err("NAME_NOT_AVAILABLE" as const);
    }

    if (price.status === "failure" || tokenDecimals.status === "failure") {
      return err("CONTRACT_READ_FAILED" as const);
    }

    const [base, premium] = price.result;

    return ok({
      base,
      decimals: tokenDecimals.result,
      premium,
      total: base + premium,
    });
  });
}
