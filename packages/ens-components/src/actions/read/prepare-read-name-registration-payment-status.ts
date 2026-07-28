import { err, ok, type Result } from "neverthrow";
import { erc20Abi, type Address, type ContractFunctionParameters } from "viem";

import type { PreparedContractRead, PreparedContractReadPlan } from "#/actions/read/contract-reads";
import type {
  PreparedNameRegistrationPriceRead,
  PrepareNameRegistrationPriceReadError,
} from "#/actions/read/prepare-read-name-registration-price";
import { prepareNameRegistrationPriceRead } from "#/actions/read/prepare-read-name-registration-price";
import type { EnsNetwork } from "#/data";
import { isNonZeroAddress } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";

export type PrepareNameRegistrationPaymentStatusReadError =
  | "INVALID_ACCOUNT_ADDRESS"
  | PrepareNameRegistrationPriceReadError;

export type NameRegistrationPaymentStatusReadError = "CONTRACT_READ_FAILED" | "NAME_NOT_AVAILABLE";

export interface PrepareNameRegistrationPaymentStatusReadParameters {
  readonly account: Address;
  readonly duration: bigint;
  readonly input: string | null | undefined;
  readonly network: EnsNetwork;
  readonly paymentTokenAddress: Address;
  readonly registrarAddress: Address;
}

export interface NameRegistrationPaymentStatus {
  readonly allowance: bigint;
  readonly balance: bigint;
  readonly base: bigint;
  readonly decimals: number;
  readonly hasSufficientAllowance: boolean;
  readonly hasSufficientBalance: boolean;
  readonly premium: bigint;
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

type PreparedTokenBalanceRead = PreparedContractRead<
  TokenBalanceRequest,
  bigint,
  "payment-token-balance",
  { readonly account: Address; readonly paymentTokenAddress: Address }
>;

type PreparedTokenAllowanceRead = PreparedContractRead<
  TokenAllowanceRequest,
  bigint,
  "registration-payment-allowance",
  {
    readonly account: Address;
    readonly paymentTokenAddress: Address;
    readonly registrarAddress: Address;
  }
>;

type NameRegistrationPaymentStatusReads = readonly [
  ...PreparedNameRegistrationPriceRead["reads"],
  PreparedTokenBalanceRead,
  PreparedTokenAllowanceRead,
];

export type PreparedNameRegistrationPaymentStatusRead = PreparedContractReadPlan<
  NameRegistrationPaymentStatusReads,
  NameRegistrationPaymentStatus,
  NameRegistrationPaymentStatusReadError,
  "name-registration-payment-status"
>;

/**
 * Prepares an availability, price, decimals, balance, and allowance multicall.
 */
export function prepareNameRegistrationPaymentStatusRead(
  parameters: PrepareNameRegistrationPaymentStatusReadParameters,
): Result<
  PreparedNameRegistrationPaymentStatusRead,
  PrepareNameRegistrationPaymentStatusReadError | ParseNameInputError
> {
  if (!isNonZeroAddress(parameters.account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  const pricePlan = prepareNameRegistrationPriceRead(parameters);
  if (pricePlan.isErr()) return err(pricePlan.error);

  const reads = [
    ...pricePlan.value.reads,
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
      kind: "registration-payment-allowance",
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
  ] as const satisfies NameRegistrationPaymentStatusReads;

  return ok({
    kind: "name-registration-payment-status",
    reads,
    select: ([availability, price, tokenDecimals, balance, allowance]) => {
      if (
        availability.status === "failure" ||
        price.status === "failure" ||
        tokenDecimals.status === "failure" ||
        balance.status === "failure" ||
        allowance.status === "failure"
      ) {
        return err("CONTRACT_READ_FAILED");
      }

      if (!availability.result) return err("NAME_NOT_AVAILABLE");

      const [base, premium] = price.result;
      const total = base + premium;
      return ok({
        allowance: allowance.result,
        balance: balance.result,
        base,
        decimals: tokenDecimals.result,
        hasSufficientAllowance: allowance.result >= total,
        hasSufficientBalance: balance.result >= total,
        premium,
        total,
      });
    },
  });
}
