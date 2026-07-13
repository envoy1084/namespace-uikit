"use client";

import { Envelope } from "@gravity-ui/icons";
import { InputGroup, Label, TextField } from "@thenamespace/uikit";

export function Default() {
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
    </TextField>
  );
}
