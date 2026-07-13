"use client";

import { Description, InputGroup, Label, TextField } from "@thenamespace/uikit";
import { Mail01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function Required() {
  return (
    <div className="flex flex-col gap-4">
      <TextField isRequired className="w-full max-w-[280px]" name="email">
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
      </TextField>
      <TextField isRequired className="w-full max-w-[280px]" name="price">
        <Label>Set a price</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input
            className="w-full max-w-[200px]"
            placeholder="0"
            type="number"
          />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
        <Description>What customers would pay</Description>
      </TextField>
    </div>
  );
}
