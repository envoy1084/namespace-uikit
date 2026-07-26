"use client";

import type { DateValue } from "@internationalized/date";

import { useEffect } from "react";

import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  NumberStepper,
  Skeleton,
  Surface,
  Typography,
} from "@thenamespace/uikit";
import {
  HugeiconsIcon,
  MinusSignIcon,
  PlusSignIcon,
} from "@thenamespace/uikit/icons";

import { useNameRegistration } from "#/components/register-name/context";
import { AdvancedOptions } from "#/components/register-name/steps/name-search/advanced-options";
import { PaymentTokenSelect } from "#/components/register-name/steps/name-search/payment-token-select";
import { useNamePrice } from "#/hooks";
import { formatError, formatTokenAmount } from "#/lib";
import {
  MIN_REGISTRATION_DURATION,
  REGISTRATION_SECONDS_PER_DAY,
  REGISTRATION_SECONDS_PER_YEAR,
  resolvePaymentToken,
} from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

const MAX_REGISTRATION_YEARS = 10;
const MIN_REGISTRATION_DAYS = Number(
  MIN_REGISTRATION_DURATION / REGISTRATION_SECONDS_PER_DAY,
);

interface RegistrationDetailsProps {
  input: string;
  onReadyChange?: (isReady: boolean) => void;
}

function getYears(duration: bigint) {
  const years = Math.round(
    Number(duration) / Number(REGISTRATION_SECONDS_PER_YEAR),
  );
  return Math.min(MAX_REGISTRATION_YEARS, Math.max(1, years));
}

function getDateDurationLabel(value: DateValue, timeZone: string) {
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

export function RegistrationDetails({
  input,
  onReadyChange,
}: RegistrationDetailsProps) {
  const {
    duration,
    durationMode,
    paymentTokenAddress,
    setDuration,
    setDurationMode,
    setPaymentTokenAddress,
  } = useNameRegistration();
  const { contracts } = useEnsConfig();
  const paymentToken = resolvePaymentToken(
    contracts.paymentTokens,
    paymentTokenAddress,
  );
  const timeZone = getLocalTimeZone();
  const years = getYears(duration);
  const selectedDurationDays = Number(duration / REGISTRATION_SECONDS_PER_DAY);
  const expirationDate = today(timeZone).add({
    days: Math.max(MIN_REGISTRATION_DAYS, selectedDurationDays),
  });
  const pickByDate = durationMode === "date";
  const price = useNamePrice({
    duration,
    input,
    paymentTokenAddress: paymentToken.address,
  });
  const isReady =
    price.isSuccess && price.data !== undefined && !price.isFetching;

  useEffect(() => {
    onReadyChange?.(isReady);
    return () => onReadyChange?.(false);
  }, [isReady, onReadyChange]);

  const updateYears = (value: number) => {
    const nextYears = Math.min(
      MAX_REGISTRATION_YEARS,
      Math.max(1, Math.round(value)),
    );
    setDuration(BigInt(nextYears) * REGISTRATION_SECONDS_PER_YEAR);
  };

  const updateExpirationDate = (value: DateValue | null) => {
    if (value === null) return;

    const durationInDays = value.compare(today(timeZone));
    if (durationInDays < MIN_REGISTRATION_DAYS) return;

    setDuration(BigInt(durationInDays) * REGISTRATION_SECONDS_PER_DAY);
  };

  const toggleDurationMode = () => {
    if (pickByDate) {
      updateYears(years);
    } else {
      updateExpirationDate(expirationDate);
    }

    setDurationMode(pickByDate ? "duration" : "date");
  };

  return (
    <Surface
      className="border-default mt-4 rounded-2xl border p-4"
      variant="transparent"
    >
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
          <NumberStepper.Group className="border-default bg-background h-9 w-full border p-0.5">
            <Button
              isIconOnly
              aria-label="Decrease registration duration"
              className="size-8 min-w-8 rounded-full"
              size="sm"
              slot="decrement"
              variant="primary"
            >
              <HugeiconsIcon icon={MinusSignIcon} />
            </Button>
            <NumberStepper.Value>
              {({ value }) => (
                <span className="text-foreground flex-1 text-center text-lg font-medium">
                  {value} {value === 1 ? "year" : "years"}
                </span>
              )}
            </NumberStepper.Value>
            <Button
              isIconOnly
              aria-label="Increase registration duration"
              className="size-8 min-w-8 rounded-full"
              size="sm"
              slot="increment"
              variant="primary"
            >
              <HugeiconsIcon icon={PlusSignIcon} />
            </Button>
          </NumberStepper.Group>
        </NumberStepper>
      )}

      <div className="mt-2 flex items-center justify-center gap-1">
        <Typography.Paragraph color="muted" size="xs">
          {pickByDate
            ? getDateDurationLabel(expirationDate, timeZone)
            : `${years} ${years === 1 ? "year" : "years"} registration.`}
        </Typography.Paragraph>
        <Button
          className="h-auto min-w-0 px-2 py-px text-[10px]!"
          size="sm"
          variant="secondary"
          onPress={toggleDurationMode}
        >
          {pickByDate ? "Pick by duration" : "Pick by date"}
        </Button>
      </div>

      <div className="mt-5" aria-live="polite">
        <div className="flex items-center justify-between gap-4">
          <Typography.Paragraph color="muted" size="sm">
            Registration price
          </Typography.Paragraph>
          <div className="flex items-center gap-2">
            {price.isFetching ? (
              <Skeleton
                aria-label="Calculating registration price"
                className="h-5 w-14 rounded-md"
              />
            ) : price.data ? (
              <span className="text-foreground text-base font-semibold">
                {formatTokenAmount(price.data.total, price.data.decimals, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            ) : (
              <span className="text-muted text-sm">N/A</span>
            )}
            <PaymentTokenSelect
              tokens={contracts.paymentTokens}
              value={paymentToken.address}
              onChange={setPaymentTokenAddress}
            />
          </div>
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
      <AdvancedOptions />
    </Surface>
  );
}
