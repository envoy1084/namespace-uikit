"use client";

// @demo-title Settings Group
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

export const DemoSettingsGroupExample = () => (
  <div className="flex w-[252px] flex-col gap-2">
    <ControlledSwitch defaultSelected label="Animations" />
    <ControlledSwitch defaultSelected={false} label="Sounds" />
    <ControlledSwitch defaultSelected label="Haptics" />
  </div>
);
