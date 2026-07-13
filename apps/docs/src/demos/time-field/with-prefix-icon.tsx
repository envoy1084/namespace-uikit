"use client";

import { Clock } from "@gravity-ui/icons";
import { Label, TimeField } from "@thenamespace/uikit";

export function WithPrefixIcon() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Prefix>
          <Clock className="text-muted size-4" />
        </TimeField.Prefix>
        <TimeField.Input>
          {(segment) => <TimeField.Segment segment={segment} />}
        </TimeField.Input>
      </TimeField.Group>
    </TimeField>
  );
}
