"use client";

import { InputGroup, Label, TextField } from "@thenamespace/uikit";
import { Envelope } from "@thenamespace/uikit/icons";

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <TextField
        isDisabled
        className="w-full max-w-[280px]"
        defaultValue="name@email.com"
        name="email"
      >
        <Label>Email address</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Envelope className="text-muted size-4" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-full max-w-[280px]" />
        </InputGroup>
      </TextField>
      <TextField
        isDisabled
        className="w-full max-w-[280px]"
        defaultValue="10"
        name="price"
      >
        <Label>Set a price</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input className="w-full max-w-[200px]" type="number" />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
      </TextField>
    </div>
  );
}
