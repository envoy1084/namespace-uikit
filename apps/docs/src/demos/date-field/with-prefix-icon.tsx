"use client";

import { DateField, Label } from "@thenamespace/uikit";
import { Calendar } from "@thenamespace/uikit/icons";

export function WithPrefixIcon() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Prefix>
          <Calendar className="text-muted size-4" />
        </DateField.Prefix>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
      </DateField.Group>
    </DateField>
  );
}
