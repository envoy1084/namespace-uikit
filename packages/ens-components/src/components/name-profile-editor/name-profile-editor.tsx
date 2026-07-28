"use client";

import type { Address } from "viem";

import type {
  NameProfileEditorMessages,
  NameProfileEditorPresentation,
  NameProfileEditorSlots,
} from "#/components/name-profile-editor/customization";
import type { NameProfileEditorEvents } from "#/components/name-profile-editor/events";
import type {
  NameProfileFormValues,
  NameProfileImageUpload,
} from "#/components/name-profile-editor/types";

import { useEffect, useMemo, useRef, useState } from "react";

import { Button, Modal, Surface, cn } from "@thenamespace/uikit";

import { DEFAULT_NAME_PROFILE_EDITOR_MESSAGES } from "#/components/name-profile-editor/customization";
import { ProfileEditor } from "#/components/name-profile-editor/editor/editor";

export interface NameProfileEditorProps {
  className?: string;
  events?: NameProfileEditorEvents;
  initialRecords: NameProfileFormValues;
  messages?: Partial<NameProfileEditorMessages>;
  name: string;
  presentation?: NameProfileEditorPresentation;
  resolverAddress?: Address;
  slots?: NameProfileEditorSlots;
  uploadImage?: NameProfileImageUpload | undefined;
}

export function NameProfileEditor({
  className,
  events = {},
  initialRecords,
  messages: messageOverrides,
  name,
  presentation = "dialog",
  resolverAddress,
  slots = {},
  uploadImage,
}: NameProfileEditorProps) {
  const messages = useMemo(
    () => ({
      ...DEFAULT_NAME_PROFILE_EDITOR_MESSAGES,
      ...messageOverrides,
    }),
    [messageOverrides],
  );
  const [confirmedRecords, setConfirmedRecords] = useState(initialRecords);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [resetVersion, setResetVersion] = useState(0);
  const shouldResetOnOpenRef = useRef(false);

  useEffect(() => {
    setConfirmedRecords(initialRecords);
    setResetVersion((current) => current + 1);
  }, [initialRecords]);

  const handleDone = () => {
    if (presentation === "dialog") {
      shouldResetOnOpenRef.current = true;
      return;
    }
    setResetVersion((current) => current + 1);
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen || !shouldResetOnOpenRef.current) return;
    shouldResetOnOpenRef.current = false;
    setResetVersion((current) => current + 1);
  };

  const content = (
    <ProfileEditor
      events={events}
      initialRecords={confirmedRecords}
      messages={messages}
      name={name}
      presentation={presentation}
      resetVersion={resetVersion}
      slots={slots}
      uploadImage={uploadImage}
      onConfirmed={setConfirmedRecords}
      onDone={handleDone}
      onPendingChange={setIsTransactionPending}
      {...(resolverAddress === undefined ? {} : { resolverAddress })}
    />
  );

  if (presentation === "inline") {
    return (
      <Surface
        className={
          cn("relative flex w-full max-w-md flex-col rounded-3xl", className) ??
          ""
        }
        data-name-profile-editor-presentation="inline"
      >
        {content}
      </Surface>
    );
  }

  return (
    <Modal onOpenChange={handleDialogOpenChange}>
      {slots.trigger ?? (
        <Button variant="secondary">{messages.triggerLabel}</Button>
      )}
      <Modal.Backdrop
        data-name-profile-editor-presentation="dialog"
        isDismissable={!isTransactionPending}
        isKeyboardDismissDisabled={isTransactionPending}
      >
        <Modal.Container>
          <Modal.Dialog aria-label={`Edit ${name} profile`} className="p-0">
            <Modal.CloseTrigger
              className="bg-background text-foreground z-20 size-8 shadow-sm"
              isDisabled={isTransactionPending}
            />
            {content}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
