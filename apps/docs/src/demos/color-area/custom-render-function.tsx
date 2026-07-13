"use client";

import { ColorArea } from "@thenamespace/uikit";

export function CustomRenderFunction() {
  return (
    <ColorArea
      defaultValue="rgb(116, 52, 255)"
      render={(props) => <div {...props} data-custom="slider" />}
    >
      <ColorArea.Thumb
        render={(props) => <div {...props} data-custom="thumb" />}
      />
    </ColorArea>
  );
}
