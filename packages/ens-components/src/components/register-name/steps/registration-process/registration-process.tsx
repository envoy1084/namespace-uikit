"use client";

import { useCallback, useEffect, useState } from "react";

import { Accordion, Surface } from "@thenamespace/uikit";

import { useRegisterName } from "#/components/register-name/context";
import {
  CommitmentStep,
  CompleteRegistrationStep,
  TimerStep,
} from "#/components/register-name/steps/registration-process/steps";

type RegistrationProcessStep = "commitment" | "complete-registration" | "timer";

export function RegistrationProcess() {
  const { commitmentId } = useRegisterName();
  const [activeStep, setActiveStep] = useState<RegistrationProcessStep>(
    commitmentId === null ? "commitment" : "timer",
  );
  const [expandedKeys, setExpandedKeys] = useState(
    new Set<string | number>([activeStep]),
  );
  const handleContinueToRegistration = useCallback(
    () => setActiveStep("complete-registration"),
    [],
  );

  useEffect(() => {
    setActiveStep(commitmentId === null ? "commitment" : "timer");
  }, [commitmentId]);

  useEffect(() => {
    setExpandedKeys(new Set([activeStep]));
  }, [activeStep]);

  return (
    <Surface className="mt-2 rounded-2xl p-3" variant="secondary">
      <Accordion
        className="flex flex-col gap-2"
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
      >
        <CommitmentStep isDisabled={activeStep !== "commitment"} />
        <TimerStep
          isDisabled={activeStep !== "timer"}
          onContinue={handleContinueToRegistration}
        />
        <CompleteRegistrationStep
          isDisabled={activeStep !== "complete-registration"}
        />
      </Accordion>
    </Surface>
  );
}
