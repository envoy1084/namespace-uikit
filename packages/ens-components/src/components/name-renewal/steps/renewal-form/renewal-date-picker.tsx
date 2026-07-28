import type { DateValue } from "@internationalized/date";
import { Calendar, DateField, DatePicker } from "@thenamespace/uikit";

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
    <DatePicker
      aria-label="New expiration date"
      className="w-full"
      isDisabled={isDisabled}
      maxValue={maxValue}
      minValue={minValue}
      value={value}
      onChange={onChange}
    >
      <DateField.Group fullWidth variant="secondary">
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger aria-label="Choose new expiration date">
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover className="w-auto min-w-0 p-3" placement="bottom end">
        <Calendar aria-label="New expiration date">
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
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
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
