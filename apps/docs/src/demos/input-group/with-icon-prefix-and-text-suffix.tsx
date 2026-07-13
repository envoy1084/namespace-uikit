"use client";

import { Globe } from "@gravity-ui/icons";
import { InputGroup, Label, TextField } from "@thenamespace/uikit";

export function WithIconPrefixAndTextSuffix() {
  return (
    <TextField
      className="w-full max-w-[280px]"
      defaultValue="namespace"
      name="website"
    >
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Globe className="text-muted size-4" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" />
        <InputGroup.Suffix>.com</InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
