"use client";

import type { NameProfileEditorRecordDefinition } from "#/components/name-profile-editor/editor/types";

import { Button, Typography } from "@thenamespace/uikit";
import { Add01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

import { RecordIcon } from "#/components/name-profile-editor/editor/record-icon";

export function RecordLibrary({
  records,
  onAdd,
}: {
  records: readonly NameProfileEditorRecordDefinition[];
  onAdd: (record: NameProfileEditorRecordDefinition) => void;
}) {
  if (records.length === 0) return null;

  return (
    <section aria-labelledby="available-records-heading" className="space-y-3">
      <div>
        <Typography.Heading
          className="text-sm font-semibold"
          id="available-records-heading"
          level={3}
        >
          Add a record
        </Typography.Heading>
        <Typography.Paragraph className="mt-0.5" color="muted" size="xs">
          Choose only what this profile needs.
        </Typography.Paragraph>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {records.map((record) => (
          <Button
            key={record.id}
            aria-label={`Add ${record.label}`}
            className="border-default group h-auto min-h-20 items-start justify-start rounded-2xl border p-3 text-left"
            variant="outline"
            onPress={() => onAdd(record)}
          >
            <span className="flex w-full items-start justify-between gap-2">
              <span className="flex min-w-0 flex-col items-start gap-1.5">
                <RecordIcon icon={record.icon} />
                <span className="truncate text-sm font-medium">
                  {record.label}
                </span>
              </span>
              <HugeiconsIcon
                className="text-muted transition-colors group-hover:text-current"
                icon={Add01Icon}
                size={16}
              />
            </span>
          </Button>
        ))}
      </div>
    </section>
  );
}
