"use client";

import { DateField, Description, Label } from "@thenamespace/uikit";
import { Calendar, ChevronDown } from "@thenamespace/uikit/icons";

export function WithPrefixAndSuffix() {
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
        <DateField.Suffix>
          <ChevronDown className="text-muted size-4" />
        </DateField.Suffix>
      </DateField.Group>
      <Description>Enter a date</Description>
    </DateField>
  );
}
