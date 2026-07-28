"use client";

import type { ActiveProfileRecord } from "#/components/name-profile-editor/editor/record-field";
import type {
  NameProfileEditorCategory,
  NameProfileEditorRecordDefinition,
} from "#/components/name-profile-editor/editor/types";

import type { ReactNode } from "react";

import { Typography } from "@thenamespace/uikit";

import { RecordField } from "#/components/name-profile-editor/editor/record-field";
import { RecordLibrary } from "#/components/name-profile-editor/editor/record-library";

const repeatableRecordIds = new Set([
  "abi",
  "custom-text",
  "data",
  "interface",
]);

function matchesQuery(
  record: NameProfileEditorRecordDefinition,
  query: string,
): boolean {
  const search = query.trim().toLowerCase();
  if (search.length === 0) return !record.hidden;
  return [record.label, record.description, record.key, record.coinType].some(
    (value) => value?.toLowerCase().includes(search),
  );
}

export function RecordSection({
  activeRecords,
  category,
  definitions,
  label,
  onAdd,
  onRemove,
  query,
  sectionRef,
}: {
  activeRecords: readonly ActiveProfileRecord[];
  category: NameProfileEditorCategory;
  definitions: readonly NameProfileEditorRecordDefinition[];
  label: string;
  onAdd: (record: NameProfileEditorRecordDefinition) => void;
  onRemove: (record: ActiveProfileRecord) => void;
  query: string;
  sectionRef: (element: HTMLElement | null) => void;
}) {
  const categoryActive = activeRecords.filter(
    (record) => record.definition.category === category,
  );
  const contenthashActive = categoryActive.find(
    (record) => record.definition.kind === "contenthash",
  );
  const items: ReactNode[] = [];

  for (const definition of definitions) {
    const matchingActive = categoryActive.filter(
      (record) => record.definition.id === definition.id,
    );
    const isContenthashAlternative =
      definition.kind === "contenthash" &&
      contenthashActive !== undefined &&
      contenthashActive.definition.id !== definition.id;

    if (isContenthashAlternative) continue;
    if (!matchesQuery(definition, query) && matchingActive.length === 0) {
      continue;
    }

    for (const record of matchingActive) {
      items.push(
        <RecordField key={record.id} record={record} onRemove={onRemove} />,
      );
    }

    if (matchingActive.length === 0 || repeatableRecordIds.has(definition.id)) {
      items.push(
        <RecordLibrary
          key={`available-${definition.id}`}
          records={[definition]}
          onAdd={onAdd}
        />,
      );
    }
  }

  if (items.length === 0) return null;

  return (
    <section ref={sectionRef} aria-labelledby={`profile-${category}-heading`}>
      <Typography.Heading
        className="mb-4 text-xl font-semibold @min-[800px]:mb-5 @min-[800px]:text-2xl"
        id={`profile-${category}-heading`}
        level={3}
      >
        {label}
      </Typography.Heading>
      <div className="grid grid-cols-2 gap-2 @min-[580px]:grid-cols-4 @min-[800px]:gap-3">
        {items}
      </div>
    </section>
  );
}
