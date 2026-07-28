import type { Address, Hex, TransactionReceipt } from "viem";

import type { EnsNetwork } from "#/data";

export interface NameRegistrationTransactionEvent {
  chainId: number;
  network: EnsNetwork;
  receipt: TransactionReceipt;
  transactionHash: Hex;
}

export interface NameRegistrationCommitEvent extends NameRegistrationTransactionEvent {
  commitment: Hex;
  registrationAttemptId: string;
  duration: bigint;
  name: string;
  owner: Address;
  referrer: Hex;
  registrarAddress: Address;
}

export interface NameRegistrationResolverDeployEvent extends NameRegistrationTransactionEvent {
  factoryAddress: Address;
  implementationAddress: Address;
  owner: Address;
  resolverAddress: Address;
}

export interface NameRegistrationApproveEvent extends NameRegistrationTransactionEvent {
  account: Address;
  amount: bigint;
  paymentTokenAddress: Address;
  registrarAddress: Address;
}

export interface NameRegistrationRegisterEvent extends NameRegistrationTransactionEvent {
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

export interface NameRegistrationPrimaryNameEvent extends NameRegistrationTransactionEvent {
  account: Address;
  addressRecordReceipt: TransactionReceipt;
  addressRecordTransactionHash: Hex;
  l1ReverseRegistrarAddress: Address;
  l2ReverseRegistrarAddress: Address;
  l2ReverseReceipt: TransactionReceipt;
  l2ReverseTransactionHash: Hex;
  name: string;
  owner: Address;
  resolverAddress: Address;
}

export type NameRegistrationErrorPhase =
  | "address-record"
  | "approval"
  | "commitment"
  | "l1-primary-name"
  | "l2-primary-name"
  | "resolver"
  | "registration";

export interface NameRegistrationErrorEvent {
  chainId: number;
  error: unknown;
  input: string;
  network: EnsNetwork;
  phase: NameRegistrationErrorPhase;
  transactionHash?: Hex;
}

export type NameRegistrationEventHandler<TEvent> = (event: TEvent) => Promise<void> | void;

export interface NameRegistrationEvents {
  /** Called after an approval transaction is successfully confirmed. */
  onApprove?: NameRegistrationEventHandler<NameRegistrationApproveEvent>;
  /** Called after a commitment is confirmed and persisted for resuming later. */
  onCommit?: NameRegistrationEventHandler<NameRegistrationCommitEvent>;
  /** Called when an attempted transaction phase cannot be completed. */
  onError?: NameRegistrationEventHandler<NameRegistrationErrorEvent>;
  /** Called after a dedicated resolver deployment is confirmed. */
  onResolverDeploy?: NameRegistrationEventHandler<NameRegistrationResolverDeployEvent>;
  /** Called after a registration transaction is successfully confirmed. */
  onRegister?: NameRegistrationEventHandler<NameRegistrationRegisterEvent>;
  /** Called after the forward, ENS v2 reverse, and L1 reverse writes are confirmed. */
  onSetPrimaryName?: NameRegistrationEventHandler<NameRegistrationPrimaryNameEvent>;
}
