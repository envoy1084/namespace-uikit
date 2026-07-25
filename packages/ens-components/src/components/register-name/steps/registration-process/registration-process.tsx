"use client";

import { useState } from "react";

import { Accordion, Surface } from "@thenamespace/uikit";

import {
  CommitmentStep,
  CompleteRegistrationStep,
  TimerStep,
} from "#/components/register-name/steps/registration-process/steps";

export function RegistrationProcess() {
  const [expandedKeys, setExpandedKeys] = useState(
    new Set<string | number>(["commitment"]),
  );

  return (
    <Surface className="mt-2 rounded-2xl p-3" variant="secondary">
      <Accordion
        className="flex flex-col gap-2"
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
      >
        <CommitmentStep />
        <TimerStep />
        <CompleteRegistrationStep />
      </Accordion>
    </Surface>
  );
}
