"use client";

// @demo-title Secondary Group
import { useState } from "react";

import { CellSwitch } from "@thenamespace/uikit";

function SwitchContents({ label }: { label: string }) {
  return (
    <CellSwitch.Trigger>
      <CellSwitch.Label>{label}</CellSwitch.Label>
      <CellSwitch.Control />
    </CellSwitch.Trigger>
  );
}

function ControlledSwitch({
  defaultSelected,
  label,
  variant = "default",
}: {
  defaultSelected: boolean;
  label: string;
  variant?: "default" | "secondary";
}) {
  const [selected, setSelected] = useState(defaultSelected);
  return (
    <CellSwitch
      aria-label={label}
      isSelected={selected}
      variant={variant}
      onChange={setSelected}
    >
      <SwitchContents label={label} />
    </CellSwitch>
  );
}

export const ProSecondaryGroupExample = () => (
  <div className="flex w-[252px] flex-col gap-2">
    <ControlledSwitch
      defaultSelected
      label="Notifications"
      variant="secondary"
    />
    <ControlledSwitch
      defaultSelected={false}
      label="Marketing emails"
      variant="secondary"
    />
  </div>
);
