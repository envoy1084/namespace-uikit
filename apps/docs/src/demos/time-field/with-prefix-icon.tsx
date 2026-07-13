"use client";

import { Label, TimeField } from "@thenamespace/uikit";
import { Clock01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function WithPrefixIcon() {
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
      </TimeField.Group>
    </TimeField>
  );
}
