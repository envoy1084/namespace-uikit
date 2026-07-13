"use client";

import { DateField, Label } from "@thenamespace/uikit";
import {
  Calendar03Icon,
  ArrowDown01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <DateField fullWidth name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
      <DateField fullWidth name="date-icons">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Prefix>
            <HugeiconsIcon
              icon={Calendar03Icon}
              className="text-muted size-4"
            />
          </DateField.Prefix>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className="text-muted size-4"
            />
          </DateField.Suffix>
        </DateField.Group>
      </DateField>
    </div>
  );
}
