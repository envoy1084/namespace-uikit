"use client";

import { Clock } from "@gravity-ui/icons";
import { Label, TimeField } from "@thenamespace/uikit";

export function WithSuffixIcon() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input>
          {(segment) => <TimeField.Segment segment={segment} />}
        </TimeField.Input>
        <TimeField.Suffix>
          <Clock className="text-muted size-4" />
        </TimeField.Suffix>
      </TimeField.Group>
    </TimeField>
  );
}
