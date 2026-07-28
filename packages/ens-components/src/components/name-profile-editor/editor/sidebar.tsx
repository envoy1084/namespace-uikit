"use client";

import type { ProfileEditorSection } from "#/components/name-profile-editor/editor/types";

import { Button } from "@thenamespace/uikit";

import {
  sectionLabels,
  sectionOrder,
} from "#/components/name-profile-editor/editor/record-definitions";

export function EditorSidebar({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ProfileEditorSection;
  onChange: (section: ProfileEditorSection) => void;
}) {
  return (
    <nav
      aria-label={label}
      className="flex w-20 shrink-0 flex-col gap-1 max-[420px]:w-full max-[420px]:flex-row max-[420px]:overflow-x-auto max-[420px]:pb-1"
    >
      {sectionOrder.map((section) => (
        <Button
          key={section}
          fullWidth
          aria-pressed={value === section}
          className="justify-start rounded-xl px-2 text-xs max-[420px]:w-auto max-[420px]:shrink-0"
          size="sm"
          variant={value === section ? "secondary" : "ghost"}
          onPress={() => onChange(section)}
        >
          {sectionLabels[section]}
        </Button>
      ))}
    </nav>
  );
}
