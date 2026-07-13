// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Integer Step
import { useState } from "react";

import { CellSlider } from "@thenamespace/uikit";

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

export const ProIntegerStepExample = function Demo() {
  const [value, setValue] = useState(75);
  return (
    <div className="w-[252px]">
      <CellSlider
        aria-label="Volume"
        maxValue={100}
        minValue={0}
        step={1}
        value={value}
        onChange={setValue}
      >
        <SliderContents label="Volume" />
      </CellSlider>
    </div>
  );
};
