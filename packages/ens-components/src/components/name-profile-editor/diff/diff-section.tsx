"use client";

import type {
  ProfileChangeStatus,
  ProfileDiffItem,
  ProfileDiffSection as ProfileDiffSectionModel,
} from "#/components/name-profile-editor/diff/diff-records";

import { Accordion, Surface } from "@thenamespace/uikit";

import { getRecordIcon } from "#/components/name-profile-editor/get-record-icon";

const statusLabels: Readonly<Record<ProfileChangeStatus, string>> = {
  added: "Added",
  removed: "Removed",
  updated: "Changed",
};

const statusOrder: readonly ProfileChangeStatus[] = [
  "added",
  "updated",
  "removed",
];

function DiffRecord({ item }: { item: ProfileDiffItem }) {
  const RecordIcon = getRecordIcon(item.iconName, item.type);

  return (
    <Surface
      className="flex max-w-full items-center gap-2 rounded-xl px-3 py-2"
      variant="secondary"
    >
      <RecordIcon aria-hidden className="size-4 shrink-0" />
      <span className="truncate text-xs font-medium">{item.label}</span>
    </Surface>
  );
}

export function ProfileDiffSection({
  section,
}: {
  section: ProfileDiffSectionModel;
}) {
  return (
    <Accordion.Item
      className="border-default bg-surface overflow-hidden rounded-xl border [&::after]:hidden"
      id={section.id}
    >
      <Accordion.Heading>
        <Accordion.Trigger className="gap-2 px-4 py-3">
          <span className="text-sm font-medium">{section.label}</span>
          <span className="bg-secondary text-muted flex size-6 items-center justify-center rounded-lg text-xs font-medium">
            {section.items.length}
          </span>
          <Accordion.Indicator className="text-muted size-4" />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body className="border-default space-y-4 border-t px-4 py-4">
          {statusOrder.map((status) => {
            const items = section.items.filter(
              (item) => item.status === status,
            );
            if (items.length === 0) return null;

            return (
              <div key={status}>
                <p className="text-muted text-xs font-medium">
                  {statusLabels[status]} ({items.length})
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {items.map((item, index) => (
                    <DiffRecord
                      key={`${item.type}:${item.iconName}:${index}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
