import type { Address, Hex, TransactionReceipt } from "viem";

import type {
  NameProfileFormValues,
  NameProfileRecordChange,
} from "#/components/name-profile-editor/types";
import type { EnsNetwork } from "#/data";

export interface NameProfileUpdateEvent {
  account: Address;
  chainId: number;
  changes: readonly NameProfileRecordChange[];
  name: string;
  network: EnsNetwork;
  receipt: TransactionReceipt;
  resolverAddress: Address;
  transactionHash: Hex;
  values: NameProfileFormValues;
}

export type NameProfileEditorErrorPhase = "permission" | "resolver" | "update";

export interface NameProfileEditorErrorEvent {
  account?: Address;
  chainId: number;
  error: unknown;
  name: string;
  network: EnsNetwork;
  phase: NameProfileEditorErrorPhase;
  resolverAddress?: Address;
  transactionHash?: Hex;
}

export type NameProfileEditorEventHandler<TEvent> = (
  event: TEvent,
) => Promise<void> | void;

export interface NameProfileEditorEvents {
  /** Called when resolver discovery, permission checks, or submission fail. */
  onError?: NameProfileEditorEventHandler<NameProfileEditorErrorEvent>;
  /** Called after the resolver multicall is successfully confirmed. */
  onUpdate?: NameProfileEditorEventHandler<NameProfileUpdateEvent>;
}
