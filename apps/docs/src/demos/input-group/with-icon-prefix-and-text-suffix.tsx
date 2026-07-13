"use client";

import { InputGroup, Label, TextField } from "@thenamespace/uikit";
import { Globe02Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

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
          <HugeiconsIcon icon={Globe02Icon} className="text-muted size-4" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" />
        <InputGroup.Suffix>.com</InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
