// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Settings Group
import { useState } from "react";

import { CellSlider } from "@thenamespace/uikit";

const decimalProps = {
  formatOptions: { maximumFractionDigits: 2, minimumFractionDigits: 2 },
  maxValue: 1,
  minValue: 0,
  step: 0.01,
} as const;

function SliderContents({ label }: { label: string }) {
  return (
    <CellSlider.Track>
      <CellSlider.Fill />
      <CellSlider.Thumb />
      <CellSlider.Label>{label}</CellSlider.Label>
      <CellSlider.Output />
    </CellSlider.Track>
  );
}

function ControlledCellSlider({
  defaultValue,
  label,
  variant = "default",
}: {
  defaultValue: number;
  label: string;
  variant?: "default" | "secondary";
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <CellSlider
      {...decimalProps}
      aria-label={label}
      value={value}
      variant={variant}
      onChange={setValue}
    >
      <SliderContents label={label} />
    </CellSlider>
  );
}

export const DemoSettingsGroupExample = () => (
  <div className="flex w-[252px] flex-col gap-4">
    <div className="flex flex-col gap-2">
      <span className="text-muted text-sm">Density</span>
      <ControlledCellSlider defaultValue={0.5} label="Spacing" />
      <ControlledCellSlider defaultValue={0.3} label="Font Size" />
    </div>
    <div className="flex flex-col gap-2">
      <span className="text-muted text-sm">Corners</span>
      <ControlledCellSlider defaultValue={0.5} label="General Radius" />
      <ControlledCellSlider defaultValue={0.3} label="Forms Radius" />
    </div>
  </div>
);
