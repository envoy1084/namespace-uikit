import type { DateValue } from "@internationalized/date";

import { FlowDatePicker } from "#/components/flow-date-picker";
export interface RenewalDatePickerProps {
  isDisabled?: boolean;
  maxValue: DateValue;
  minValue: DateValue;
  onChange: (value: DateValue | null) => void;
  value: DateValue;
}

export function RenewalDatePicker({
  isDisabled = false,
  maxValue,
  minValue,
  onChange,
  value,
}: RenewalDatePickerProps) {
  return (
    <FlowDatePicker
      ariaLabel="New expiration date"
      isDisabled={isDisabled}
      maxValue={maxValue}
      minValue={minValue}
      triggerAriaLabel="Choose new expiration date"
      value={value}
      onChange={onChange}
    />
  );
}
