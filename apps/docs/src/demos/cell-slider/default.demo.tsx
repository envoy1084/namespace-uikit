"use client";

// @demo-title Default
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

export const DemoDefaultExample = () => (
  <div className="w-[252px]">
    <CellSlider {...decimalProps} aria-label="Spacing" defaultValue={0.5}>
      <SliderContents label="Spacing" />
    </CellSlider>
  </div>
);
