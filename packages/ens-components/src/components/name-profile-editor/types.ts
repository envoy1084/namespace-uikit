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
  /** Canonical unsigned decimal integer. */
  contentType: string;
  /** Even-length hex bytes. */
  value: string;
}

/** Human-readable value for one ENSIP-9 multicoin address record. */
export interface NameProfileAddressRecord {
  /** Canonical unsigned decimal integer. */
  coinType: string;
  value: string;
}

/** Arbitrary keyed binary resolver data. */
export interface NameProfileDataRecord {
  key: string;
  /** Even-length hex bytes. */
  value: string;
}

/** Contract implementing an EIP-165 interface for the name. */
export interface NameProfileInterfaceRecord {
  implementer: string;
  /** Four-byte EIP-165 interface ID. */
  interfaceId: string;
}

/** SECP256k1 public key coordinates stored by the resolver. */
export interface NameProfilePublicKeyRecord {
  /** A bytes32 hex value, or an empty string when unset. */
  x: string;
  /** A bytes32 hex value, or an empty string when unset. */
  y: string;
}

/** Human-readable value for one ENS text record. */
export interface NameProfileTextRecord {
  key: string;
  value: string;
}

/**
 * Input-compatible resolver profile used by React Hook Form and editor state.
 *
 * Unset scalar records use empty strings. Unset keyed records are omitted from
 * their arrays.
 */
export interface NameProfileFormValues {
  abi: NameProfileAbiRecord[];
  addresses: NameProfileAddressRecord[];
  contenthash: string;
  data: NameProfileDataRecord[];
  interfaces: NameProfileInterfaceRecord[];
  name: string;
  pubkey: NameProfilePublicKeyRecord;
  text: NameProfileTextRecord[];
}

export interface NameProfileAbiRecordChange {
  contentType: string;
  previousValue: string | null;
  type: "abi";
  /** `null` removes the record. */
  value: string | null;
}

export interface NameProfileAddressRecordChange {
  coinType: string;
  previousValue: string | null;
  type: "address";
  /** `null` removes the record. */
  value: string | null;
}

export interface NameProfileContenthashRecordChange {
  previousValue: string | null;
  type: "contenthash";
  /** `null` removes the record. */
  value: string | null;
}

export interface NameProfileDataRecordChange {
  key: string;
  previousValue: string | null;
  type: "data";
  /** `null` removes the record. */
  value: string | null;
}

export interface NameProfileInterfaceRecordChange {
  interfaceId: string;
  previousValue: string | null;
  type: "interface";
  /** `null` removes the record. */
  value: string | null;
}

export interface NameProfileNameRecordChange {
  previousValue: string | null;
  type: "name";
  /** `null` removes the record. */
  value: string | null;
}

export interface NameProfilePublicKeyRecordChange {
  previousValue: NameProfilePublicKeyRecord | null;
  type: "pubkey";
  /** `null` removes the record. */
  value: NameProfilePublicKeyRecord | null;
}

export interface NameProfileTextRecordChange {
  key: string;
  previousValue: string | null;
  type: "text";
  /** `null` removes the record. */
  value: string | null;
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

/**
 * Profile update flow:
 *
 * - `editor`: add, edit, or remove records.
 * - `diff`: review the pending changes before submitting them.
 * - `success`: display the confirmed update.
 */
export type NameProfileEditorView = "diff" | "editor" | "success";

/** Canonical snapshots used by the editor flow. */
export interface NameProfileEditorState {
  baseline: NameProfileFormValues;
  draft: NameProfileFormValues;
  view: NameProfileEditorView;
}
