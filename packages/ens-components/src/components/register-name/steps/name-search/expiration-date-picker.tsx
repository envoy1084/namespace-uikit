import type { DateValue } from "@internationalized/date";

import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar, DateField, DatePicker } from "@thenamespace/uikit";

import {
  MIN_REGISTRATION_DURATION,
  REGISTRATION_SECONDS_PER_DAY,
} from "#/lib/helpers";

export const MAX_REGISTRATION_YEARS = 10;
export const MIN_REGISTRATION_DAYS = Number(
  MIN_REGISTRATION_DURATION / REGISTRATION_SECONDS_PER_DAY,
);

export function getDateDurationLabel(
  value: DateValue,
  timeZone: string,
): string {
  const start = today(timeZone);
  let cursor: DateValue = start;
  let months = 0;

  while (cursor.add({ months: 1 }).compare(value) <= 0) {
    cursor = cursor.add({ months: 1 });
    months += 1;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const days = value.compare(cursor);
  const parts = [
    years > 0 ? `${years} ${years === 1 ? "year" : "years"}` : null,
    remainingMonths > 0
      ? `${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`
      : null,
    days > 0 ? `${days} ${days === 1 ? "day" : "days"}` : null,
  ].filter((part): part is string => part !== null);

  return `${parts.join(", ")} registration.`;
}

export interface ExpirationDatePickerProps {
  onChange: (value: DateValue | null) => void;
  value: DateValue;
}

export function ExpirationDatePicker({
  value,
  onChange,
}: ExpirationDatePickerProps) {
  const timeZone = getLocalTimeZone();

  return (
    <DatePicker
      aria-label="Registration expiration date"
      className="w-full"
      maxValue={today(timeZone).add({ years: MAX_REGISTRATION_YEARS })}
      minValue={today(timeZone).add({ days: MIN_REGISTRATION_DAYS })}
      value={value}
      onChange={onChange}
    >
      <DateField.Group fullWidth variant="secondary">
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger aria-label="Choose expiration date">
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover className="w-auto min-w-0 p-3" placement="bottom end">
        <Calendar aria-label="Registration expiration date">
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => <Calendar.Cell date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody>
              {({ year }) => <Calendar.YearPickerCell year={year} />}
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>
  );
}
