import type {
  PreparedContractRead,
  PreparedContractReadPlan,
} from "#/actions/read/contract-reads";
import type { EnsNetwork } from "#/data";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { err, ok, type Result } from "neverthrow";
import { erc20Abi, type Address, type ContractFunctionParameters } from "viem";

import {
  prepareNameAvailabilityRead,
  type PrepareNameAvailabilityReadError,
  type PreparedNameAvailabilityRead,
} from "#/actions/read/prepare-read-name-availability";
import { ethRegistrarAbi } from "#/data/abi";
import { isNonZeroAddress, isUint64Duration } from "#/lib/helpers";

export type PrepareNamePriceReadError =
  | "INVALID_DURATION"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | PrepareNameAvailabilityReadError;

export type NamePriceReadError = "CONTRACT_READ_FAILED" | "NAME_NOT_AVAILABLE";

export interface PrepareNamePriceReadProps {
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

type NamePriceRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "view",
  "getRegisterPrice",
  readonly [string, bigint, Address]
>;

type TokenDecimalsRequest = ContractFunctionParameters<
  typeof erc20Abi,
  "view",
  "decimals"
>;

type PreparedNamePriceContractRead = PreparedContractRead<
  NamePriceRequest,
  readonly [bigint, bigint],
  "name-price",
  {
    readonly duration: bigint;
    readonly label: string;
    readonly paymentTokenAddress: Address;
  }
>;

type PreparedTokenDecimalsRead = PreparedContractRead<
  TokenDecimalsRequest,
  number,
  "payment-token-decimals",
  { readonly paymentTokenAddress: Address }
>;

type NamePriceReads = readonly [
  PreparedNameAvailabilityRead,
  PreparedNamePriceContractRead,
  PreparedTokenDecimalsRead,
];

export type PreparedNamePriceRead = PreparedContractReadPlan<
  NamePriceReads,
  NamePrice,
  NamePriceReadError,
  "name-price"
>;

/**
 * Validates name-pricing inputs and prepares one multicall read plan.
 */
export function prepareNamePriceRead(
  props: PrepareNamePriceReadProps,
): Result<
  PreparedNamePriceRead,
  PrepareNamePriceReadError | ParseNameInputError
> {
  const { duration, paymentTokenAddress, registrarAddress } = props;
  if (!isUint64Duration(duration)) {
    return err("INVALID_DURATION");
  }

  if (!isNonZeroAddress(paymentTokenAddress)) {
    return err("INVALID_PAYMENT_TOKEN_ADDRESS");
  }

  const availability = prepareNameAvailabilityRead({
    input: props.input,
    network: props.network,
    registrarAddress,
  });
  if (availability.isErr()) return err(availability.error);

  const label = availability.value.metadata.label;
  const reads = [
    availability.value,
    {
      kind: "name-price",
      metadata: { duration, label, paymentTokenAddress },
      request: {
        address: registrarAddress,
        abi: ethRegistrarAbi,
        functionName: "getRegisterPrice",
        args: [label, duration, paymentTokenAddress],
      },
    },
    {
      kind: "payment-token-decimals",
      metadata: { paymentTokenAddress },
      request: {
        address: paymentTokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
    },
  ] as const satisfies NamePriceReads;

  return ok({
    kind: "name-price",
    reads,
    select: ([availabilityResult, priceResult, tokenDecimalsResult]) => {
      if (
        availabilityResult.status === "failure" ||
        priceResult.status === "failure" ||
        tokenDecimalsResult.status === "failure"
      ) {
        return err("CONTRACT_READ_FAILED");
      }
      if (!availabilityResult.result) return err("NAME_NOT_AVAILABLE");

      const [base, premium] = priceResult.result;
      return ok({
        base,
        decimals: tokenDecimalsResult.result,
        premium,
        total: base + premium,
      });
    },
  });
}
