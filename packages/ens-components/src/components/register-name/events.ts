import type { Address, Hex, TransactionReceipt } from "viem";

import type { EnsNetwork } from "#/data";

export interface RegisterNameTransactionEvent {
  chainId: number;
  network: EnsNetwork;
  receipt: TransactionReceipt;
  transactionHash: Hex;
}

export interface RegisterNameCommitEvent extends RegisterNameTransactionEvent {
  commitment: Hex;
  commitmentId: string;
  duration: bigint;
  name: string;
  owner: Address;
  referrer: Hex;
  registrarAddress: Address;
}

export interface RegisterNameApproveEvent extends RegisterNameTransactionEvent {
  account: Address;
  amount: bigint;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}

export interface RegisterNameRegisterEvent extends RegisterNameTransactionEvent {
  account: Address;
  amount: bigint;
  decimals: number;
  duration: bigint;
  expiresAt: number;
  name: string;
  owner: Address;
  paymentTokenAddress: Address;
  referrer: Hex;
  registrarAddress: Address;
  tokenId?: bigint;
}

export type RegisterNameEventHandler<TEvent> = (
  event: TEvent,
) => Promise<void> | void;

export interface RegisterNameEvents {
  /** Called after an approval transaction is successfully confirmed. */
  onApprove?: RegisterNameEventHandler<RegisterNameApproveEvent>;
  /** Called after a commitment is confirmed and persisted for resuming later. */
  onCommit?: RegisterNameEventHandler<RegisterNameCommitEvent>;
  /** Called after a registration transaction is successfully confirmed. */
  onRegister?: RegisterNameEventHandler<RegisterNameRegisterEvent>;
}
