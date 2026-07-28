import { err, errAsync, ok, type Result, type ResultAsync } from "neverthrow";
import { erc20Abi, type Address, type ContractFunctionParameters, type PublicClient } from "viem";

import {
  executeContractReads,
  type PreparedContractRead,
  type PreparedContractReadPlan,
} from "#/actions/read/contract-reads";
import {
  prepareNameAvailabilityRead,
  type PrepareNameAvailabilityReadError,
  type PreparedNameAvailabilityRead,
} from "#/actions/read/read-name-availability";
import { ethRegistrarAbi } from "#/data/abi";
import { isNonZeroAddress, isUint64Duration } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";

export type PrepareNameRegistrationPriceReadError =
  | "INVALID_DURATION"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | PrepareNameAvailabilityReadError;

export type NameRegistrationPriceReadError = "CONTRACT_READ_FAILED" | "NAME_NOT_AVAILABLE";

export interface PrepareNameRegistrationPriceReadParameters {
  /** Registration duration in seconds. */
  readonly duration: bigint;
  /** Label or ENS name to normalize and price. */
  readonly input: string | null | undefined;
  /** ERC-20 token used to pay for registration. */
  readonly paymentTokenAddress: Address;
  /** ENS v2 ETHRegistrar address. */
  readonly registrarAddress: Address;
}

export interface NameRegistrationPrice {
  /** Registration price excluding any expiry premium. */
  readonly base: bigint;
  /** Number of decimal places used by the payment token. */
  readonly decimals: number;
  /** Additional premium for a recently expired name. */
  readonly premium: bigint;
  /** Total payment-token amount required for registration. */
  readonly total: bigint;
}

type NameRegistrationPriceRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "view",
  "getRegisterPrice",
  readonly [string, bigint, Address]
>;

type TokenDecimalsRequest = ContractFunctionParameters<typeof erc20Abi, "view", "decimals">;

type PreparedNameRegistrationPriceContractRead = PreparedContractRead<
  NameRegistrationPriceRequest,
  readonly [bigint, bigint],
  "name-registration-price",
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

type NameRegistrationPriceReads = readonly [
  PreparedNameAvailabilityRead,
  PreparedNameRegistrationPriceContractRead,
  PreparedTokenDecimalsRead,
];

export type PreparedNameRegistrationPriceRead = PreparedContractReadPlan<
  NameRegistrationPriceReads,
  NameRegistrationPrice,
  NameRegistrationPriceReadError,
  "name-registration-price"
>;

export type ReadNameRegistrationPriceParameters = PrepareNameRegistrationPriceReadParameters;
export type ReadNameRegistrationPriceReturnType = NameRegistrationPrice;
export type ReadNameRegistrationPriceErrorType =
  | PrepareNameRegistrationPriceReadError
  | NameRegistrationPriceReadError
  | ParseNameInputError;

/**
 * Validates name-pricing inputs and prepares one multicall read plan.
 */
export function prepareNameRegistrationPriceRead(
  parameters: PrepareNameRegistrationPriceReadParameters,
): Result<
  PreparedNameRegistrationPriceRead,
  PrepareNameRegistrationPriceReadError | ParseNameInputError
> {
  const { duration, paymentTokenAddress, registrarAddress } = parameters;
  if (!isUint64Duration(duration)) {
    return err("INVALID_DURATION");
  }

  if (!isNonZeroAddress(paymentTokenAddress)) {
    return err("INVALID_PAYMENT_TOKEN_ADDRESS");
  }

  const availability = prepareNameAvailabilityRead({
    input: parameters.input,
    registrarAddress,
  });
  if (availability.isErr()) return err(availability.error);

  const label = availability.value.metadata.label;
  const reads = [
    availability.value,
    {
      kind: "name-registration-price",
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
  ] as const satisfies NameRegistrationPriceReads;

  return ok({
    kind: "name-registration-price",
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

/** Reads the registration price for an available second-level `.eth` name. */
export function readNameRegistrationPrice(
  publicClient: PublicClient,
  parameters: ReadNameRegistrationPriceParameters,
): ResultAsync<ReadNameRegistrationPriceReturnType, ReadNameRegistrationPriceErrorType> {
  const prepared = prepareNameRegistrationPriceRead(parameters);
  if (prepared.isErr()) return errAsync(prepared.error);
  return executeContractReads(publicClient, prepared.value);
}
