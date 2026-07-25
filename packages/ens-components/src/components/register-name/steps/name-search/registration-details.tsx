"use client";

import type { DateValue } from "@internationalized/date";

import { useState } from "react";

import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  NumberStepper,
  NumberValue,
  Skeleton,
  Surface,
  Typography,
} from "@thenamespace/uikit";
import { formatUnits } from "viem";

import { useRegisterName } from "#/components/register-name/context";
import { useNamePrice } from "#/hooks";
import { formatError } from "#/lib";

const SECONDS_PER_YEAR = 31_557_600n;
const MAX_REGISTRATION_YEARS = 10;
const PAYMENT_TOKEN_SYMBOL = "USDC";

interface RegistrationDetailsProps {
  input: string;
}

function getYears(duration: bigint) {
  const years = Math.round(Number(duration) / Number(SECONDS_PER_YEAR));
  return Math.min(MAX_REGISTRATION_YEARS, Math.max(1, years));
}

function getTokenValue(amount: bigint, decimals: number) {
  return Number(formatUnits(amount, decimals));
}

function ExpirationDatePicker({
  value,
  onChange,
}: {
  value: DateValue;
  onChange: (value: DateValue | null) => void;
}) {
  const timeZone = getLocalTimeZone();

  return (
    <DatePicker
      aria-label="Registration expiration date"
      className="w-full"
      maxValue={today(timeZone).add({ years: MAX_REGISTRATION_YEARS })}
      minValue={today(timeZone).add({ days: 1 })}
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
      <DatePicker.Popover>
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

export function RegistrationDetails({ input }: RegistrationDetailsProps) {
  const { duration, setDuration } = useRegisterName();
  const timeZone = getLocalTimeZone();
  const years = getYears(duration);
  const [pickByDate, setPickByDate] = useState(false);
  const [expirationDate, setExpirationDate] = useState<DateValue>(() =>
    today(timeZone).add({ years }),
  );
  const price = useNamePrice({ duration, input });

  const updateYears = (value: number) => {
    const nextYears = Math.min(
      MAX_REGISTRATION_YEARS,
      Math.max(1, Math.round(value)),
    );
    setDuration(BigInt(nextYears) * SECONDS_PER_YEAR);
    setExpirationDate(today(timeZone).add({ years: nextYears }));
  };

  const updateExpirationDate = (value: DateValue | null) => {
    if (value === null) return;

    const durationInSeconds = Math.floor(
      (value.toDate(timeZone).getTime() - Date.now()) / 1000,
    );
    if (durationInSeconds <= 0) return;

    setExpirationDate(value);
    setDuration(BigInt(durationInSeconds));
  };

  return (
    <Surface className="mt-4 rounded-2xl p-4" variant="secondary">
      {pickByDate ? (
        <ExpirationDatePicker
          value={expirationDate}
          onChange={updateExpirationDate}
        />
      ) : (
        <NumberStepper
          aria-label="Registration duration in years"
          className="w-full"
          maxValue={MAX_REGISTRATION_YEARS}
          minValue={1}
          value={years}
          onChange={updateYears}
        >
          <NumberStepper.Group className="border-default bg-background w-full border p-1">
            <Button
              isIconOnly
              aria-label="Decrease registration duration"
              className="rounded-full"
              size="lg"
              slot="decrement"
              variant="primary"
            >
              −
            </Button>
            <NumberStepper.Value>
              {({ value }) => (
                <span className="text-foreground flex-1 text-center text-xl font-semibold">
                  {value} {value === 1 ? "year" : "years"}
                </span>
              )}
            </NumberStepper.Value>
            <Button
              isIconOnly
              aria-label="Increase registration duration"
              className="rounded-full"
              size="lg"
              slot="increment"
              variant="primary"
            >
              +
            </Button>
          </NumberStepper.Group>
        </NumberStepper>
      )}

      <div className="mt-2 flex items-center justify-center gap-1">
        <Typography.Paragraph color="muted" size="xs">
          {pickByDate
            ? `Registration until ${expirationDate.toString()}.`
            : `${years} ${years === 1 ? "year" : "years"} registration.`}
        </Typography.Paragraph>
        <Button
          className="h-auto min-w-0 px-1 py-0 text-xs"
          size="sm"
          variant="tertiary"
          onPress={() => setPickByDate((current) => !current)}
        >
          {pickByDate ? "Pick by duration" : "Pick by date"}
        </Button>
      </div>

      <div className="mt-5" aria-live="polite">
        <div className="flex items-center justify-between gap-4">
          <Typography.Paragraph color="muted" size="sm">
            Registration price
          </Typography.Paragraph>
          {price.isFetching ? (
            <Skeleton
              aria-label="Calculating registration price"
              className="h-5 w-24 rounded-md"
            />
          ) : price.data ? (
            <NumberValue
              className="text-foreground text-base font-semibold"
              maximumFractionDigits={6}
              value={getTokenValue(price.data.total, price.data.decimals)}
            >
              <NumberValue.Suffix>
                <span className="text-muted ml-1 text-xs font-medium">
                  {PAYMENT_TOKEN_SYMBOL}
                </span>
              </NumberValue.Suffix>
            </NumberValue>
          ) : (
            <span className="text-muted text-sm">—</span>
          )}
        </div>
        {price.isError ? (
          <Typography.Paragraph
            className="mt-2 text-right"
            color="muted"
            size="xs"
          >
            {formatError(price.error, { name: input })}
          </Typography.Paragraph>
        ) : null}
      </div>
    </Surface>
  );
}
