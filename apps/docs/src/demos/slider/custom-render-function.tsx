"use client";

import { Label, Slider } from "@thenamespace/uikit";

export function CustomRenderFunction() {
  return (
    <Slider
      className="w-full max-w-xs"
      defaultValue={30}
      render={(props) => <div {...props} data-custom="foo" />}
    >
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
