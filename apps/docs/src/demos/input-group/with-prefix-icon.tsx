"use client";

import { Envelope } from "@gravity-ui/icons";
import { Description, InputGroup, Label, TextField } from "@thenamespace/uikit";

export function WithPrefixIcon() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Envelope className="text-muted size-4" />
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
