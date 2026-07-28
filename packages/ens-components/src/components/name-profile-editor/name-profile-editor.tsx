"use client";

import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

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
}

export function NameProfileEditor({
  className,
  name,
  presentation = "dialog",
  slots,
}: NameProfileEditorProps) {
  const content = <ProfileEditor />;

  if (presentation === "inline") {
    return (
      <Surface
        className={
          cn(
            "relative flex w-full max-w-md flex-col rounded-3xl p-6",
            className,
          ) ?? ""
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
          <Modal.Dialog aria-label={`Edit ${name} profile`}>
            <Modal.CloseTrigger />
            {content}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
