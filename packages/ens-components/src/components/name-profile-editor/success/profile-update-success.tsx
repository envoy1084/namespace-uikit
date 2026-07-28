import type {
  NameProfileEditorMessages,
  NameProfileEditorPresentation,
  NameProfileEditorSlots,
} from "#/components/name-profile-editor/customization";
import type { ProfileUpdateSubmissionSuccess } from "#/components/name-profile-editor/submission/profile-update-submission";

import { useEffect, useRef } from "react";

import { Button, Surface, Typography } from "@thenamespace/uikit";

import { NameProfileEditorBody } from "#/components/name-profile-editor/layout";

const DefaultProfileUpdateSuccessGraphic = new URL(
  "../../../assets/register-ens-success.svg",
  import.meta.url,
);

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
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    screenRef.current?.focus();
  }, []);

  return (
    <NameProfileEditorBody className="flex-none" presentation={presentation}>
      <div
        ref={screenRef}
        aria-label={`${messages.successTitle}: ${name}`}
        className="flex flex-col items-center px-1 py-4 text-center outline-none"
        role="status"
        tabIndex={-1}
      >
        {slots.successGraphic === undefined ? (
          <img
            alt=""
            className="h-auto w-full max-w-48"
            src={DefaultProfileUpdateSuccessGraphic.href}
          />
        ) : (
          slots.successGraphic
        )}

        <Typography.Paragraph className="mt-5" color="muted" size="sm">
          {messages.successTitle}
        </Typography.Paragraph>
        <Typography.Heading
          className="mt-1 max-w-full text-center text-2xl font-semibold break-all"
          level={3}
        >
          {name}
        </Typography.Heading>
        <Typography.Paragraph className="mt-2" color="muted" size="sm">
          {messages.successDescription}
        </Typography.Paragraph>

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
      </div>
    </NameProfileEditorBody>
  );
}
