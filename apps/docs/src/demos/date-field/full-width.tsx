"use client";

import { DateField, Label } from "@thenamespace/uikit";
import { Calendar, ChevronDown } from "@thenamespace/uikit/icons";

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
            <Calendar className="text-muted size-4" />
          </DateField.Prefix>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <ChevronDown className="text-muted size-4" />
          </DateField.Suffix>
        </DateField.Group>
      </DateField>
    </div>
  );
}
