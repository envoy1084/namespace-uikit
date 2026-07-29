"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Button, Modal, Surface, cn } from "@thenamespace/uikit";
import type { Address } from "viem";

import type {
  NameProfileEditorMessages,
  NameProfileEditorPresentation,
  NameProfileEditorSlots,
} from "#/components/name-profile-editor/customization";
import { DEFAULT_NAME_PROFILE_EDITOR_MESSAGES } from "#/components/name-profile-editor/customization";
import { ProfileEditor } from "#/components/name-profile-editor/editor/editor";
import type { NameProfileEditorEvents } from "#/components/name-profile-editor/events";
import type {
  NameProfileFormValues,
  NameProfileImageUpload,
} from "#/components/name-profile-editor/types";

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

const defaultEvents: NameProfileEditorEvents = {};
const defaultSlots: NameProfileEditorSlots = {};

export function NameProfileEditor({
  className,
  events = defaultEvents,
  initialRecords,
  messages: messageOverrides,
  name,
  presentation = "dialog",
  resolverAddress,
  slots = defaultSlots,
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
  const lifecycleIdentity = `${name}\u0000${resolverAddress ?? ""}\u0000${JSON.stringify(initialRecords)}`;
  const lastLifecycleIdentityRef = useRef(lifecycleIdentity);

  useEffect(() => {
    if (lastLifecycleIdentityRef.current === lifecycleIdentity) return;
    lastLifecycleIdentityRef.current = lifecycleIdentity;
    setConfirmedRecords(initialRecords);
    setResetVersion((current) => current + 1);
  }, [initialRecords, lifecycleIdentity]);

  const handleDone = () => {
    if (presentation === "dialog") return;
    setResetVersion((current) => current + 1);
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (isOpen) return;
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
  const dialogLabel = messages.dialogLabel.replaceAll("{name}", name);

  if (presentation === "inline") {
    return (
      <Surface
        className={cn("relative flex w-full max-w-md flex-col rounded-3xl", className) ?? ""}
        data-name-profile-editor-presentation="inline"
      >
        {content}
      </Surface>
    );
  }

  return (
    <Modal onOpenChange={handleDialogOpenChange}>
      {slots.trigger ?? <Button variant="secondary">{messages.triggerLabel}</Button>}
      <Modal.Backdrop
        data-name-profile-editor-presentation="dialog"
        isDismissable={!isTransactionPending}
        isKeyboardDismissDisabled={isTransactionPending}
      >
        <Modal.Container>
          <Modal.Dialog aria-label={dialogLabel} className="p-0">
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
