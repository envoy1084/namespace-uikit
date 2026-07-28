"use client";

import type {
  NameProfileEditorUploadHandlers,
  NameProfileFormValues,
} from "#/components/name-profile-editor/types";

import { useEffect, useState } from "react";

import { Surface } from "@thenamespace/uikit";

import { EditorHeader } from "#/components/name-profile-editor/editor/header";
import {
  EditorSidebar,
  type ProfileEditorSection,
} from "#/components/name-profile-editor/editor/sidebar";

function getMediaRecord(
  records: NameProfileFormValues,
  key: "avatar" | "header",
): string {
  return records.text.find((record) => record.key === key)?.value ?? "";
}

export function ProfileEditor({
  initialRecords,
  upload,
}: {
  initialRecords: NameProfileFormValues;
  upload?: NameProfileEditorUploadHandlers;
}) {
  const initialAvatar = getMediaRecord(initialRecords, "avatar");
  const initialHeader = getMediaRecord(initialRecords, "header");
  const [activeSection, setActiveSection] =
    useState<ProfileEditorSection>("general");
  const [avatar, setAvatar] = useState(initialAvatar);
  const [header, setHeader] = useState(initialHeader);

  useEffect(() => {
    setAvatar(initialAvatar);
    setHeader(initialHeader);
  }, [initialAvatar, initialHeader]);

  return (
    <div className="w-full">
      <EditorHeader
        avatar={avatar}
        header={header}
        {...(upload === undefined ? {} : { upload })}
        onAvatarChange={setAvatar}
        onHeaderChange={setHeader}
      />

      <Surface
        className="border-default mt-4 min-h-64 rounded-2xl border p-4"
        variant="transparent"
      >
        <EditorSidebar value={activeSection} onChange={setActiveSection} />
      </Surface>
    </div>
  );
}
