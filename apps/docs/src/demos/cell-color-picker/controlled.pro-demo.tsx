"use client";

// @demo-title Controlled
import { useState } from "react";

import { CellColorPicker } from "@thenamespace/uikit";
import { ColorArea } from "@thenamespace/uikit/color-area";
import { ColorSlider } from "@thenamespace/uikit/color-slider";
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

export const ProControlledExample = function Demo() {
  const [color, setColor] = useState(parseColor("#3B82F6"));
  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellColorPicker aria-label="Accent" value={color} onChange={setColor}>
        <CellColorPicker.Trigger>
          <CellColorPicker.Label>Accent</CellColorPicker.Label>
          <CellColorPicker.ValueDisplay />
          <CellColorPicker.Swatch />
        </CellColorPicker.Trigger>
        <CellColorPicker.Popover>
          <PickerControls />
        </CellColorPicker.Popover>
      </CellColorPicker>
      <p className="text-muted px-1 text-sm">
        Selected: {color.toString("hex").toUpperCase()}
      </p>
    </div>
  );
};
