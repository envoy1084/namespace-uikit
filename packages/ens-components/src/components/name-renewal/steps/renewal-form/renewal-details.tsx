"use client";

import { useCallback, useMemo } from "react";

import type { DateValue } from "@internationalized/date";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { Button, NumberStepper, Skeleton, Surface, Typography } from "@thenamespace/uikit";
import { HugeiconsIcon, MinusSignIcon, PlusSignIcon } from "@thenamespace/uikit/icons";

import type { NameRenewalPrice } from "#/actions";
import { MAX_NAME_RENEWAL_YEARS, useNameRenewal } from "#/components/name-renewal/context";
import { RenewalAdvancedOptions } from "#/components/name-renewal/steps/renewal-form/referrer-option";
import { RenewalDatePicker } from "#/components/name-renewal/steps/renewal-form/renewal-date-picker";
import { PaymentTokenSelect } from "#/components/payment-token-select";
import { formatTokenAmount } from "#/lib";
import {
  MIN_REGISTRATION_DURATION,
  REGISTRATION_SECONDS_PER_DAY,
  REGISTRATION_SECONDS_PER_YEAR,
  resolvePaymentToken,
} from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

const MIN_RENEWAL_DAYS = Number(MIN_REGISTRATION_DURATION / REGISTRATION_SECONDS_PER_DAY);

function timestampToCalendarDate(timestamp: bigint) {
  const date = new Date(Number(timestamp) * 1_000);
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function getYears(duration: bigint) {
  return Math.min(
    MAX_NAME_RENEWAL_YEARS,
    Math.max(1, Math.round(Number(duration) / Number(REGISTRATION_SECONDS_PER_YEAR))),
  );
}

function maxDate(left: DateValue, right: DateValue) {
  return left.compare(right) >= 0 ? left : right;
}

function formatDate(value: DateValue, timeZone: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value.toDate(timeZone));
}

export interface RenewalDetailsProps {
  isDisabled?: boolean;
  isPriceFetching: boolean;
  price: NameRenewalPrice;
}

export function RenewalDetails({
  isDisabled = false,
  isPriceFetching,
  price,
}: RenewalDetailsProps) {
  const {
    duration,
    durationMode,
    paymentTokenAddress,
    setDuration,
    setDurationMode,
    setPaymentTokenAddress,
  } = useNameRenewal();
  const { contracts } = useEnsConfig();
  const token = resolvePaymentToken(contracts.paymentTokens, paymentTokenAddress);
  const timeZone = getLocalTimeZone();
  const currentExpiryDate = useMemo(
    () => timestampToCalendarDate(price.currentExpiry),
    [price.currentExpiry],
  );
  const years = getYears(duration);
  const durationDays = Math.max(MIN_RENEWAL_DAYS, Number(duration / REGISTRATION_SECONDS_PER_DAY));
  const targetDate = currentExpiryDate.add({ days: durationDays });
  const minimumTargetDate = maxDate(currentExpiryDate, today(timeZone)).add({
    days: MIN_RENEWAL_DAYS,
  });
  const maximumTargetDate = currentExpiryDate.add({
    years: MAX_NAME_RENEWAL_YEARS,
  });
  const pickByDate = durationMode === "date";

  const updateYears = useCallback(
    (value: number) => {
      const nextYears = Math.min(MAX_NAME_RENEWAL_YEARS, Math.max(1, Math.round(value)));
      setDuration(BigInt(nextYears) * REGISTRATION_SECONDS_PER_YEAR);
    },
    [setDuration],
  );

  const updateTargetDate = useCallback(
    (value: DateValue | null) => {
      if (value === null || value.compare(minimumTargetDate) < 0) return;
      const days = value.compare(currentExpiryDate);
      if (days < MIN_RENEWAL_DAYS) return;
      setDuration(BigInt(days) * REGISTRATION_SECONDS_PER_DAY);
    },
    [currentExpiryDate, minimumTargetDate, setDuration],
  );

  const toggleDurationMode = useCallback(() => {
    if (pickByDate) {
      updateYears(years);
    } else {
      updateTargetDate(targetDate);
    }
    setDurationMode(pickByDate ? "duration" : "date");
  }, [pickByDate, setDurationMode, targetDate, updateTargetDate, updateYears, years]);

  return (
    <Surface className="border-default mt-4 rounded-2xl border p-4" variant="transparent">
      <div className="mb-3 flex items-center justify-between gap-4">
        <Typography.Paragraph color="muted" size="xs">
          Current expiry
        </Typography.Paragraph>
        <Typography.Paragraph size="xs" weight="medium">
          {formatDate(currentExpiryDate, timeZone)}
        </Typography.Paragraph>
      </div>
      {pickByDate ? (
        <RenewalDatePicker
          isDisabled={isDisabled}
          maxValue={maximumTargetDate}
          minValue={minimumTargetDate}
          value={targetDate}
          onChange={updateTargetDate}
        />
      ) : (
        <NumberStepper
          aria-label="Renewal duration in years"
          className="w-full"
          isDisabled={isDisabled}
          maxValue={MAX_NAME_RENEWAL_YEARS}
          minValue={1}
          value={years}
          onChange={updateYears}
        >
          <NumberStepper.Group className="border-default bg-background h-9 w-full border p-0.5">
            <Button
              isIconOnly
              aria-label="Decrease renewal duration"
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
              aria-label="Increase renewal duration"
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
            ? `New expiry: ${formatDate(targetDate, timeZone)}`
            : `Extend by ${years} ${years === 1 ? "year" : "years"}.`}
        </Typography.Paragraph>
        <Button
          className="h-auto min-w-0 px-2 py-px text-[10px]!"
          isDisabled={isDisabled}
          size="sm"
          variant="secondary"
          onPress={toggleDurationMode}
        >
          {pickByDate ? "Pick by duration" : "Pick by date"}
        </Button>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-4">
          <Typography.Paragraph color="muted" size="sm">
            Renewal price
          </Typography.Paragraph>
          <div className="flex items-center gap-2">
            {isPriceFetching ? (
              <Skeleton aria-label="Calculating renewal price" className="h-5 w-14 rounded-md" />
            ) : (
              <span className="text-foreground text-base font-semibold">
                {formatTokenAmount(price.total, price.decimals, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
            <PaymentTokenSelect
              isDisabled={isDisabled}
              tokens={contracts.paymentTokens}
              value={token.address}
              onChange={setPaymentTokenAddress}
            />
          </div>
        </div>
      </div>
      <RenewalAdvancedOptions isDisabled={isDisabled} />
    </Surface>
  );
}
