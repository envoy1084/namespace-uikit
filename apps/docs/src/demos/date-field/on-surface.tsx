"use client";

import { DateField, Description, Label, Surface } from "@thenamespace/uikit";
import { Calendar } from "@thenamespace/uikit/icons";

export function OnSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <DateField className="w-full" name="date">
        <Label>Date</Label>
        <DateField.Group variant="secondary">
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
        <Description>Enter a date</Description>
      </DateField>
      <DateField className="w-full" name="date-2">
        <Label>Appointment date</Label>
        <DateField.Group variant="secondary">
          <DateField.Prefix>
            <Calendar className="text-muted size-4" />
          </DateField.Prefix>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
        <Description>Enter a date for your appointment</Description>
      </DateField>
    </Surface>
  );
}
