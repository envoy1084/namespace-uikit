"use client";

import { useState } from "react";

import { Surface } from "@thenamespace/uikit";

import { EditorHeader } from "#/components/name-profile-editor/editor/header";
import {
  EditorSidebar,
  type ProfileEditorSection,
} from "#/components/name-profile-editor/editor/sidebar";

export function ProfileEditor() {
  const [activeSection, setActiveSection] =
    useState<ProfileEditorSection>("general");

  return (
    <div className="w-full">
      <EditorHeader />

      <Surface
        className="border-default mt-4 min-h-64 rounded-2xl border p-4"
        variant="transparent"
      >
        <EditorSidebar value={activeSection} onChange={setActiveSection} />
      </Surface>
    </div>
  );
}
