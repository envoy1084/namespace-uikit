"use client";

import { DateField, Description, Label } from "@thenamespace/uikit";
import {
  Calendar03Icon,
  ArrowDown01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function WithPrefixAndSuffix() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Prefix>
          <HugeiconsIcon icon={Calendar03Icon} className="text-muted size-4" />
        </DateField.Prefix>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <HugeiconsIcon icon={ArrowDown01Icon} className="text-muted size-4" />
        </DateField.Suffix>
      </DateField.Group>
      <Description>Enter a date</Description>
    </DateField>
  );
}
