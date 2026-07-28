import type {
  NameProfilePermissionRequest,
  NameProfilePermissions,
} from "#/actions";
import type {
  EditorRecord,
  RecordDefinition,
} from "#/components/name-profile-editor/editor/types";
import type {
  NameProfileFormValues,
  NameProfileRecordChange,
} from "#/components/name-profile-editor/types";

import {
  canEditNameProfileRecord,
  getNameProfilePermissionId,
} from "#/actions";
import { recordDefinitions } from "#/components/name-profile-editor/editor/record-definitions";

function definitionPermission(
  definition: RecordDefinition,
): NameProfilePermissionRequest {
  if (
    (definition.type === "address" || definition.type === "text") &&
    !definition.isCustom
  ) {
    return { key: definition.name, type: definition.type };
  }

  return { type: definition.type };
}

export function editorRecordPermission(
  record: EditorRecord,
  values: NameProfileFormValues,
): NameProfilePermissionRequest {
  if (record.type === "address" || record.type === "text") {
    return { key: record.name, type: record.type };
  }
  if (record.type === "data" && record.arrayIndex !== undefined) {
    const key = values.data[record.arrayIndex]?.key.trim();
    return key ? { key, type: "data" } : { type: "data" };
  }

  return { type: record.type };
}

export function profileChangePermission(
  change: NameProfileRecordChange,
): NameProfilePermissionRequest {
  if (change.type === "address") {
    return { key: change.coinType, type: "address" };
  }
  if (change.type === "data" || change.type === "text") {
    return { key: change.key, type: change.type };
  }

  return { type: change.type };
}

export function createEditorPermissionRequests(
  values: NameProfileFormValues,
): readonly NameProfilePermissionRequest[] {
  const requests: NameProfilePermissionRequest[] =
    recordDefinitions.map(definitionPermission);

  requests.push(
    ...values.text.map(({ key }) => ({ key, type: "text" as const })),
    ...values.addresses.map(({ coinType }) => ({
      key: coinType,
      type: "address" as const,
    })),
    ...values.data.map(({ key }) => ({ key, type: "data" as const })),
  );

  const unique = new Map<string, NameProfilePermissionRequest>();
  for (const request of requests) {
    unique.set(getNameProfilePermissionId(request), request);
  }
  return [...unique.values()];
}

export function canEditDefinition(
  permissions: NameProfilePermissions | undefined,
  definition: RecordDefinition,
): boolean {
  return canEditNameProfileRecord(
    permissions,
    definitionPermission(definition),
  );
}

export function canEditEditorRecord(
  permissions: NameProfilePermissions | undefined,
  record: EditorRecord,
  values: NameProfileFormValues,
): boolean {
  return canEditNameProfileRecord(
    permissions,
    editorRecordPermission(record, values),
  );
}

export function canEditProfileChanges(
  permissions: NameProfilePermissions | undefined,
  changes: readonly NameProfileRecordChange[],
): boolean {
  return changes.every((change) =>
    canEditNameProfileRecord(permissions, profileChangePermission(change)),
  );
}
