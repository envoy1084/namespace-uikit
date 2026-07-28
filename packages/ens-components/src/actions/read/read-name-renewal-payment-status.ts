import { err, errAsync, ok, type Result, type ResultAsync } from "neverthrow";
import { erc20Abi, type Address, type ContractFunctionParameters, type PublicClient } from "viem";

import {
  executeContractReads,
  type PreparedContractRead,
  type PreparedContractReadPlan,
} from "#/actions/read/contract-reads";
import type {
  NameRenewalPriceReadError,
  PreparedNameRenewalPriceRead,
  PrepareNameRenewalPriceReadError,
} from "#/actions/read/read-name-renewal-price";
import { prepareNameRenewalPriceRead } from "#/actions/read/read-name-renewal-price";
import { isNonZeroAddress } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";

export type PrepareNameRenewalPaymentStatusReadError =
  | "INVALID_ACCOUNT_ADDRESS"
  | PrepareNameRenewalPriceReadError;

export type NameRenewalPaymentStatusReadError = "CONTRACT_READ_FAILED" | NameRenewalPriceReadError;

export interface PrepareNameRenewalPaymentStatusReadParameters {
  readonly account: Address;
  readonly duration: bigint;
  readonly ethRegistryAddress: Address;
  readonly input: string | null | undefined;
  readonly paymentTokenAddress: Address;
  readonly registrarAddress: Address;
}

export interface NameRenewalPaymentStatus {
  readonly allowance: bigint;
  readonly balance: bigint;
  readonly currentExpiry: bigint;
  readonly decimals: number;
  readonly duration: bigint;
  readonly hasSufficientAllowance: boolean;
  readonly hasSufficientBalance: boolean;
  readonly newExpiry: bigint;
  readonly total: bigint;
}

type TokenBalanceRequest = ContractFunctionParameters<
  typeof erc20Abi,
  "view",
  "balanceOf",
  readonly [Address]
>;

type TokenAllowanceRequest = ContractFunctionParameters<
  typeof erc20Abi,
  "view",
  "allowance",
  readonly [Address, Address]
>;

type RenewalPaymentStatusReads = readonly [
  ...PreparedNameRenewalPriceRead["reads"],
  PreparedContractRead<
    TokenBalanceRequest,
    bigint,
    "payment-token-balance",
    { readonly account: Address; readonly paymentTokenAddress: Address }
  >,
  PreparedContractRead<
    TokenAllowanceRequest,
    bigint,
    "name-renewal-payment-allowance",
    {
      readonly account: Address;
      readonly paymentTokenAddress: Address;
      readonly registrarAddress: Address;
    }
  >,
];

export type PreparedNameRenewalPaymentStatusRead = PreparedContractReadPlan<
  RenewalPaymentStatusReads,
  NameRenewalPaymentStatus,
  NameRenewalPaymentStatusReadError,
  "name-renewal-payment-status"
>;

export type ReadNameRenewalPaymentStatusParameters = PrepareNameRenewalPaymentStatusReadParameters;
export type ReadNameRenewalPaymentStatusReturnType = NameRenewalPaymentStatus;
export type ReadNameRenewalPaymentStatusErrorType =
  | PrepareNameRenewalPaymentStatusReadError
  | NameRenewalPaymentStatusReadError
  | ParseNameInputError;

export function prepareNameRenewalPaymentStatusRead(
  parameters: PrepareNameRenewalPaymentStatusReadParameters,
): Result<
  PreparedNameRenewalPaymentStatusRead,
  PrepareNameRenewalPaymentStatusReadError | ParseNameInputError
> {
  if (!isNonZeroAddress(parameters.account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  const price = prepareNameRenewalPriceRead(parameters);
  if (price.isErr()) return err(price.error);

  const reads = [
    ...price.value.reads,
    {
      kind: "payment-token-balance",
      metadata: {
        account: parameters.account,
        paymentTokenAddress: parameters.paymentTokenAddress,
      },
      request: {
        address: parameters.paymentTokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [parameters.account],
      },
    },
    {
      kind: "name-renewal-payment-allowance",
      metadata: {
        account: parameters.account,
        paymentTokenAddress: parameters.paymentTokenAddress,
        registrarAddress: parameters.registrarAddress,
      },
      request: {
        address: parameters.paymentTokenAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [parameters.account, parameters.registrarAddress],
      },
    },
  ] as const satisfies RenewalPaymentStatusReads;

  return ok({
    kind: "name-renewal-payment-status",
    reads,
    select: ([renewable, expiry, priceResult, decimals, balance, allowance]) => {
      if (
        renewable.status === "failure" ||
        expiry.status === "failure" ||
        priceResult.status === "failure" ||
        decimals.status === "failure" ||
        balance.status === "failure" ||
        allowance.status === "failure"
      ) {
        return err("CONTRACT_READ_FAILED");
      }
      if (!renewable.result) return err("NAME_NOT_RENEWABLE");

      return ok({
        allowance: allowance.result,
        balance: balance.result,
        currentExpiry: expiry.result,
        decimals: decimals.result,
        duration: parameters.duration,
        hasSufficientAllowance: allowance.result >= priceResult.result,
        hasSufficientBalance: balance.result >= priceResult.result,
        newExpiry: expiry.result + parameters.duration,
        total: priceResult.result,
      });
    },
  });
}

/** Reads price, balance, and allowance state for a name renewal. */
export function readNameRenewalPaymentStatus(
  publicClient: PublicClient,
  parameters: ReadNameRenewalPaymentStatusParameters,
): ResultAsync<ReadNameRenewalPaymentStatusReturnType, ReadNameRenewalPaymentStatusErrorType> {
  const prepared = prepareNameRenewalPaymentStatusRead(parameters);
  if (prepared.isErr()) return errAsync(prepared.error);
  return executeContractReads(publicClient, prepared.value);
}
