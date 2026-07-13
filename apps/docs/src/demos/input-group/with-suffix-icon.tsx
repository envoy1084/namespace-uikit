"use client";

import { Envelope } from "@gravity-ui/icons";
import { Description, InputGroup, Label, TextField } from "@thenamespace/uikit";

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
          <Envelope className="text-muted size-4" />
        </InputGroup.Suffix>
      </InputGroup>
      <Description>We don't send spam</Description>
    </TextField>
  );
}
