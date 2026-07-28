"use client";

import type { ProfileEditorSection } from "#/components/name-profile-editor/editor/types";

import { Button } from "@thenamespace/uikit";

import {
  sectionLabels,
  sectionOrder,
} from "#/components/name-profile-editor/editor/record-definitions";

export function EditorSidebar({
  value,
  onChange,
}: {
  value: ProfileEditorSection;
  onChange: (section: ProfileEditorSection) => void;
}) {
  return (
    <nav
      aria-label="Profile sections"
      className="flex w-20 shrink-0 flex-col gap-1"
    >
      {sectionOrder.map((section) => (
        <Button
          key={section}
          fullWidth
          className="justify-start rounded-xl px-2 text-xs"
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
