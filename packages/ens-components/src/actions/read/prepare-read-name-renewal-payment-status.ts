import type {
  PreparedContractRead,
  PreparedContractReadPlan,
} from "#/actions/read/contract-reads";
import type {
  NameRenewalPriceReadError,
  PreparedNameRenewalPriceRead,
  PrepareNameRenewalPriceReadError,
} from "#/actions/read/prepare-read-name-renewal-price";
import type { EnsNetwork } from "#/data";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { err, ok, type Result } from "neverthrow";
import { erc20Abi, type Address, type ContractFunctionParameters } from "viem";

import { prepareNameRenewalPriceRead } from "#/actions/read/prepare-read-name-renewal-price";
import { isNonZeroAddress } from "#/lib/helpers";

export type PrepareNameRenewalPaymentStatusReadError =
  | "INVALID_ACCOUNT_ADDRESS"
  | PrepareNameRenewalPriceReadError;

export type NameRenewalPaymentStatusReadError =
  | "CONTRACT_READ_FAILED"
  | NameRenewalPriceReadError;

export interface PrepareNameRenewalPaymentStatusReadProps {
  readonly account: Address;
  readonly duration: bigint;
  readonly ethRegistryAddress: Address;
  readonly input: string | null | undefined;
  readonly network: EnsNetwork;
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

export function prepareNameRenewalPaymentStatusRead(
  props: PrepareNameRenewalPaymentStatusReadProps,
): Result<
  PreparedNameRenewalPaymentStatusRead,
  PrepareNameRenewalPaymentStatusReadError | ParseNameInputError
> {
  if (!isNonZeroAddress(props.account)) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  const price = prepareNameRenewalPriceRead(props);
  if (price.isErr()) return err(price.error);

  const reads = [
    ...price.value.reads,
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
      kind: "name-renewal-payment-allowance",
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
  ] as const satisfies RenewalPaymentStatusReads;

  return ok({
    kind: "name-renewal-payment-status",
    reads,
    select: ([
      renewable,
      expiry,
      priceResult,
      decimals,
      balance,
      allowance,
    ]) => {
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
        duration: props.duration,
        hasSufficientAllowance: allowance.result >= priceResult.result,
        hasSufficientBalance: balance.result >= priceResult.result,
        newExpiry: expiry.result + props.duration,
        total: priceResult.result,
      });
    },
  });
}
