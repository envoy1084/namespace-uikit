"use client";

import {
  Description,
  InputGroup,
  Label,
  Surface,
  TextField,
} from "@thenamespace/uikit";
import { Envelope } from "@thenamespace/uikit/icons";

export function OnSurface() {
  return (
    <Surface className="rounded-2xl p-6">
      <TextField className="w-full max-w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup variant="secondary">
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
    </Surface>
  );
}
