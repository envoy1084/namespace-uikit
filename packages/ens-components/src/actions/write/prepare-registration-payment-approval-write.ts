import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import type { EnsNetwork } from "#/data";

import { err, ok, type Result } from "neverthrow";
import {
  encodeFunctionData,
  erc20Abi,
  isAddress,
  zeroAddress,
  type Address,
  type ContractFunctionParameters,
} from "viem";

export type PrepareRegistrationPaymentApprovalWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_APPROVAL_AMOUNT"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS";

export interface PrepareRegistrationPaymentApprovalWriteProps {
  /** Account that owns the payment tokens. */
  readonly account: Address;
  /** Atomic token amount approved for registration. */
  readonly amount: bigint;
  /** Network associated with the supplied contract addresses. */
  readonly network: EnsNetwork;
  /** ERC-20 token used to pay for registration. */
  readonly paymentTokenAddress: Address;
  /** Registrar that may spend the approved tokens. */
  readonly registrarAddress: Address;
}

type RegistrationPaymentApprovalRequest = ContractFunctionParameters<
  typeof erc20Abi,
  "nonpayable",
  "approve",
  readonly [Address, bigint]
>;

export interface PrepareRegistrationPaymentApprovalWriteMetadata {
  readonly amount: bigint;
  readonly paymentTokenAddress: Address;
  readonly registrarAddress: Address;
}

export type PreparedRegistrationPaymentApprovalWrite = PreparedContractWrite<
  RegistrationPaymentApprovalRequest,
  "approve-registration-payment",
  PrepareRegistrationPaymentApprovalWriteMetadata
>;

export function prepareRegistrationPaymentApprovalWrite(
  props: PrepareRegistrationPaymentApprovalWriteProps,
): Result<
  PreparedRegistrationPaymentApprovalWrite,
  PrepareRegistrationPaymentApprovalWriteError
> {
  const { account, amount, paymentTokenAddress, registrarAddress } = props;

  if (!isAddress(account) || account === zeroAddress) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isAddress(paymentTokenAddress) || paymentTokenAddress === zeroAddress) {
    return err("INVALID_PAYMENT_TOKEN_ADDRESS");
  }

  if (!isAddress(registrarAddress) || registrarAddress === zeroAddress) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }

  if (amount <= 0n) {
    return err("INVALID_APPROVAL_AMOUNT");
  }

  const request = {
    address: paymentTokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [registrarAddress, amount],
  } as const satisfies RegistrationPaymentApprovalRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: paymentTokenAddress,
      value: 0n,
    },
    kind: "approve-registration-payment",
    metadata: { amount, paymentTokenAddress, registrarAddress },
    request,
  });
}
