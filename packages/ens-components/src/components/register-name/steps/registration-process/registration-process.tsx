"use client";

import { useEffect, useState } from "react";

import { Accordion, Surface } from "@thenamespace/uikit";

import { useRegisterName } from "#/components/register-name/context";
import {
  CommitmentStep,
  CompleteRegistrationStep,
  TimerStep,
} from "#/components/register-name/steps/registration-process/steps";

export function RegistrationProcess() {
  const { commitmentId } = useRegisterName();
  const activeStep = commitmentId === null ? "commitment" : "timer";
  const [expandedKeys, setExpandedKeys] = useState(
    new Set<string | number>([activeStep]),
  );

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
        <TimerStep isDisabled={activeStep !== "timer"} />
        <CompleteRegistrationStep />
      </Accordion>
    </Surface>
  );
}
