"use client";

import { InputGroup, Label, TextField } from "@thenamespace/uikit";

export function WithTextPrefix() {
  return (
    <TextField
      className="w-full max-w-[280px]"
      defaultValue="namespace.ninja"
      name="website"
    >
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>https://</InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" />
      </InputGroup>
    </TextField>
  );
}
