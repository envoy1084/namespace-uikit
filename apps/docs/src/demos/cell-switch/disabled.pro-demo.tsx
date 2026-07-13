"use client";

// @demo-title Disabled
import { CellSwitch } from "@thenamespace/uikit";

function SwitchContents({ label }: { label: string }) {
  return (
    <CellSwitch.Trigger>
      <CellSwitch.Label>{label}</CellSwitch.Label>
      <CellSwitch.Control />
    </CellSwitch.Trigger>
  );
}

export const ProDisabledExample = () => (
  <div className="flex w-[252px] flex-col gap-2">
    <CellSwitch defaultSelected isDisabled aria-label="Animations">
      <SwitchContents label="Animations" />
    </CellSwitch>
    <CellSwitch isDisabled aria-label="Animations" defaultSelected={false}>
      <SwitchContents label="Animations" />
    </CellSwitch>
  </div>
);
