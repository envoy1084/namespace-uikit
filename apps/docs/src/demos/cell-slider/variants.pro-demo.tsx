"use client";

// @demo-title Variants
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

export const ProVariantsExample = () => (
  <div className="flex w-[252px] flex-col gap-3">
    {(["default", "secondary"] as const).map((variant) => (
      <div className="flex flex-col gap-1" key={variant}>
        <span className="text-muted text-xs">{variant}</span>
        <CellSlider
          {...decimalProps}
          aria-label="Spacing"
          defaultValue={0.5}
          variant={variant}
        >
          <SliderContents label="Spacing" />
        </CellSlider>
      </div>
    ))}
  </div>
);
