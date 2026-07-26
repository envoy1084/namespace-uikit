"use client";

import type { RegistrationSuccessDetails } from "#/components/register-name/steps/registration-success";

import { useCallback, useEffect, useState } from "react";

import { Accordion, Button, Surface } from "@thenamespace/uikit";
import { ArrowLeft01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

import { useNameRegistration } from "#/components/register-name/context";
import {
  NameRegistrationBody,
  NameRegistrationHeader,
  NameRegistrationHeading,
} from "#/components/register-name/layout";
import {
  CommitmentStep,
  CompleteRegistrationStep,
  TimerStep,
} from "#/components/register-name/steps/registration-process/steps";

const DefaultNameRegistrationGraphic = new URL(
  "../../../../assets/register-ens-header.svg",
  import.meta.url,
);

export type RegistrationProcessStep =
  | "commitment"
  | "complete-registration"
  | "timer";

export interface RegistrationProcessProps {
  initialStep?: RegistrationProcessStep;
  onBack: () => void;
  onPendingChange?: (isPending: boolean) => void;
  onSuccess: (registration: RegistrationSuccessDetails) => void;
}

export function RegistrationProcess({
  initialStep = "commitment",
  onBack,
  onPendingChange,
  onSuccess,
}: RegistrationProcessProps) {
  const { messages, registrationAttemptId, slots } = useNameRegistration();
  const [activeStep, setActiveStep] =
    useState<RegistrationProcessStep>(initialStep);
  const [expandedKeys, setExpandedKeys] = useState(
    new Set<string | number>([activeStep]),
  );
  const [commitmentError, setCommitmentError] = useState<unknown>();
  const [isPending, setIsPending] = useState(false);
  const handleTimerComplete = useCallback(
    () => setActiveStep("complete-registration"),
    [],
  );
  const handlePendingChange = useCallback(
    (pending: boolean) => {
      setIsPending(pending);
      onPendingChange?.(pending);
    },
    [onPendingChange],
  );

  useEffect(() => {
    if (registrationAttemptId === null) {
      setActiveStep("commitment");
    }
  }, [activeStep, registrationAttemptId]);

  useEffect(() => {
    setExpandedKeys(new Set([activeStep]));
  }, [activeStep]);

  return (
    <>
      <Button
        isIconOnly
        aria-label="Back to name search"
        className="absolute top-4 left-4 z-10"
        isDisabled={isPending}
        size="sm"
        variant="secondary"
        onPress={onBack}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} />
      </Button>
      <NameRegistrationHeader className="mx-auto">
        {slots.processGraphic === undefined ? (
          <img
            alt=""
            className="mx-auto w-full max-w-64"
            src={DefaultNameRegistrationGraphic.href}
          />
        ) : (
          slots.processGraphic
        )}
        <div>
          <NameRegistrationHeading className="mx-auto text-center">
            {messages.processTitle}
          </NameRegistrationHeading>
          <p className="text-muted text-center text-sm">
            {messages.processDescription}
          </p>
        </div>
      </NameRegistrationHeader>
      <NameRegistrationBody className="mt-2 flex-none">
        <Surface className="mt-2 rounded-2xl p-3" variant="secondary">
          <Accordion
            className="flex flex-col gap-2"
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
          >
            <CommitmentStep
              error={commitmentError}
              isDisabled={activeStep !== "commitment"}
              onConfirmed={() => setActiveStep("timer")}
              onErrorClear={() => setCommitmentError(undefined)}
              {...(activeStep === "commitment"
                ? { onPendingChange: handlePendingChange }
                : {})}
            />
            <TimerStep
              isCompleted={activeStep === "complete-registration"}
              isDisabled={activeStep !== "timer"}
              onComplete={handleTimerComplete}
            />
            <CompleteRegistrationStep
              isDisabled={activeStep !== "complete-registration"}
              onCommitmentInvalid={(error) => {
                setCommitmentError(error);
                setActiveStep("commitment");
              }}
              onSuccess={onSuccess}
              {...(activeStep === "complete-registration"
                ? { onPendingChange: handlePendingChange }
                : {})}
            />
          </Accordion>
        </Surface>
      </NameRegistrationBody>
    </>
  );
}
