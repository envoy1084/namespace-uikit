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
  Separator,
  Spinner,
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

function formatTokenAmount(amount: bigint, decimals: number) {
  const [integer, fraction = ""] = formatUnits(amount, decimals).split(".");
  const visibleFraction = fraction.slice(0, 6).replace(/0+$/, "");

  return visibleFraction.length > 0 ? `${integer}.${visibleFraction}` : integer;
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
      className="w-full"
      maxValue={today(timeZone).add({ years: MAX_REGISTRATION_YEARS })}
      minValue={today(timeZone).add({ days: 1 })}
      value={value}
      onChange={onChange}
    >
      <DateField.Group fullWidth>
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
    <div className="border-default bg-surface mt-4 rounded-2xl border p-4">
      {pickByDate ? (
        <ExpirationDatePicker
          value={expirationDate}
          onChange={updateExpirationDate}
        />
      ) : (
        <NumberStepper
          aria-label="Registration duration in years"
          maxValue={MAX_REGISTRATION_YEARS}
          minValue={1}
          value={years}
          onChange={updateYears}
        >
          <NumberStepper.Group className="border-default bg-background w-full border p-1">
            <NumberStepper.DecrementButton aria-label="Decrease registration duration" />
            <NumberStepper.Value>
              {({ value }) => (
                <span className="text-foreground flex-1 text-center text-xl font-semibold">
                  {value} {value === 1 ? "year" : "years"}
                </span>
              )}
            </NumberStepper.Value>
            <NumberStepper.IncrementButton aria-label="Increase registration duration" />
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

      <div className="mt-4" aria-live="polite">
        {price.isFetching ? (
          <div className="flex items-center justify-center gap-2 py-6">
            <Spinner className="size-3" size="sm" />
            <Typography.Paragraph color="muted" size="xs">
              Calculating price…
            </Typography.Paragraph>
          </div>
        ) : price.isError ? (
          <Typography.Paragraph
            className="py-6 text-center"
            color="muted"
            size="xs"
          >
            {formatError(price.error, { name: input })}
          </Typography.Paragraph>
        ) : price.data ? (
          <div className="space-y-3">
            <div className="text-muted space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span>Registration fee</span>
                <span>
                  {formatTokenAmount(price.data.base, price.data.decimals)}{" "}
                  {PAYMENT_TOKEN_SYMBOL}
                </span>
              </div>
              {price.data.premium > 0n ? (
                <div className="flex items-center justify-between gap-4">
                  <span>Expiry premium</span>
                  <span>
                    {formatTokenAmount(price.data.premium, price.data.decimals)}{" "}
                    {PAYMENT_TOKEN_SYMBOL}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <span>Network fee</span>
                <span>Calculated in wallet</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-start justify-between gap-4">
              <Typography.Heading className="text-base" level={4}>
                Total
              </Typography.Heading>
              <div className="text-right">
                <Typography.Heading className="text-base" level={4}>
                  {formatTokenAmount(price.data.total, price.data.decimals)}{" "}
                  {PAYMENT_TOKEN_SYMBOL}
                </Typography.Heading>
                <Typography.Paragraph color="muted" size="xs">
                  ≈ ${formatTokenAmount(price.data.total, price.data.decimals)}
                </Typography.Paragraph>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
