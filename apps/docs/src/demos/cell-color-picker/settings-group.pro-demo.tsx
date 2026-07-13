"use client";

// @demo-title Settings Group
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

export const ProSettingsGroupExample = function Demo() {
  const [accent, setAccent] = useState(parseColor("#3B82F6"));
  const [success, setSuccess] = useState(parseColor("#22C55E"));
  const [danger, setDanger] = useState(parseColor("#EF4444"));
  return (
    <div className="flex w-[252px] flex-col gap-2">
      {[
        ["Accent", accent, setAccent],
        ["Success", success, setSuccess],
        ["Danger", danger, setDanger],
      ].map(([label, color, setColor]) => (
        <CellColorPicker
          aria-label={label as string}
          key={label as string}
          value={color as typeof accent}
          onChange={setColor as typeof setAccent}
        >
          <CellColorPicker.Trigger>
            <CellColorPicker.Label>{label as string}</CellColorPicker.Label>
            <CellColorPicker.ValueDisplay />
            <CellColorPicker.Swatch />
          </CellColorPicker.Trigger>
          <CellColorPicker.Popover>
            <PickerControls />
          </CellColorPicker.Popover>
        </CellColorPicker>
      ))}
    </div>
  );
};
