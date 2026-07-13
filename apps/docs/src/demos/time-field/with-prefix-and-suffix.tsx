"use client";

import { Description, Label, TimeField } from "@thenamespace/uikit";
import {
  ArrowDown01Icon,
  Clock01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function WithPrefixAndSuffix() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Prefix>
          <HugeiconsIcon icon={Clock01Icon} className="text-muted size-4" />
        </TimeField.Prefix>
        <TimeField.Input>
          {(segment) => <TimeField.Segment segment={segment} />}
        </TimeField.Input>
        <TimeField.Suffix>
          <HugeiconsIcon icon={ArrowDown01Icon} className="text-muted size-4" />
        </TimeField.Suffix>
      </TimeField.Group>
      <Description>Enter a time</Description>
    </TimeField>
  );
}
