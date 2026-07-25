"use client";

import { useEffect, useState } from "react";

import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { Accordion, ProgressCircle, Typography } from "@thenamespace/uikit";

import {
  COMMITMENT_WAIT_DURATION_MS,
  useRegisterName,
} from "#/components/register-name/context";
import { useCommitments } from "#/hooks";

const COMMITMENT_WAIT_DURATION_SECONDS = COMMITMENT_WAIT_DURATION_MS / 1_000;
const TIMER_NUMBER_FORMAT = {
  minimumIntegerDigits: 2,
  useGrouping: false,
} as const;

export interface TimerStepProps {
  isCompleted?: boolean;
  isDisabled?: boolean;
  onComplete: () => void;
}

export function TimerStep({
  isCompleted = false,
  isDisabled = true,
  onComplete,
}: TimerStepProps) {
  const { commitmentId, setCommitmentId } = useRegisterName();
  const { get } = useCommitments();
  const storedCommitment =
    commitmentId === null ? undefined : get(commitmentId);
  const [now, setNow] = useState(Date.now());
  const deadline =
    storedCommitment === undefined
      ? null
      : storedCommitment.createdAt + COMMITMENT_WAIT_DURATION_MS;

  useEffect(() => {
    if (commitmentId !== null && storedCommitment === undefined) {
      setCommitmentId(null);
    }
  }, [commitmentId, setCommitmentId, storedCommitment]);

  useEffect(() => {
    if (deadline === null || isCompleted) return;

    const updateTimer = () => {
      const currentTime = Date.now();
      setNow(currentTime);

      if (currentTime >= deadline) {
        onComplete();
      }
    };

    updateTimer();
    const interval = window.setInterval(updateTimer, 1_000);
    return () => window.clearInterval(interval);
  }, [deadline, isCompleted, onComplete]);

  const remainingSeconds =
    deadline === null
      ? COMMITMENT_WAIT_DURATION_SECONDS
      : Math.max(0, Math.ceil((deadline - now) / 1_000));
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progress =
    ((COMMITMENT_WAIT_DURATION_SECONDS - remainingSeconds) /
      COMMITMENT_WAIT_DURATION_SECONDS) *
    100;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <Accordion.Item
      className="bg-surface overflow-hidden rounded-xl [&::after]:hidden"
      id="timer"
      isDisabled={isDisabled}
    >
      <Accordion.Heading>
        <Accordion.Trigger className="gap-3 px-4 py-3">
          <span
            className={
              isCompleted
                ? "bg-foreground text-background flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                : "border-default text-muted flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
            }
          >
            2
          </span>
          <span>{isCompleted ? "Timer complete" : "Timer started"}</span>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      {!isCompleted ? (
        <Accordion.Panel>
          <Accordion.Body className="px-4 pt-2 pb-4 text-center">
            <div className="relative mx-auto size-28">
              <ProgressCircle
                aria-label={`${formattedTime} remaining`}
                className="size-full"
                color="default"
                value={progress}
              >
                <ProgressCircle.Track
                  className="size-28!"
                  strokeWidth={3}
                  viewBox="0 0 36 36"
                >
                  <ProgressCircle.TrackCircle
                    cx={18}
                    cy={18}
                    r={16}
                    strokeWidth={3}
                  />
                  <ProgressCircle.FillCircle
                    cx={18}
                    cy={18}
                    r={16}
                    strokeWidth={3}
                  />
                </ProgressCircle.Track>
              </ProgressCircle>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <NumberFlowGroup>
                  <span className="text-foreground font-mono text-xl font-semibold tabular-nums">
                    <NumberFlow
                      format={TIMER_NUMBER_FORMAT}
                      trend={-1}
                      value={minutes}
                    />
                    <span aria-hidden="true">:</span>
                    <NumberFlow
                      format={TIMER_NUMBER_FORMAT}
                      trend={-1}
                      value={seconds}
                    />
                  </span>
                </NumberFlowGroup>
              </div>
            </div>
            <Typography.Paragraph
              className="mx-auto mt-4 max-w-72 text-center"
              color="muted"
              size="xs"
            >
              Your commitment is confirmed. Wait for the timer to finish, or
              return later on this device to complete registration.
            </Typography.Paragraph>
          </Accordion.Body>
        </Accordion.Panel>
      ) : null}
    </Accordion.Item>
  );
}
