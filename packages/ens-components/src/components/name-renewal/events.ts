import type { Address, Hex, TransactionReceipt } from "viem";

import type { ComponentEventHandler } from "#/components/emit-event";
import type { EnsNetwork } from "#/data";

export interface NameRenewalTransactionEvent {
  chainId: number;
  network: EnsNetwork;
  receipt: TransactionReceipt;
  transactionHash: Hex;
}

export interface NameRenewalApproveEvent extends NameRenewalTransactionEvent {
  account: Address;
  amount: bigint;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}

export interface NameRenewalRenewEvent extends NameRenewalTransactionEvent {
  account: Address;
  amount: bigint;
  currentExpiry: bigint;
  decimals: number;
  duration: bigint;
  name: string;
  newExpiry: bigint;
  paymentTokenAddress: Address;
  referrer: Hex;
  registrarAddress: Address;
  tokenId?: bigint;
}

export type NameRenewalErrorPhase = "approval" | "renewal";

export interface NameRenewalErrorEvent {
  chainId: number;
  error: unknown;
  input: string;
  network: EnsNetwork;
  phase: NameRenewalErrorPhase;
  transactionHash?: Hex;
}

export type NameRenewalEventHandler<TEvent> = ComponentEventHandler<TEvent>;

export interface NameRenewalEvents {
  /** Called after a required ERC-20 approval is successfully confirmed. */
  onApprove?: NameRenewalEventHandler<NameRenewalApproveEvent>;
  /** Called when an attempted approval or renewal cannot be completed. */
  onError?: NameRenewalEventHandler<NameRenewalErrorEvent>;
  /** Called after the renewal transaction is successfully confirmed. */
  onRenew?: NameRenewalEventHandler<NameRenewalRenewEvent>;
}
