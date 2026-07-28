"use client";

import type { NameProfileEditorRecordDefinition } from "#/components/name-profile-editor/editor/types";

import { Button } from "@thenamespace/uikit";

import { RecordIcon } from "#/components/name-profile-editor/editor/record-icon";

export function RecordLibrary({
  records,
  onAdd,
}: {
  records: readonly NameProfileEditorRecordDefinition[];
  onAdd: (record: NameProfileEditorRecordDefinition) => void;
}) {
  return (
    <>
      {records.map((record) => (
        <Button
          key={record.id}
          aria-label={`Add ${record.label}`}
          className="border-default bg-background h-20 min-w-0 flex-col gap-1 rounded-xl border px-2 py-2 text-center @min-[800px]:h-24"
          variant="outline"
          onPress={() => onAdd(record)}
        >
          <RecordIcon icon={record.icon} />
          <span className="w-full truncate text-sm font-normal @min-[800px]:text-base">
            {record.label}
          </span>
        </Button>
      ))}
    </>
  );
}
