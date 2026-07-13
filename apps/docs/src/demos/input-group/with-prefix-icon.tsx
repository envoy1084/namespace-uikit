"use client";

import { Description, InputGroup, Label, TextField } from "@thenamespace/uikit";
import { Mail01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function WithPrefixIcon() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <HugeiconsIcon icon={Mail01Icon} className="text-muted size-4" />
        </InputGroup.Prefix>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          placeholder="name@email.com"
        />
      </InputGroup>
      <Description>We'll never share this with anyone else</Description>
    </TextField>
  );
}
