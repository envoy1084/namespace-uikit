import type {
  EditorRecord,
  EditorRecordFieldIds,
  RecordDefinition,
} from "#/components/name-profile-editor/editor/types";
import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

import {
  findRecordDefinition,
  recordDefinitions,
} from "#/components/name-profile-editor/editor/record-definitions";

function contenthashProtocol(value: string): string {
  const protocol = value.trim().toLowerCase().split(":")[0] ?? "";

  const aliases: Readonly<Record<string, string>> = {
    ar: "arweave",
    bzz: "swarm",
    sia: "skynet",
    ton: "adnl",
  };

  return aliases[protocol] ?? protocol;
}

function activeDefinition(
  type: RecordDefinition["type"],
  activeDefinitionIds: ReadonlySet<string>,
): RecordDefinition | undefined {
  return recordDefinitions.find(
    (definition) =>
      definition.type === type && activeDefinitionIds.has(definition.id),
  );
}

export function createInitialActiveDefinitionIds(
  records: NameProfileFormValues,
): Set<string> {
  const active = new Set<string>();

  if (records.contenthash.length > 0) {
    const protocol = contenthashProtocol(records.contenthash);
    const definition =
      findRecordDefinition("contenthash", protocol) ??
      findRecordDefinition("contenthash", "ipfs");
    if (definition) active.add(definition.id);
  }

  if (records.name.length > 0) {
    const definition = findRecordDefinition("name", "name");
    if (definition) active.add(definition.id);
  }

  if (records.pubkey.x.length > 0 || records.pubkey.y.length > 0) {
    const definition = findRecordDefinition("pubkey", "pubkey");
    if (definition) active.add(definition.id);
  }

  return active;
}

export function isCustomTextRecordKey(key: string): boolean {
  const definition = findRecordDefinition("text", key);
  return definition === undefined || definition.isCustom === true;
}

export function createEditorRecords({
  activeDefinitionIds,
  customTextFieldIds,
  fieldIds,
  fieldKeys,
  values,
}: {
  activeDefinitionIds: ReadonlySet<string>;
  customTextFieldIds: ReadonlySet<string>;
  fieldIds: EditorRecordFieldIds;
  fieldKeys: {
    addresses: readonly string[];
    text: readonly string[];
  };
  values: NameProfileFormValues;
}): EditorRecord[] {
  const records: EditorRecord[] = [];
  const customText = findRecordDefinition("text", "custom");
  const fallbackAddress = findRecordDefinition("address", "60");
  const fallbackAbi = findRecordDefinition("abi", "abi");
  const fallbackData = findRecordDefinition("data", "data");
  const fallbackInterface = findRecordDefinition("interface", "interface");

  for (const [index, id] of fieldIds.text.entries()) {
    const stableKey = fieldKeys.text[index] ?? "";
    const isCustom = customTextFieldIds.has(id);
    const key = isCustom ? (values.text[index]?.key ?? stableKey) : stableKey;
    const definition = isCustom
      ? customText
      : (findRecordDefinition("text", key) ?? customText);

    if (!definition) continue;
    records.push({
      ...definition,
      arrayIndex: index,
      id,
      isCustom,
      name: isCustom ? key : definition.name,
    });
  }

  for (const [index, id] of fieldIds.addresses.entries()) {
    const coinType = fieldKeys.addresses[index] ?? "";
    const knownDefinition = findRecordDefinition("address", coinType);
    const definition = knownDefinition ?? fallbackAddress;
    if (!definition) continue;

    records.push({
      ...definition,
      arrayIndex: index,
      id,
      label: knownDefinition ? knownDefinition.label : `Coin ${coinType}`,
      name: coinType,
    });
  }

  const contenthash = activeDefinition("contenthash", activeDefinitionIds);
  if (contenthash) records.push(contenthash);

  for (const [index, id] of fieldIds.abi.entries()) {
    if (!fallbackAbi) break;
    records.push({
      ...fallbackAbi,
      arrayIndex: index,
      id,
    });
  }

  for (const [index, id] of fieldIds.data.entries()) {
    if (!fallbackData) break;
    records.push({
      ...fallbackData,
      arrayIndex: index,
      id,
    });
  }

  for (const [index, id] of fieldIds.interfaces.entries()) {
    if (!fallbackInterface) break;
    records.push({
      ...fallbackInterface,
      arrayIndex: index,
      id,
    });
  }

  const name = activeDefinition("name", activeDefinitionIds);
  if (name) records.push(name);

  const pubkey = activeDefinition("pubkey", activeDefinitionIds);
  if (pubkey) records.push(pubkey);

  return records;
}

export function isRecordDefinitionActive(
  definition: RecordDefinition,
  records: readonly EditorRecord[],
): boolean {
  if (definition.isRepeatable) return false;

  if (
    definition.type === "contenthash" ||
    definition.type === "name" ||
    definition.type === "pubkey"
  ) {
    return records.some((record) => record.type === definition.type);
  }

  return records.some(
    (record) =>
      record.type === definition.type && record.name === definition.name,
  );
}

export function recordsForSection(
  section: RecordDefinition["section"],
): readonly RecordDefinition[] {
  return recordDefinitions.filter((record) => record.section === section);
}
