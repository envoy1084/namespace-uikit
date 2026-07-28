"use client";

import { Accordion, Button, Typography } from "@thenamespace/uikit";
import { useConnection } from "wagmi";

import { useNameRegistration } from "#/components/name-registration/context";
import { useCommitmentSubmission } from "#/components/name-registration/steps/registration-process/steps/commitment/use-commitment-submission";
import { TransactionProgress } from "#/components/transaction-progress";
import { formatError } from "#/lib";
import { useEnsConfig } from "#/providers";

export interface CommitmentStepProps {
  error?: unknown;
  isDisabled?: boolean;
  onConfirmed: () => void;
  onErrorClear?: () => void;
  onPendingChange?: (isPending: boolean) => void;
}

export function CommitmentStep({
  error,
  isDisabled = false,
  onConfirmed,
  onErrorClear,
  onPendingChange,
}: CommitmentStepProps) {
  const connection = useConnection();
  const { chain } = useEnsConfig();
  const { slots } = useNameRegistration();
  const submission = useCommitmentSubmission({
    onConfirmed,
    ...(error === undefined ? {} : { error }),
    ...(onErrorClear === undefined ? {} : { onErrorClear }),
    ...(onPendingChange === undefined ? {} : { onPendingChange }),
  });

  return (
    <Accordion.Item
      className="bg-surface overflow-hidden rounded-xl [&::after]:hidden"
      id="commitment"
      isDisabled={isDisabled}
    >
      <Accordion.Heading>
        <Accordion.Trigger className="gap-3 px-4 py-3">
          <span className="bg-foreground text-background flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            1
          </span>
          <span className="text-foreground">Commitment</span>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body className="px-4 pt-2 pb-4 text-center">
          <Typography.Heading
            className="text-foreground text-center text-base font-semibold"
            level={3}
          >
            Start your registration
          </Typography.Heading>
          <Typography.Paragraph
            className="mx-auto mt-1 text-center leading-[1.2]"
            color="muted"
            size="xs"
          >
            Deploy or select a resolver, then submit your secure commitment.
          </Typography.Paragraph>
          {submission.status === "confirming" ? (
            <TransactionProgress
              account={connection.address}
              blockExplorerUrl={chain.blockExplorers?.default.url}
              chainId={chain.id}
              className="mt-4"
              icon={slots.transactionProgressIcon}
              isConfirmed={submission.isTransactionConfirmed}
              transactionHash={submission.transactionHash}
            />
          ) : (
            <Button
              className="mt-4 w-full"
              isDisabled={connection.address === undefined}
              isPending={submission.isPending}
              onPress={submission.submit}
            >
              {submission.buttonLabel}
            </Button>
          )}
          {!submission.isPending && submission.error !== undefined ? (
            <Typography.Paragraph
              className="text-danger mx-auto mt-2 text-center"
              size="xs"
              role="alert"
            >
              {formatError(submission.error)}
            </Typography.Paragraph>
          ) : null}
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
