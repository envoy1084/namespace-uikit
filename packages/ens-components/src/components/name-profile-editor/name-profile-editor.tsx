"use client";

import type {
  NameProfileEditorUploadHandlers,
  NameProfileFormValues,
} from "#/components/name-profile-editor/types";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { Button, Modal, cn } from "@thenamespace/uikit";

import { ProfileHeader } from "#/components/name-profile-editor/profile-header";

export interface NameProfileEditorProps {
  className?: string;
  initialRecords: NameProfileFormValues;
  name: string;
  presentation?: "dialog" | "inline";
  slots?: {
    trigger?: ReactNode;
  };
  upload?: NameProfileEditorUploadHandlers;
}

function getMediaRecord(
  records: NameProfileFormValues,
  key: "avatar" | "header",
): string {
  return records.text.find((record) => record.key === key)?.value ?? "";
}

export function NameProfileEditor({
  className,
  initialRecords,
  name,
  presentation = "dialog",
  slots,
  upload,
}: NameProfileEditorProps) {
  const initialAvatar = getMediaRecord(initialRecords, "avatar");
  const initialHeader = getMediaRecord(initialRecords, "header");
  const [avatar, setAvatar] = useState(initialAvatar);
  const [header, setHeader] = useState(initialHeader);

  useEffect(() => {
    setAvatar(initialAvatar);
    setHeader(initialHeader);
  }, [initialAvatar, initialHeader]);

  const content = (
    <ProfileHeader
      avatar={avatar}
      className={cn("w-full max-w-md", className) ?? ""}
      header={header}
      {...(upload === undefined ? {} : { upload })}
      onAvatarChange={setAvatar}
      onHeaderChange={setHeader}
    />
  );

  if (presentation === "inline") return content;

  return (
    <Modal>
      {slots?.trigger ?? <Button>Edit profile</Button>}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog
            aria-label={`Edit ${name} profile`}
            className="w-full max-w-md bg-transparent p-0 shadow-none"
          >
            <Modal.CloseTrigger className="top-4 right-auto left-4 z-50" />
            {content}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
