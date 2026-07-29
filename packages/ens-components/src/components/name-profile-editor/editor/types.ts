import type { NameProfileRecordType } from "#/components/name-profile-editor/types";

export type ProfileEditorSection = "addresses" | "advanced" | "general" | "social" | "website";

export interface RecordDefinition {
  id: string;
  isCustom?: boolean;
  isRepeatable?: boolean;
  label: string;
  name: string;
  placeholder: string;
  section: ProfileEditorSection;
  type: NameProfileRecordType;
}

export interface EditorRecord extends RecordDefinition {
  arrayIndex?: number;
}

export interface EditorRecordFieldIds {
  abi: readonly string[];
  addresses: readonly string[];
  data: readonly string[];
  interfaces: readonly string[];
  text: readonly string[];
}
