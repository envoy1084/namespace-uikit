"use client";

// @demo-title Variants
import { CellSwitch } from "@thenamespace/uikit";

function SwitchContents({ label }: { label: string }) {
  return (
    <CellSwitch.Trigger>
      <CellSwitch.Label>{label}</CellSwitch.Label>
      <CellSwitch.Control />
    </CellSwitch.Trigger>
  );
}

export const ProVariantsExample = () => (
  <div className="flex w-[252px] flex-col gap-3">
    {(["default", "secondary"] as const).map((variant) => (
      <div className="flex flex-col gap-1" key={variant}>
        <span className="text-muted text-xs">{variant}</span>
        <CellSwitch defaultSelected aria-label="Animations" variant={variant}>
          <SwitchContents label="Animations" />
        </CellSwitch>
      </div>
    ))}
  </div>
);
