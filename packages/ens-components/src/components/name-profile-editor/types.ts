export type NameProfileRecordType = "address" | "contenthash" | "text";

/** Human-readable value for one ENS text record. */
export interface NameProfileTextRecord {
  readonly key: string;
  readonly value: string;
}

/** Human-readable value for one ENSIP-9 multicoin address record. */
export interface NameProfileAddressRecord {
  readonly coinType: number;
  readonly value: string;
}

/**
 * Serializable onchain snapshot supplied to the profile editor.
 *
 * Records absent from the arrays are treated as unset. A `null` contenthash
 * means that the name has no contenthash record.
 */
export interface NameProfileRecords {
  readonly addresses: readonly NameProfileAddressRecord[];
  readonly contenthash: string | null;
  readonly text: readonly NameProfileTextRecord[];
}

export interface NameProfileTextRecordChange {
  readonly key: string;
  readonly previousValue: string | null;
  readonly type: "text";
  /** `null` removes the record. */
  readonly value: string | null;
}

export interface NameProfileAddressRecordChange {
  readonly coinType: number;
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

/** One semantic difference between the editor baseline and current draft. */
export type NameProfileRecordChange =
  | NameProfileAddressRecordChange
  | NameProfileContenthashRecordChange
  | NameProfileTextRecordChange;

/**
 * Canonical map-based representation used internally for draft operations.
 * This is intentionally not re-exported from the component's public barrel.
 */
export interface NormalizedNameProfileRecords {
  readonly addresses: ReadonlyMap<number, string>;
  readonly contenthash: string | null;
  readonly text: ReadonlyMap<string, string>;
}

export type NameProfileEditorView = "editor" | "success";

/**
 * Internal state model. Confirmed drafts replace the baseline before the
 * success view is displayed.
 */
export interface NameProfileEditorState {
  readonly baseline: NormalizedNameProfileRecords;
  readonly draft: NormalizedNameProfileRecords;
  readonly view: NameProfileEditorView;
}
