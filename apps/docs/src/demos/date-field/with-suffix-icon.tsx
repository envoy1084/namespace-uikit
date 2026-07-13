"use client";

import { DateField, Label } from "@thenamespace/uikit";
import { Calendar03Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function WithSuffixIcon() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <HugeiconsIcon icon={Calendar03Icon} className="text-muted size-4" />
        </DateField.Suffix>
      </DateField.Group>
    </DateField>
  );
}
