import type { EnsNetwork } from "#/data";

import { errAsync, ResultAsync } from "neverthrow";
import {
  erc20Abi,
  isAddress,
  zeroAddress,
  type Address,
  type Hex,
  type WalletClient,
} from "viem";

export type ApproveRegistrationPaymentError =
  | "CONTRACT_WRITE_FAILED"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_APPROVAL_AMOUNT"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS";

export interface ApproveRegistrationPaymentProps {
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

export function approveRegistrationPayment(
  walletClient: WalletClient,
  props: ApproveRegistrationPaymentProps,
): ResultAsync<Hex, ApproveRegistrationPaymentError> {
  const { account, amount, paymentTokenAddress, registrarAddress } = props;

  if (!isAddress(account) || account === zeroAddress) {
    return errAsync("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isAddress(paymentTokenAddress)) {
    return errAsync("INVALID_PAYMENT_TOKEN_ADDRESS");
  }

  if (!isAddress(registrarAddress)) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  if (amount <= 0n) {
    return errAsync("INVALID_APPROVAL_AMOUNT");
  }

  return ResultAsync.fromPromise(
    walletClient.writeContract({
      account,
      address: paymentTokenAddress,
      abi: erc20Abi,
      chain: walletClient.chain,
      functionName: "approve",
      args: [registrarAddress, amount],
    }),
    () => "CONTRACT_WRITE_FAILED" as const,
  );
}
