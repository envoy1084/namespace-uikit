import type { Address, Hex, TransactionReceipt } from "viem";

import type { ComponentEventHandler } from "#/components/emit-event";
import type {
  NameProfileFormValues,
  NameProfileRecordChange,
} from "#/components/name-profile-editor/types";

export interface NameProfileUpdateEvent {
  account: Address;
  chainId: number;
  changes: readonly NameProfileRecordChange[];
  name: string;
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
  phase: NameProfileEditorErrorPhase;
  resolverAddress?: Address;
  transactionHash?: Hex;
}

export type NameProfileEditorEventHandler<TEvent> = ComponentEventHandler<TEvent>;

export interface NameProfileEditorEvents {
  /** Called when resolver discovery, permission checks, or submission fail. */
  onError?: NameProfileEditorEventHandler<NameProfileEditorErrorEvent>;
  /** Called after the resolver multicall is successfully confirmed. */
  onUpdate?: NameProfileEditorEventHandler<NameProfileUpdateEvent>;
}
