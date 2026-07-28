import { err, ok, type Result } from "neverthrow";
import { encodeFunctionData, erc20Abi, type Address, type ContractFunctionParameters } from "viem";

import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import type { EnsNetwork } from "#/data";
import { isNonZeroAddress } from "#/lib/helpers";

export type PreparePaymentTokenApprovalWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_APPROVAL_AMOUNT"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_SPENDER_ADDRESS";

export interface PreparePaymentTokenApprovalWriteParameters {
  /** Account that owns the payment tokens. */
  readonly account: Address;
  /** Atomic token amount to approve. */
  readonly amount: bigint;
  /** Network associated with the supplied contract addresses. */
  readonly network: EnsNetwork;
  /** ERC-20 token that grants the allowance. */
  readonly paymentTokenAddress: Address;
  /** Contract authorized to spend the payment tokens. */
  readonly spenderAddress: Address;
}

type PaymentTokenApprovalRequest = ContractFunctionParameters<
  typeof erc20Abi,
  "nonpayable",
  "approve",
  readonly [Address, bigint]
>;

export interface PaymentTokenApprovalWriteMetadata {
  readonly amount: bigint;
  readonly paymentTokenAddress: Address;
  readonly spenderAddress: Address;
}

export type PreparedPaymentTokenApprovalWrite = PreparedContractWrite<
  PaymentTokenApprovalRequest,
  "approve-payment-token",
  PaymentTokenApprovalWriteMetadata
>;

/** Validates and prepares an ERC-20 allowance write. */
export function preparePaymentTokenApprovalWrite(
  parameters: PreparePaymentTokenApprovalWriteParameters,
): Result<PreparedPaymentTokenApprovalWrite, PreparePaymentTokenApprovalWriteError> {
  const { account, amount, paymentTokenAddress, spenderAddress } = parameters;
  if (!isNonZeroAddress(account)) return err("INVALID_ACCOUNT_ADDRESS");
  if (!isNonZeroAddress(paymentTokenAddress)) {
    return err("INVALID_PAYMENT_TOKEN_ADDRESS");
  }
  if (!isNonZeroAddress(spenderAddress)) {
    return err("INVALID_SPENDER_ADDRESS");
  }
  if (amount <= 0n) return err("INVALID_APPROVAL_AMOUNT");

  const request = {
    address: paymentTokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [spenderAddress, amount],
  } as const satisfies PaymentTokenApprovalRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: paymentTokenAddress,
      value: 0n,
    },
    kind: "approve-payment-token",
    metadata: { amount, paymentTokenAddress, spenderAddress },
    request,
  });
}
