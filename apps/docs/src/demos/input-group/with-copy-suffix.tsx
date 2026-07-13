"use client";

import { Button, InputGroup, Label, TextField } from "@thenamespace/uikit";
import { Copy01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function WithCopySuffix() {
  return (
    <TextField
      className="w-full max-w-[280px]"
      defaultValue="namespace.ninja"
      name="website"
    >
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" />
        <InputGroup.Suffix className="pr-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <HugeiconsIcon icon={Copy01Icon} className="size-4" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
