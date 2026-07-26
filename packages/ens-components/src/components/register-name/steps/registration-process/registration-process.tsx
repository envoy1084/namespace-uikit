"use client";

import type { RegistrationSuccessDetails } from "#/components/register-name/steps/registration-process/registration-success";

import { useCallback, useEffect, useState } from "react";

import { Accordion, Button, Modal, Surface } from "@thenamespace/uikit";
import { ArrowLeft01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

import { useRegisterName } from "#/components/register-name/context";
import {
  CommitmentStep,
  CompleteRegistrationStep,
  TimerStep,
} from "#/components/register-name/steps/registration-process/steps";

const RegisterEnsHeader = new URL(
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
  onSuccess: (registration: RegistrationSuccessDetails) => void;
}

export function RegistrationProcess({
  initialStep = "commitment",
  onBack,
  onSuccess,
}: RegistrationProcessProps) {
  const { commitmentId } = useRegisterName();
  const [activeStep, setActiveStep] =
    useState<RegistrationProcessStep>(initialStep);
  const [expandedKeys, setExpandedKeys] = useState(
    new Set<string | number>([activeStep]),
  );
  const [commitmentError, setCommitmentError] = useState<unknown>();
  const handleTimerComplete = useCallback(
    () => setActiveStep("complete-registration"),
    [],
  );

  useEffect(() => {
    if (commitmentId === null) {
      setActiveStep("commitment");
    } else if (activeStep === "commitment") {
      setActiveStep("timer");
    }
  }, [activeStep, commitmentId]);

  useEffect(() => {
    setExpandedKeys(new Set([activeStep]));
  }, [activeStep]);

  return (
    <>
      <Button
        isIconOnly
        aria-label="Back to name search"
        className="absolute top-4 left-4 z-10"
        size="sm"
        variant="secondary"
        onPress={onBack}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} />
      </Button>
      <Modal.Header className="mx-auto">
        <img
          alt=""
          className="mx-auto w-full max-w-64"
          src={RegisterEnsHeader.href}
        />
        <div>
          <Modal.Heading className="mx-auto text-center">
            ENS Registration Process
          </Modal.Heading>
          <p className="text-muted text-center text-sm">
            Registration consists of 3 steps
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="flex-none">
        <Surface className="mt-2 rounded-2xl p-3" variant="secondary">
          <Accordion
            className="flex flex-col gap-2"
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
          >
            <CommitmentStep
              error={commitmentError}
              isDisabled={activeStep !== "commitment"}
              onErrorClear={() => setCommitmentError(undefined)}
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
            />
          </Accordion>
        </Surface>
      </Modal.Body>
    </>
  );
}
