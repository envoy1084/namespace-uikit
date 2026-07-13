// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title With Presets
import { useState } from "react";

import { CellColorPicker } from "@thenamespace/uikit";
import { ColorArea } from "@thenamespace/uikit/color-area";
import { ColorSlider } from "@thenamespace/uikit/color-slider";
import { ColorSwatchPicker } from "@thenamespace/uikit/color-swatch-picker";
import { Input } from "@thenamespace/uikit/input";
import { Label } from "@thenamespace/uikit/label";
import { parseColor } from "react-aria-components";

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

const presets = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
];

export const ProWithPresetsExample = function Demo() {
  const [color, setColor] = useState(parseColor("#3B82F6"));
  return (
    <div className="w-[252px]">
      <CellColorPicker
        aria-label="Brand Color"
        value={color}
        onChange={setColor}
      >
        <CellColorPicker.Trigger>
          <CellColorPicker.Label>Brand Color</CellColorPicker.Label>
          <CellColorPicker.ValueDisplay />
          <CellColorPicker.Swatch />
        </CellColorPicker.Trigger>
        <CellColorPicker.Popover>
          <ColorSwatchPicker className="justify-center pt-2" size="xs">
            {presets.map((preset) => (
              <ColorSwatchPicker.Item color={preset} key={preset}>
                <ColorSwatchPicker.Swatch />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
          <PickerControls />
          <Input aria-label="Hex value">
            <Input.Group variant="secondary">
              <Input.Prefix>#</Input.Prefix>
              <Input.Input />
            </Input.Group>
          </Input>
        </CellColorPicker.Popover>
      </CellColorPicker>
    </div>
  );
};
