"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Accordion, Button, Surface, Typography } from "@thenamespace/uikit";
import { ArrowLeft01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import type { Hex } from "viem";

import type {
  NameProfileEditorMessages,
  NameProfileEditorPresentation,
  NameProfileEditorSlots,
} from "#/components/name-profile-editor/customization";
import { createProfileDiffSections } from "#/components/name-profile-editor/diff/diff-records";
import { ProfileDiffSection } from "#/components/name-profile-editor/diff/diff-section";
import {
  NameProfileEditorBody,
  NameProfileEditorFooter,
  NameProfileEditorHeader,
  NameProfileEditorHeading,
} from "#/components/name-profile-editor/layout";
import type { NameProfileRecordChange } from "#/components/name-profile-editor/types";
import { TransactionProgress } from "#/components/transaction-progress";
import { formatError } from "#/lib";
import { useEnsConfig } from "#/providers";

const ReviewGraphic = new URL("../../../assets/register-ens-header.svg", import.meta.url);

export function ProfileDiffScreen({
  buttonLabel,
  changes,
  error,
  isConfirming,
  isPending,
  isTransactionConfirmed,
  isUpdateAllowed,
  isWalletConnected,
  messages,
  name,
  onBack,
  onUpdate,
  presentation,
  slots,
  transactionHash,
}: {
  buttonLabel: string;
  changes: readonly NameProfileRecordChange[];
  error?: unknown;
  isConfirming: boolean;
  isPending: boolean;
  isTransactionConfirmed: boolean;
  isUpdateAllowed: boolean;
  isWalletConnected: boolean;
  messages: NameProfileEditorMessages;
  name: string;
  onBack: () => void;
  onUpdate: () => void;
  presentation: NameProfileEditorPresentation;
  slots: NameProfileEditorSlots;
  transactionHash?: Hex | undefined;
}) {
  const { chain } = useEnsConfig();
  const headingId = useId();
  const updateStatusId = useId();
  const screenRef = useRef<HTMLDivElement>(null);
  const sections = createProfileDiffSections(changes);
  const [expandedKeys, setExpandedKeys] = useState(
    () => new Set<string | number>(sections[0] === undefined ? [] : [sections[0].id]),
  );

  useEffect(() => {
    screenRef.current?.focus();
  }, []);

  return (
    <div
      ref={screenRef}
      aria-labelledby={headingId}
      className="relative w-full outline-none"
      tabIndex={-1}
    >
      <Button
        isIconOnly
        aria-label={messages.backLabel}
        className="absolute top-4 left-4 z-10"
        isDisabled={isPending}
        size="sm"
        type="button"
        variant="secondary"
        onPress={onBack}
      >
        <HugeiconsIcon aria-hidden icon={ArrowLeft01Icon} />
      </Button>

      <NameProfileEditorHeader className="mx-auto" presentation={presentation}>
        {slots.reviewGraphic === undefined ? (
          <img
            alt=""
            className="mx-auto w-full max-w-56 min-[420px]:max-w-64"
            src={ReviewGraphic.href}
          />
        ) : (
          slots.reviewGraphic
        )}
        <div>
          <NameProfileEditorHeading
            className="mx-auto text-center"
            id={headingId}
            presentation={presentation}
          >
            {messages.reviewTitle}
          </NameProfileEditorHeading>
          <p className="text-muted text-center text-sm">{messages.reviewDescription}</p>
        </div>
      </NameProfileEditorHeader>

      <NameProfileEditorBody
        className="mt-2 flex-none px-3 min-[420px]:px-6"
        presentation={presentation}
      >
        <Surface className="mt-2 rounded-2xl p-2 min-[420px]:p-3" variant="secondary">
          <Accordion
            className="flex flex-col gap-2"
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
          >
            {sections.map((section) => (
              <ProfileDiffSection key={section.id} messages={messages} section={section} />
            ))}
          </Accordion>
        </Surface>
      </NameProfileEditorBody>

      <NameProfileEditorFooter
        className="mt-5 flex-col px-3 pb-3 min-[420px]:px-6 min-[420px]:pb-6"
        presentation={presentation}
      >
        {isConfirming ? (
          <TransactionProgress
            blockExplorerUrl={chain.blockExplorers?.default.url}
            chainId={chain.id}
            className="w-full"
            icon={slots.transactionProgressIcon}
            isConfirmed={isTransactionConfirmed}
            label={messages.transactionProgressLabel}
            linkLabel={messages.explorerLinkLabel}
            transactionHash={transactionHash}
          />
        ) : (
          <Button
            aria-describedby={updateStatusId}
            className="w-full"
            isDisabled={!isWalletConnected || !isUpdateAllowed}
            isPending={isPending}
            type="button"
            onPress={onUpdate}
          >
            {buttonLabel}
          </Button>
        )}
        {isConfirming ? null : (
          <span aria-live="polite" className="sr-only" id={updateStatusId}>
            {buttonLabel}
          </span>
        )}

        {error === undefined ? null : (
          <Typography.Paragraph
            className="text-danger mx-auto mt-2 text-center"
            role="alert"
            size="xs"
          >
            {formatError(error, { name })}
          </Typography.Paragraph>
        )}
      </NameProfileEditorFooter>
    </div>
  );
}
