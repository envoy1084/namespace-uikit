import { err, ok, type Result } from "neverthrow";
import { erc20Abi, type Address, type ContractFunctionParameters } from "viem";

import type { PreparedContractRead, PreparedContractReadPlan } from "#/actions/read/contract-reads";
import { ethRegistrarAbi, ethRegistryAbi } from "#/data/abi";
import { isNonZeroAddress, isUint64Duration } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";

export type PrepareNameRenewalPriceReadError =
  | "INVALID_DURATION"
  | "INVALID_ETH_REGISTRY_ADDRESS"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS"
  | "UNSUPPORTED_NAME";

export type NameRenewalPriceReadError = "CONTRACT_READ_FAILED" | "NAME_NOT_RENEWABLE";

export interface PrepareNameRenewalPriceReadParameters {
  /** Number of seconds added to the name's current expiry. */
  readonly duration: bigint;
  /** ENS v2 ETHRegistry address associated with the registrar. */
  readonly ethRegistryAddress: Address;
  /** Label or second-level `.eth` name to normalize and quote. */
  readonly input: string | null | undefined;
  /** ERC-20 token used to pay for renewal. */
  readonly paymentTokenAddress: Address;
  /** ENS v2 ETHRegistrar address. */
  readonly registrarAddress: Address;
}

export interface NameRenewalPrice {
  /** Current onchain expiry timestamp in seconds. */
  readonly currentExpiry: bigint;
  /** Number of decimal places used by the payment token. */
  readonly decimals: number;
  /** Number of seconds that will be added to the current expiry. */
  readonly duration: bigint;
  /** Resulting expiry timestamp in seconds. */
  readonly newExpiry: bigint;
  /** Total payment-token amount required for renewal. */
  readonly total: bigint;
}

type RenewableRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "view",
  "isRenewable",
  readonly [string]
>;

type ExpiryRequest = ContractFunctionParameters<
  typeof ethRegistryAbi,
  "view",
  "findExpiry",
  readonly [string]
>;

type RenewalPriceRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "view",
  "getRenewPrice",
  readonly [string, bigint, Address]
>;

type TokenDecimalsRequest = ContractFunctionParameters<typeof erc20Abi, "view", "decimals">;

type RenewalPriceReads = readonly [
  PreparedContractRead<RenewableRequest, boolean, "name-renewable", { readonly label: string }>,
  PreparedContractRead<ExpiryRequest, bigint, "name-expiry", { readonly label: string }>,
  PreparedContractRead<
    RenewalPriceRequest,
    bigint,
    "name-renewal-price",
    {
      readonly duration: bigint;
      readonly label: string;
      readonly paymentTokenAddress: Address;
    }
  >,
  PreparedContractRead<
    TokenDecimalsRequest,
    number,
    "payment-token-decimals",
    { readonly paymentTokenAddress: Address }
  >,
];

export type PreparedNameRenewalPriceRead = PreparedContractReadPlan<
  RenewalPriceReads,
  NameRenewalPrice,
  NameRenewalPriceReadError,
  "name-renewal-price"
>;

export function prepareNameRenewalPriceRead(
  parameters: PrepareNameRenewalPriceReadParameters,
): Result<PreparedNameRenewalPriceRead, PrepareNameRenewalPriceReadError | ParseNameInputError> {
  const { duration, ethRegistryAddress, paymentTokenAddress, registrarAddress } = parameters;
  if (!isUint64Duration(duration)) return err("INVALID_DURATION");
  if (!isNonZeroAddress(ethRegistryAddress)) {
    return err("INVALID_ETH_REGISTRY_ADDRESS");
  }
  if (!isNonZeroAddress(paymentTokenAddress)) {
    return err("INVALID_PAYMENT_TOKEN_ADDRESS");
  }
  if (!isNonZeroAddress(registrarAddress)) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }

  const parsedInput = parseNameInput(parameters.input);
  if (parsedInput.isErr()) return err(parsedInput.error);
  if (parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth") {
    return err("UNSUPPORTED_NAME");
  }

  const label = parsedInput.value.label;
  const reads = [
    {
      kind: "name-renewable",
      metadata: { label },
      request: {
        address: registrarAddress,
        abi: ethRegistrarAbi,
        functionName: "isRenewable",
        args: [label],
      },
    },
    {
      kind: "name-expiry",
      metadata: { label },
      request: {
        address: ethRegistryAddress,
        abi: ethRegistryAbi,
        functionName: "findExpiry",
        args: [label],
      },
    },
    {
      kind: "name-renewal-price",
      metadata: { duration, label, paymentTokenAddress },
      request: {
        address: registrarAddress,
        abi: ethRegistrarAbi,
        functionName: "getRenewPrice",
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
  ] as const satisfies RenewalPriceReads;

  return ok({
    kind: "name-renewal-price",
    reads,
    select: ([renewable, expiry, price, decimals]) => {
      if (
        renewable.status === "failure" ||
        expiry.status === "failure" ||
        decimals.status === "failure"
      ) {
        return err("CONTRACT_READ_FAILED");
      }
      if (!renewable.result) return err("NAME_NOT_RENEWABLE");
      if (price.status === "failure") return err("CONTRACT_READ_FAILED");

      return ok({
        currentExpiry: expiry.result,
        decimals: decimals.result,
        duration,
        newExpiry: expiry.result + duration,
        total: price.result,
      });
    },
  });
}
