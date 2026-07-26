"use client";

import { useCallback, useEffect, useState } from "react";

import { Accordion, Surface } from "@thenamespace/uikit";

import { useRegisterName } from "#/components/register-name/context";
import { RegistrationSuccess } from "#/components/register-name/steps/registration-process/registration-success";
import {
  CommitmentStep,
  CompleteRegistrationStep,
  TimerStep,
} from "#/components/register-name/steps/registration-process/steps";

export type RegistrationProcessStep =
  | "commitment"
  | "complete-registration"
  | "timer";

export interface RegistrationProcessProps {
  initialStep?: RegistrationProcessStep;
  onDone: () => void;
}

export function RegistrationProcess({
  initialStep = "commitment",
  onDone,
}: RegistrationProcessProps) {
  const { commitmentId } = useRegisterName();
  const [activeStep, setActiveStep] =
    useState<RegistrationProcessStep>(initialStep);
  const [expandedKeys, setExpandedKeys] = useState(
    new Set<string | number>([activeStep]),
  );
  const [registeredName, setRegisteredName] = useState<string>();
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

  if (registeredName !== undefined) {
    return <RegistrationSuccess name={registeredName} onDone={onDone} />;
  }

  return (
    <Surface className="mt-2 rounded-2xl p-3" variant="secondary">
      <Accordion
        className="flex flex-col gap-2"
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
      >
        <CommitmentStep isDisabled={activeStep !== "commitment"} />
        <TimerStep
          isCompleted={activeStep === "complete-registration"}
          isDisabled={activeStep !== "timer"}
          onComplete={handleTimerComplete}
        />
        <CompleteRegistrationStep
          isDisabled={activeStep !== "complete-registration"}
          onSuccess={(name) => setRegisteredName(name)}
        />
      </Accordion>
    </Surface>
  );
}
