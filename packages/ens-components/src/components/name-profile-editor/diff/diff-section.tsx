"use client";

import { Accordion, Surface } from "@thenamespace/uikit";

import type { NameProfileEditorMessages } from "#/components/name-profile-editor/customization";
import type {
  ProfileChangeStatus,
  ProfileDiffItem,
  ProfileDiffSection as ProfileDiffSectionModel,
} from "#/components/name-profile-editor/diff/diff-records";
import { getRecordIcon } from "#/icons/get-record-icon";

const statusOrder: readonly ProfileChangeStatus[] = ["added", "updated", "removed"];

function DiffRecord({ item }: { item: ProfileDiffItem }) {
  const RecordIcon = getRecordIcon(item.iconName, item.type);

  return (
    <Surface
      className="flex max-w-full min-w-0 items-center gap-2 rounded-xl px-3 py-2"
      title={item.label}
      variant="secondary"
    >
      <RecordIcon aria-hidden className="size-4 shrink-0" />
      <span className="truncate text-xs font-medium">{item.label}</span>
    </Surface>
  );
}

function getDiffRecordKey(item: ProfileDiffItem): string {
  const change = item.change;
  switch (change.type) {
    case "abi":
      return `abi:${change.contentType}`;
    case "address":
      return `address:${change.coinType}`;
    case "data":
      return `data:${change.key}`;
    case "interface":
      return `interface:${change.interfaceId}`;
    case "text":
      return `text:${change.key}`;
    default:
      return change.type;
  }
}

export function ProfileDiffSection({
  messages,
  section,
}: {
  messages: NameProfileEditorMessages;
  section: ProfileDiffSectionModel;
}) {
  const statusLabels: Readonly<Record<ProfileChangeStatus, string>> = {
    added: messages.addedLabel,
    removed: messages.removedLabel,
    updated: messages.changedLabel,
  };

  return (
    <Accordion.Item
      className="border-default bg-surface overflow-hidden rounded-xl border [&::after]:hidden"
      id={section.id}
    >
      <Accordion.Heading>
        <Accordion.Trigger className="min-w-0 gap-2 px-3 py-3 min-[420px]:px-4">
          <span className="min-w-0 truncate text-sm font-medium">{section.label}</span>
          <span className="bg-secondary text-muted flex size-6 shrink-0 items-center justify-center rounded-lg text-xs font-medium">
            {section.items.length}
          </span>
          <Accordion.Indicator className="text-muted size-4" />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body className="border-default space-y-4 border-t px-3 py-4 min-[420px]:px-4">
          {statusOrder.map((status) => {
            const items = section.items.filter((item) => item.status === status);
            if (items.length === 0) return null;

            return (
              <div key={status}>
                <p className="text-muted text-xs font-medium">
                  {statusLabels[status]} ({items.length})
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <DiffRecord key={getDiffRecordKey(item)} item={item} />
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
