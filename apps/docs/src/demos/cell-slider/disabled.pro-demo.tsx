"use client";

// @demo-title Disabled
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

export const ProDisabledExample = () => (
  <div className="flex w-[252px] flex-col gap-2">
    <CellSlider
      {...decimalProps}
      isDisabled
      aria-label="Spacing"
      defaultValue={0.5}
    >
      <SliderContents label="Spacing" />
    </CellSlider>
    <CellSlider
      {...decimalProps}
      isDisabled
      aria-label="Font Size"
      defaultValue={0.3}
    >
      <SliderContents label="Font Size" />
    </CellSlider>
  </div>
);
