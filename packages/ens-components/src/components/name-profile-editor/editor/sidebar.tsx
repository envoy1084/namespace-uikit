"use client";

import { Button } from "@thenamespace/uikit";

export type ProfileEditorSection =
  | "addresses"
  | "general"
  | "social"
  | "website";

const sections: ReadonlyArray<{
  id: ProfileEditorSection;
  label: string;
}> = [
  { id: "general", label: "General" },
  { id: "social", label: "Social" },
  { id: "addresses", label: "Addresses" },
  { id: "website", label: "Website" },
];

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
      className="flex w-24 shrink-0 flex-col gap-1"
    >
      {sections.map((section) => (
        <Button
          key={section.id}
          fullWidth
          className="justify-start"
          size="sm"
          variant={value === section.id ? "secondary" : "ghost"}
          onPress={() => onChange(section.id)}
        >
          {section.label}
        </Button>
      ))}
    </nav>
  );
}
