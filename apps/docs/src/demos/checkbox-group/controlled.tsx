"use client";

import { useState } from "react";

import { Checkbox, CheckboxGroup, Label } from "@thenamespace/uikit";

export function Controlled() {
  const [selected, setSelected] = useState(["coding", "design"]);

  return (
    <CheckboxGroup
      className="min-w-[320px]"
      name="skills"
      value={selected}
      onChange={setSelected}
    >
      <Label>Your skills</Label>
      <Checkbox value="coding">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Coding
        </Checkbox.Content>
      </Checkbox>
      <Checkbox value="design">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Design
        </Checkbox.Content>
      </Checkbox>
      <Checkbox value="writing">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Writing
        </Checkbox.Content>
      </Checkbox>
      <Label className="text-muted my-4 text-sm">
        Selected: {selected.join(", ") || "None"}
      </Label>
    </CheckboxGroup>
  );
}
