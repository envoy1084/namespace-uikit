"use client";

// @demo-title Default
import { CellColorPicker } from "@thenamespace/uikit";
import { ColorArea } from "@thenamespace/uikit/color-area";
import { ColorSlider } from "@thenamespace/uikit/color-slider";
import { Label } from "@thenamespace/uikit/label";

function PickerControls() {
  return (
    <>
      <ColorArea
        aria-label="Color area"
        className="max-w-full"
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
      >
        <ColorArea.Thumb />
      </ColorArea>
      <ColorSlider
        aria-label="Hue"
        channel="hue"
        className="gap-1 px-1"
        colorSpace="hsb"
      >
        <Label>Hue</Label>
        <ColorSlider.Output className="text-muted" />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
    </>
  );
}

function Picker({
  label = "Accent",
  variant = "default",
}: {
  label?: string;
  variant?: "default" | "secondary";
}) {
  return (
    <CellColorPicker
      aria-label={label}
      defaultValue="#3B82F6"
      variant={variant}
    >
      <CellColorPicker.Trigger>
        <CellColorPicker.Label>{label}</CellColorPicker.Label>
        <CellColorPicker.ValueDisplay />
        <CellColorPicker.Swatch />
      </CellColorPicker.Trigger>
      <CellColorPicker.Popover>
        <PickerControls />
      </CellColorPicker.Popover>
    </CellColorPicker>
  );
}

export const DemoDefaultExample = () => (
  <div className="w-[252px]">
    <Picker />
  </div>
);
