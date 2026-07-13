"use client";

import { Label, TimeField } from "@thenamespace/uikit";
import {
  ArrowDown01Icon,
  Clock01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <TimeField fullWidth name="time">
        <Label>Time</Label>
        <TimeField.Group fullWidth>
          <TimeField.Input>
            {(segment) => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
        </TimeField.Group>
      </TimeField>
      <TimeField fullWidth name="time-icons">
        <Label>Time</Label>
        <TimeField.Group fullWidth>
          <TimeField.Prefix>
            <HugeiconsIcon icon={Clock01Icon} className="text-muted size-4" />
          </TimeField.Prefix>
          <TimeField.Input>
            {(segment) => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
          <TimeField.Suffix>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className="text-muted size-4"
            />
          </TimeField.Suffix>
        </TimeField.Group>
      </TimeField>
    </div>
  );
}
