import type { DateValue } from "@internationalized/date";
import { getLocalTimeZone, today } from "@internationalized/date";

import { FlowDatePicker } from "#/components/flow-date-picker";
import { MIN_REGISTRATION_DURATION, REGISTRATION_SECONDS_PER_DAY } from "#/lib/helpers";

export const MAX_REGISTRATION_YEARS = 10;
export const MIN_REGISTRATION_DAYS = Number(
  MIN_REGISTRATION_DURATION / REGISTRATION_SECONDS_PER_DAY,
);

export function getDateDurationLabel(value: DateValue, timeZone: string): string {
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
    remainingMonths > 0 ? `${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}` : null,
    days > 0 ? `${days} ${days === 1 ? "day" : "days"}` : null,
  ].filter((part): part is string => part !== null);

  return `${parts.join(", ")} registration.`;
}

export interface ExpirationDatePickerProps {
  onChange: (value: DateValue | null) => void;
  value: DateValue;
}

export function ExpirationDatePicker({ value, onChange }: ExpirationDatePickerProps) {
  const timeZone = getLocalTimeZone();

  return (
    <FlowDatePicker
      ariaLabel="Registration expiration date"
      maxValue={today(timeZone).add({ years: MAX_REGISTRATION_YEARS })}
      minValue={today(timeZone).add({ days: MIN_REGISTRATION_DAYS })}
      triggerAriaLabel="Choose expiration date"
      value={value}
      onChange={onChange}
    />
  );
}
