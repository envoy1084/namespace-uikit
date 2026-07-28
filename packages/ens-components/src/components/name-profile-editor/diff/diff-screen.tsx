"use client";

import type { Hex } from "viem";

import type {
  NameProfileEditorMessages,
  NameProfileEditorPresentation,
  NameProfileEditorSlots,
} from "#/components/name-profile-editor/customization";
import type { NameProfileRecordChange } from "#/components/name-profile-editor/types";

import { useState } from "react";

import { Accordion, Button, Surface, Typography } from "@thenamespace/uikit";
import { ArrowLeft01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

import { createProfileDiffSections } from "#/components/name-profile-editor/diff/diff-records";
import { ProfileDiffSection } from "#/components/name-profile-editor/diff/diff-section";
import {
  NameProfileEditorBody,
  NameProfileEditorFooter,
  NameProfileEditorHeader,
  NameProfileEditorHeading,
} from "#/components/name-profile-editor/layout";
import { TransactionProgress } from "#/components/transaction-progress";
import { formatError } from "#/lib";
import { useEnsConfig } from "#/providers";

const ReviewGraphic = new URL(
  "../../../assets/register-ens-header.svg",
  import.meta.url,
);

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
  const sections = createProfileDiffSections(changes);
  const [expandedKeys, setExpandedKeys] = useState(
    () =>
      new Set<string | number>(
        sections[0] === undefined ? [] : [sections[0].id],
      ),
  );

  return (
    <div className="relative w-full">
      <Button
        isIconOnly
        aria-label="Back to profile editor"
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
            className="mx-auto w-full max-w-64"
            src={ReviewGraphic.href}
          />
        ) : (
          slots.reviewGraphic
        )}
        <div>
          <NameProfileEditorHeading
            className="mx-auto text-center"
            presentation={presentation}
          >
            {messages.reviewTitle}
          </NameProfileEditorHeading>
          <p className="text-muted text-center text-sm">
            {messages.reviewDescription}
          </p>
        </div>
      </NameProfileEditorHeader>

      <NameProfileEditorBody
        className="mt-2 flex-none"
        presentation={presentation}
      >
        <Surface className="mt-2 rounded-2xl p-3" variant="secondary">
          <Accordion
            className="flex flex-col gap-2"
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
          >
            {sections.map((section) => (
              <ProfileDiffSection key={section.id} section={section} />
            ))}
          </Accordion>
        </Surface>
      </NameProfileEditorBody>

      <NameProfileEditorFooter
        className="mt-5 flex-col"
        presentation={presentation}
      >
        {isConfirming ? (
          <TransactionProgress
            blockExplorerUrl={chain.blockExplorers?.default.url}
            chainId={chain.id}
            className="w-full"
            icon={slots.transactionProgressIcon}
            isConfirmed={isTransactionConfirmed}
            transactionHash={transactionHash}
          />
        ) : (
          <Button
            className="w-full"
            isDisabled={!isWalletConnected || !isUpdateAllowed}
            isPending={isPending}
            type="button"
            onPress={onUpdate}
          >
            {buttonLabel}
          </Button>
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
