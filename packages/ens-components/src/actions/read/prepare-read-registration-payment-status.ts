import type {
  PreparedContractRead,
  PreparedContractReadPlan,
} from "#/actions/read/contract-reads";
import type {
  PreparedNamePriceRead,
  PrepareNamePriceReadError,
} from "#/actions/read/prepare-read-name-price";
import type { EnsNetwork } from "#/data";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { err, ok, type Result } from "neverthrow";
import {
  erc20Abi,
  isAddress,
  zeroAddress,
  type Address,
  type ContractFunctionParameters,
} from "viem";

import { prepareNamePriceRead } from "#/actions/read/prepare-read-name-price";

export type PrepareRegistrationPaymentStatusReadError =
  | "INVALID_ACCOUNT_ADDRESS"
  | PrepareNamePriceReadError;

export type RegistrationPaymentStatusReadError =
  | "CONTRACT_READ_FAILED"
  | "NAME_NOT_AVAILABLE";

export interface PrepareRegistrationPaymentStatusReadProps {
  readonly account: Address;
  readonly duration: bigint;
  readonly input: string | null | undefined;
  readonly network: EnsNetwork;
  readonly paymentTokenAddress: Address;
  readonly registrarAddress: Address;
}

export interface RegistrationPaymentStatus {
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

type RegistrationPaymentStatusReads = readonly [
  ...PreparedNamePriceRead["reads"],
  PreparedTokenBalanceRead,
  PreparedTokenAllowanceRead,
];

export type PreparedRegistrationPaymentStatusRead = PreparedContractReadPlan<
  RegistrationPaymentStatusReads,
  RegistrationPaymentStatus,
  RegistrationPaymentStatusReadError,
  "registration-payment-status"
>;

/**
 * Prepares an availability, price, decimals, balance, and allowance multicall.
 */
export function prepareRegistrationPaymentStatusRead(
  props: PrepareRegistrationPaymentStatusReadProps,
): Result<
  PreparedRegistrationPaymentStatusRead,
  PrepareRegistrationPaymentStatusReadError | ParseNameInputError
> {
  if (!isAddress(props.account) || props.account === zeroAddress) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  const pricePlan = prepareNamePriceRead(props);
  if (pricePlan.isErr()) return err(pricePlan.error);

  const reads = [
    ...pricePlan.value.reads,
    {
      kind: "payment-token-balance",
      metadata: {
        account: props.account,
        paymentTokenAddress: props.paymentTokenAddress,
      },
      request: {
        address: props.paymentTokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [props.account],
      },
    },
    {
      kind: "registration-payment-allowance",
      metadata: {
        account: props.account,
        paymentTokenAddress: props.paymentTokenAddress,
        registrarAddress: props.registrarAddress,
      },
      request: {
        address: props.paymentTokenAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [props.account, props.registrarAddress],
      },
    },
  ] as const satisfies RegistrationPaymentStatusReads;

  return ok({
    kind: "registration-payment-status",
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
