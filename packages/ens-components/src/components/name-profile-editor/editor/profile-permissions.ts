import type {
  NameProfilePermissionRequest,
  NameProfilePermissions,
} from "#/actions";
import type { RecordDefinition } from "#/components/name-profile-editor/editor/types";
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

export function canEditProfileChanges(
  permissions: NameProfilePermissions | undefined,
  changes: readonly NameProfileRecordChange[],
): boolean {
  return changes.every((change) =>
    canEditNameProfileRecord(permissions, profileChangePermission(change)),
  );
}
