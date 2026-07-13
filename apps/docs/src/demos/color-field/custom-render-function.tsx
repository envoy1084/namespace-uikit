"use client";

import type { Color } from "@thenamespace/uikit";

import { useState } from "react";

import {
  ColorField,
  ColorSwatch,
  Label,
  parseColor,
} from "@thenamespace/uikit";

export function CustomRenderFunction() {
  const [color, setColor] = useState<Color | null>(parseColor("#0485F7"));

  return (
    <ColorField
      className="w-[280px]"
      name="color"
      render={(props) => <div {...props} data-custom="foo" />}
      value={color}
      onChange={setColor}
    >
      <Label>Color</Label>
      <ColorField.Group
        render={(props) => <div {...props} data-custom="foo" />}
      >
        <ColorField.Prefix>
          <ColorSwatch color={color ?? undefined} size="xs" />
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>
  );
}
