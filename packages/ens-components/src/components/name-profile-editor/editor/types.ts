import type {
  NameProfileFormValues,
  NameProfileRecordChange,
} from "#/components/name-profile-editor/types";

export type NameProfileEditorCategory =
  | "addresses"
  | "general"
  | "social"
  | "website";

export type NameProfileEditorRecordKind =
  | "abi"
  | "address"
  | "contenthash"
  | "data"
  | "interface"
  | "name"
  | "pubkey"
  | "text";

export interface NameProfileEditorRecordDefinition {
  category: NameProfileEditorCategory;
  coinType?: string;
  contenthashCodec?: string;
  description: string;
  /** Only appears when already selected or matched by search. */
  hidden?: boolean;
  icon: string;
  id: string;
  key?: string;
  kind: NameProfileEditorRecordKind;
  label: string;
  placeholder: string;
}

export type NameProfileMediaKind = "avatar" | "header";

export type NameProfileMediaUpload = (file: File) => Promise<string> | string;

export interface NameProfileEditorUploadHandlers {
  avatar?: NameProfileMediaUpload;
  header?: NameProfileMediaUpload;
}

export interface NameProfileEditorReview {
  changes: readonly NameProfileRecordChange[];
  values: NameProfileFormValues;
}
