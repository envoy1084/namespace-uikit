"use client";

import { useEffect, useState } from "react";

import { Accordion, Button, Spinner, Typography } from "@thenamespace/uikit";

import { useRegisterName } from "#/components/register-name/context";
import { useCommitments, useCommitmentStatus } from "#/hooks";
import { formatError } from "#/lib";

export interface TimerStepProps {
  isDisabled?: boolean;
  onReady?: () => void;
}

function formatRemainingTime(seconds: number) {
  const hours = Math.floor(seconds / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((part) => part.toString().padStart(2, "0"))
    .join(":");
}

export function TimerStep({ isDisabled = true, onReady }: TimerStepProps) {
  const { commitmentId, setCommitmentId } = useRegisterName();
  const { delete: deleteCommitment, get } = useCommitments();
  const storedCommitment =
    commitmentId === null ? undefined : get(commitmentId);
  const status = useCommitmentStatus({
    commitment: storedCommitment?.commitment,
    ...(storedCommitment === undefined
      ? {}
      : { registrarAddress: storedCommitment.registrarAddress }),
    query: {
      retry: (failureCount, error) =>
        error === "CONTRACT_READ_FAILED" && failureCount < 3,
    },
  });
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (status.data?.state !== "WAITING") return;

    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(interval);
  }, [status.data?.state, status.dataUpdatedAt]);

  useEffect(() => {
    if (commitmentId !== null && storedCommitment === undefined) {
      setCommitmentId(null);
      return;
    }

    if (status.data?.state === "READY") {
      onReady?.();
      return;
    }

    if (
      commitmentId !== null &&
      (status.data?.state === "EXPIRED" || status.data?.state === "NOT_FOUND")
    ) {
      deleteCommitment(commitmentId);
      setCommitmentId(null);
    }
  }, [
    commitmentId,
    deleteCommitment,
    onReady,
    setCommitmentId,
    status.data?.state,
    storedCommitment,
  ]);

  const elapsedSeconds = Math.max(
    0,
    Math.floor((now - status.dataUpdatedAt) / 1_000),
  );
  const remainingSeconds =
    status.data?.state === "WAITING"
      ? Math.max(0, Number(status.data.remainingSeconds) - elapsedSeconds)
      : 0;

  return (
    <Accordion.Item
      className="bg-surface overflow-hidden rounded-xl [&::after]:hidden"
      id="timer"
      isDisabled={isDisabled}
    >
      <Accordion.Heading>
        <Accordion.Trigger className="gap-3 px-4 py-3">
          <span className="border-default text-muted flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
            2
          </span>
          <span>Timer started</span>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body className="px-4 pt-2 pb-4 text-center">
          {status.isPending ? (
            <div className="flex items-center justify-center gap-2 py-3">
              <Spinner className="size-3" size="sm" />
              <Typography.Paragraph color="muted" size="sm">
                Checking commitment…
              </Typography.Paragraph>
            </div>
          ) : status.isError ? (
            <div className="py-2">
              <Typography.Paragraph className="text-danger" size="sm">
                {formatError(status.error)}
              </Typography.Paragraph>
              <Button
                className="mt-3"
                size="sm"
                variant="secondary"
                onPress={() => status.refetch()}
              >
                Try again
              </Button>
            </div>
          ) : status.data?.state === "WAITING" ? (
            <>
              <Typography.Heading
                className="text-foreground font-mono text-3xl font-semibold tabular-nums"
                level={3}
              >
                {formatRemainingTime(remainingSeconds)}
              </Typography.Heading>
              <Typography.Paragraph className="mt-2" color="muted" size="sm">
                Your commitment is confirmed. Registration will unlock
                automatically.
              </Typography.Paragraph>
            </>
          ) : status.data?.state === "READY" ? (
            <Typography.Paragraph color="muted" size="sm">
              Your commitment is ready for registration.
            </Typography.Paragraph>
          ) : null}
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
