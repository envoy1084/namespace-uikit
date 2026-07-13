"use client";

// @demo-title Default
import { CellSwitch } from "@thenamespace/uikit";

function SwitchContents({ label }: { label: string }) {
  return (
    <CellSwitch.Trigger>
      <CellSwitch.Label>{label}</CellSwitch.Label>
      <CellSwitch.Control />
    </CellSwitch.Trigger>
  );
}

export const DemoDefaultExample = () => (
  <div className="w-[252px]">
    <CellSwitch defaultSelected aria-label="Animations">
      <SwitchContents label="Animations" />
    </CellSwitch>
  </div>
);
