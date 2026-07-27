import type { Address, Hex } from "viem";

export type NameProfileRecordType =
  | "abi"
  | "address"
  | "contenthash"
  | "data"
  | "interface"
  | "name"
  | "pubkey"
  | "text";

/** ABI payload stored for one ENSIP-4 content type. */
export interface NameProfileAbiRecord {
  readonly contentType: bigint;
  readonly value: Hex;
}

/** Human-readable value for one ENSIP-9 multicoin address record. */
export interface NameProfileAddressRecord {
  readonly coinType: bigint;
  readonly value: string;
}

/** Arbitrary keyed binary resolver data. */
export interface NameProfileDataRecord {
  readonly key: string;
  readonly value: Hex;
}

/** Contract implementing an EIP-165 interface for the name. */
export interface NameProfileInterfaceRecord {
  readonly implementer: Address;
  readonly interfaceId: Hex;
}

/** SECP256k1 public key coordinates stored by the resolver. */
export interface NameProfilePublicKeyRecord {
  readonly x: Hex;
  readonly y: Hex;
}

/** Human-readable value for one ENS text record. */
export interface NameProfileTextRecord {
  readonly key: string;
  readonly value: string;
}

/**
 * Complete editable resolver profile supplied to the profile editor.
 *
 * Missing array entries are treated as unset. Nullable scalar records use
 * `null` when no value is set.
 */
export interface NameProfileRecords {
  readonly abi: readonly NameProfileAbiRecord[];
  readonly addresses: readonly NameProfileAddressRecord[];
  readonly contenthash: string | null;
  readonly data: readonly NameProfileDataRecord[];
  readonly interfaces: readonly NameProfileInterfaceRecord[];
  readonly name: string | null;
  readonly pubkey: NameProfilePublicKeyRecord | null;
  readonly text: readonly NameProfileTextRecord[];
}

export interface NameProfileAbiRecordChange {
  readonly contentType: bigint;
  readonly previousValue: Hex | null;
  readonly type: "abi";
  /** `null` removes the record. */
  readonly value: Hex | null;
}

export interface NameProfileAddressRecordChange {
  readonly coinType: bigint;
  readonly previousValue: string | null;
  readonly type: "address";
  /** `null` removes the record. */
  readonly value: string | null;
}

export interface NameProfileContenthashRecordChange {
  readonly previousValue: string | null;
  readonly type: "contenthash";
  /** `null` removes the record. */
  readonly value: string | null;
}

export interface NameProfileDataRecordChange {
  readonly key: string;
  readonly previousValue: Hex | null;
  readonly type: "data";
  /** `null` removes the record. */
  readonly value: Hex | null;
}

export interface NameProfileInterfaceRecordChange {
  readonly interfaceId: Hex;
  readonly previousValue: Address | null;
  readonly type: "interface";
  /** `null` removes the record. */
  readonly value: Address | null;
}

export interface NameProfileNameRecordChange {
  readonly previousValue: string | null;
  readonly type: "name";
  /** `null` removes the record. */
  readonly value: string | null;
}

export interface NameProfilePublicKeyRecordChange {
  readonly previousValue: NameProfilePublicKeyRecord | null;
  readonly type: "pubkey";
  /** `null` removes the record. */
  readonly value: NameProfilePublicKeyRecord | null;
}

export interface NameProfileTextRecordChange {
  readonly key: string;
  readonly previousValue: string | null;
  readonly type: "text";
  /** `null` removes the record. */
  readonly value: string | null;
}

/** One semantic difference between the editor baseline and current draft. */
export type NameProfileRecordChange =
  | NameProfileAbiRecordChange
  | NameProfileAddressRecordChange
  | NameProfileContenthashRecordChange
  | NameProfileDataRecordChange
  | NameProfileInterfaceRecordChange
  | NameProfileNameRecordChange
  | NameProfilePublicKeyRecordChange
  | NameProfileTextRecordChange;

/** Canonical map-based representation used for draft and diff operations. */
export interface NormalizedNameProfileRecords {
  readonly abi: ReadonlyMap<bigint, Hex>;
  readonly addresses: ReadonlyMap<bigint, string>;
  readonly contenthash: string | null;
  readonly data: ReadonlyMap<string, Hex>;
  readonly interfaces: ReadonlyMap<Hex, Address>;
  readonly name: string | null;
  readonly pubkey: NameProfilePublicKeyRecord | null;
  readonly text: ReadonlyMap<string, string>;
}

/**
 * Profile update flow:
 *
 * - `editor`: add, edit, or remove records.
 * - `diff`: review the pending changes before submitting them.
 * - `success`: display the confirmed update.
 */
export type NameProfileEditorView = "diff" | "editor" | "success";

/**
 * Internal state model. Confirmed drafts replace the baseline before the
 * success view is displayed.
 */
export interface NameProfileEditorState {
  readonly baseline: NormalizedNameProfileRecords;
  readonly draft: NormalizedNameProfileRecords;
  readonly view: NameProfileEditorView;
}
