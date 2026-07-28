"use client";

import type {
  NameProfileFormValues,
  NameProfileImageUpload,
} from "#/components/name-profile-editor/types";

import type { ReactNode } from "react";

import { Button, Modal, Surface, cn } from "@thenamespace/uikit";

import { ProfileEditor } from "#/components/name-profile-editor/editor/editor";

export interface NameProfileEditorProps {
  className?: string;
  initialRecords: NameProfileFormValues;
  name: string;
  presentation?: "dialog" | "inline";
  slots?: {
    trigger?: ReactNode;
  };
  uploadImage?: NameProfileImageUpload | undefined;
}

export function NameProfileEditor({
  className,
  initialRecords,
  name,
  presentation = "dialog",
  slots,
  uploadImage,
}: NameProfileEditorProps) {
  const content = (
    <ProfileEditor
      initialRecords={initialRecords}
      name={name}
      presentation={presentation}
      uploadImage={uploadImage}
    />
  );

  if (presentation === "inline") {
    return (
      <Surface
        className={
          cn("relative flex w-full max-w-md flex-col rounded-3xl", className) ??
          ""
        }
      >
        {content}
      </Surface>
    );
  }

  return (
    <Modal>
      {slots?.trigger ?? <Button>Edit profile</Button>}
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog aria-label={`Edit ${name} profile`} className="p-0">
            <Modal.CloseTrigger className="bg-background text-foreground z-20 size-8 shadow-sm" />
            {content}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
