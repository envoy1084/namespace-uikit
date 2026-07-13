// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Controlled
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

export const DemoControlledExample = function Demo() {
  const [value, setValue] = useState(0.5);
  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSlider
        {...decimalProps}
        aria-label="Spacing"
        value={value}
        onChange={setValue}
      >
        <SliderContents label="Spacing" />
      </CellSlider>
      <p className="text-muted px-1 text-sm">Value: {value.toFixed(2)}</p>
    </div>
  );
};
