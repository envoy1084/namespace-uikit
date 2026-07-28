"use client";

import type {
  EditorRecord,
  ProfileEditorSection,
  RecordDefinition,
} from "#/components/name-profile-editor/editor/types";

import { Typography } from "@thenamespace/uikit";

import {
  isRecordDefinitionActive,
  recordsForSection,
} from "#/components/name-profile-editor/editor/editor-records";
import { RecordButton } from "#/components/name-profile-editor/editor/record-button";
import { sectionLabels } from "#/components/name-profile-editor/editor/record-definitions";
import { RecordField } from "#/components/name-profile-editor/editor/record-field";
import { getRecordIcon } from "#/components/name-profile-editor/get-record-icon";

function matchesSearch(
  record: Pick<RecordDefinition, "label" | "name">,
  search: string,
): boolean {
  const query = search.trim().toLowerCase();
  if (query.length === 0) return true;

  return (
    record.label.toLowerCase().includes(query) ||
    record.name.toLowerCase().includes(query)
  );
}

export function RecordSection({
  disabledDefinitionIds,
  disabledRecordIds,
  error,
  records,
  search,
  section,
  onAdd,
  onRemove,
}: {
  disabledDefinitionIds?: ReadonlySet<string>;
  disabledRecordIds?: ReadonlySet<string>;
  error?: string | undefined;
  records: readonly EditorRecord[];
  search: string;
  section: ProfileEditorSection;
  onAdd: (definition: RecordDefinition) => void;
  onRemove: (record: EditorRecord) => void;
}) {
  const sectionRecords = records.filter(
    (record) => record.section === section && matchesSearch(record, search),
  );
  const availableRecords = recordsForSection(section).filter(
    (definition) =>
      !isRecordDefinitionActive(definition, records) &&
      matchesSearch(definition, search),
  );
  const hasResults = sectionRecords.length > 0 || availableRecords.length > 0;

  return (
    <section aria-labelledby={`profile-section-${section}`}>
      <Typography.Heading
        className="text-base leading-6 font-medium"
        id={`profile-section-${section}`}
        level={3}
      >
        {sectionLabels[section]}
      </Typography.Heading>

      {availableRecords.length > 0 ? (
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {availableRecords.map((definition) => (
            <RecordButton
              key={definition.id}
              icon={getRecordIcon(definition.name, definition.type)}
              isDisabled={disabledDefinitionIds?.has(definition.id)}
              name={definition.label}
              onPress={() => onAdd(definition)}
            />
          ))}
        </div>
      ) : null}

      {sectionRecords.length > 0 ? (
        <div className="mt-3 flex flex-col gap-2">
          {sectionRecords.map((record) => (
            <RecordField
              key={record.id}
              isDisabled={disabledRecordIds?.has(record.id) ?? false}
              record={record}
              onRemove={() => onRemove(record)}
            />
          ))}
        </div>
      ) : null}

      {error === undefined ? null : (
        <Typography.Paragraph
          className="text-danger mt-2 text-left text-xs leading-4"
          role="alert"
        >
          {error}
        </Typography.Paragraph>
      )}

      {!hasResults ? (
        <Typography.Paragraph className="text-muted mt-3 text-center text-xs">
          No matching records.
        </Typography.Paragraph>
      ) : null}
    </section>
  );
}
