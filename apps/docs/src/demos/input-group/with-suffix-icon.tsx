"use client";

import { Description, InputGroup, Label, TextField } from "@thenamespace/uikit";
import { Mail01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function WithSuffixIcon() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          placeholder="name@email.com"
        />
        <InputGroup.Suffix>
          <HugeiconsIcon icon={Mail01Icon} className="text-muted size-4" />
        </InputGroup.Suffix>
      </InputGroup>
      <Description>We don't send spam</Description>
    </TextField>
  );
}
