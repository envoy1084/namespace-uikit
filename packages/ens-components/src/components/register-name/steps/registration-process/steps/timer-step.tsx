"use client";

import { useEffect, useState } from "react";

import {
  Accordion,
  Button,
  ProgressCircle,
  Spinner,
  Typography,
} from "@thenamespace/uikit";
import {
  CheckmarkCircle02Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

import { useRegisterName } from "#/components/register-name/context";
import { useCommitments, useCommitmentStatus } from "#/hooks";
import { formatError } from "#/lib";

export interface TimerStepProps {
  isDisabled?: boolean;
  onContinue: () => void;
}

function formatRemainingTime(seconds: number) {
  const hours = Math.floor(seconds / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((part) => part.toString().padStart(2, "0"))
    .join(":");
}

export function TimerStep({ isDisabled = true, onContinue }: TimerStepProps) {
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
  const totalSeconds =
    status.data === undefined
      ? 0
      : Number(status.data.validFrom - status.data.submittedAt);
  const progress =
    status.data?.state === "READY" || totalSeconds <= 0
      ? 100
      : Math.min(
          100,
          Math.max(0, ((totalSeconds - remainingSeconds) / totalSeconds) * 100),
        );
  const isReady = status.data?.state === "READY";

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
          <span>{isReady ? "Commitment ready" : "Timer started"}</span>
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
          ) : status.data?.state === "WAITING" || isReady ? (
            <>
              <div className="relative mx-auto size-36">
                <ProgressCircle
                  aria-label={
                    isReady
                      ? "Commitment ready"
                      : `${formatRemainingTime(remainingSeconds)} remaining`
                  }
                  className="size-full"
                  color={isReady ? "success" : "default"}
                  value={progress}
                >
                  <ProgressCircle.Track
                    className="size-36!"
                    strokeWidth={5}
                    viewBox="0 0 36 36"
                  >
                    <ProgressCircle.TrackCircle
                      cx={18}
                      cy={18}
                      r={15}
                      strokeWidth={5}
                    />
                    <ProgressCircle.FillCircle
                      cx={18}
                      cy={18}
                      r={15}
                      strokeWidth={5}
                    />
                  </ProgressCircle.Track>
                </ProgressCircle>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  {isReady ? (
                    <div className="text-success flex flex-col items-center gap-1">
                      <HugeiconsIcon
                        className="size-7"
                        icon={CheckmarkCircle02Icon}
                        strokeWidth={2}
                      />
                      <span className="text-sm font-semibold">Ready</span>
                    </div>
                  ) : (
                    <span className="text-foreground font-mono text-xl font-semibold tabular-nums">
                      {formatRemainingTime(remainingSeconds)}
                    </span>
                  )}
                </div>
              </div>
              <Typography.Paragraph
                className="mx-auto mt-4 max-w-72"
                color="muted"
                size="sm"
              >
                {isReady
                  ? "Your commitment has matured and the name is ready to register."
                  : "Your commitment is confirmed. Keep this window open or return later."}
              </Typography.Paragraph>
              {isReady ? (
                <Button className="mt-4 w-full" onPress={onContinue}>
                  Continue to registration
                </Button>
              ) : null}
            </>
          ) : null}
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
