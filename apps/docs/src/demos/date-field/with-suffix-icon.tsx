"use client";

import { Calendar } from "@gravity-ui/icons";
import { DateField, Label } from "@thenamespace/uikit";

export function WithSuffixIcon() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <Calendar className="text-muted size-4" />
        </DateField.Suffix>
      </DateField.Group>
    </DateField>
  );
}
