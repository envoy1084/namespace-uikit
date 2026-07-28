import { useEffect, useRef } from "react";

import { Button, Surface, Typography } from "@thenamespace/uikit";

import { FlowSuccessHeader } from "#/components/flow-success-header";
import type {
  NameProfileEditorMessages,
  NameProfileEditorPresentation,
  NameProfileEditorSlots,
} from "#/components/name-profile-editor/customization";
import { NameProfileEditorBody } from "#/components/name-profile-editor/layout";
import type { ProfileUpdateSubmissionSuccess } from "#/components/name-profile-editor/submission/profile-update-submission";

export function ProfileUpdateSuccess({
  messages,
  name,
  onDone,
  presentation,
  slots,
  update,
}: {
  messages: NameProfileEditorMessages;
  name: string;
  onDone: () => void;
  presentation: NameProfileEditorPresentation;
  slots: NameProfileEditorSlots;
  update: ProfileUpdateSubmissionSuccess;
}) {
  const changeCount = update.review.changes.length;
  const screenRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    screenRef.current?.focus();
  }, []);

  return (
    <NameProfileEditorBody className="flex-none" presentation={presentation}>
      <output
        ref={screenRef}
        aria-label={`${messages.successTitle}: ${name}`}
        className="flex flex-col items-center px-1 py-4 text-center outline-none"
        tabIndex={-1}
      >
        <FlowSuccessHeader
          description={messages.successDescription}
          graphic={slots.successGraphic}
          name={name}
          title={messages.successTitle}
        />

        <Surface
          className="mt-6 flex w-full items-center justify-between gap-4 rounded-2xl p-4"
          variant="secondary"
        >
          <Typography.Paragraph color="muted" size="sm">
            {messages.updatedRecordsLabel}
          </Typography.Paragraph>
          <Typography.Paragraph size="sm" weight="medium">
            {changeCount}
          </Typography.Paragraph>
        </Surface>

        <Button
          className="mt-6 w-full"
          onPress={onDone}
          {...(presentation === "dialog" ? { slot: "close" } : {})}
        >
          {messages.doneLabel}
        </Button>
      </output>
    </NameProfileEditorBody>
  );
}
