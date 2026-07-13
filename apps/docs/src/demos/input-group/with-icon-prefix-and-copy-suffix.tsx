"use client";

import { Button, InputGroup, Label, TextField } from "@thenamespace/uikit";
import { Copy, Globe } from "@thenamespace/uikit/icons";

export function WithIconPrefixAndCopySuffix() {
  return (
    <TextField
      className="w-full max-w-[280px]"
      defaultValue="namespace.ninja"
      name="website"
    >
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Globe className="text-muted size-4" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" />
        <InputGroup.Suffix className="pr-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <Copy className="size-4" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
