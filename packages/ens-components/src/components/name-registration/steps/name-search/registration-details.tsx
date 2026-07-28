"use client";

import { useCallback, useEffect } from "react";

import type { DateValue } from "@internationalized/date";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Button, NumberStepper, Skeleton, Surface, Typography } from "@thenamespace/uikit";
import { HugeiconsIcon, MinusSignIcon, PlusSignIcon } from "@thenamespace/uikit/icons";

import { useNameRegistration } from "#/components/name-registration/context";
import { AdvancedOptions } from "#/components/name-registration/steps/name-search/advanced-options";
import {
  ExpirationDatePicker,
  getDateDurationLabel,
  MAX_REGISTRATION_YEARS,
  MIN_REGISTRATION_DAYS,
} from "#/components/name-registration/steps/name-search/expiration-date-picker";
import { PaymentTokenSelect } from "#/components/payment-token-select";
import { useNameRegistrationPrice } from "#/hooks";
import { formatError, formatTokenAmount } from "#/lib";
import {
  REGISTRATION_SECONDS_PER_DAY,
  REGISTRATION_SECONDS_PER_YEAR,
  resolvePaymentToken,
} from "#/lib/helpers";
import { useEnsConfig } from "#/providers";

interface RegistrationDetailsProps {
  input: string;
  onReadyChange?: (isReady: boolean) => void;
}

function getYears(duration: bigint) {
  const years = Math.round(Number(duration) / Number(REGISTRATION_SECONDS_PER_YEAR));
  return Math.min(MAX_REGISTRATION_YEARS, Math.max(1, years));
}

export function RegistrationDetails({ input, onReadyChange }: RegistrationDetailsProps) {
  const {
    duration,
    durationMode,
    paymentTokenAddress,
    setDuration,
    setDurationMode,
    setPaymentTokenAddress,
  } = useNameRegistration();
  const { contracts } = useEnsConfig();
  const paymentToken = resolvePaymentToken(contracts.paymentTokens, paymentTokenAddress);
  const timeZone = getLocalTimeZone();
  const years = getYears(duration);
  const selectedDurationDays = Number(duration / REGISTRATION_SECONDS_PER_DAY);
  const expirationDate = today(timeZone).add({
    days: Math.max(MIN_REGISTRATION_DAYS, selectedDurationDays),
  });
  const pickByDate = durationMode === "date";
  const price = useNameRegistrationPrice({
    duration,
    input,
    paymentTokenAddress: paymentToken.address,
  });
  const isReady = price.isSuccess && price.data !== undefined && !price.isFetching;

  useEffect(() => {
    onReadyChange?.(isReady);
    return () => onReadyChange?.(false);
  }, [isReady, onReadyChange]);

  const updateYears = useCallback(
    (value: number) => {
      const nextYears = Math.min(MAX_REGISTRATION_YEARS, Math.max(1, Math.round(value)));
      setDuration(BigInt(nextYears) * REGISTRATION_SECONDS_PER_YEAR);
    },
    [setDuration],
  );

  const updateExpirationDate = useCallback(
    (value: DateValue | null) => {
      if (value === null) return;

      const durationInDays = value.compare(today(timeZone));
      if (durationInDays < MIN_REGISTRATION_DAYS) return;

      setDuration(BigInt(durationInDays) * REGISTRATION_SECONDS_PER_DAY);
    },
    [setDuration, timeZone],
  );

  const toggleDurationMode = useCallback(() => {
    if (pickByDate) {
      updateYears(years);
    } else {
      updateExpirationDate(expirationDate);
    }

    setDurationMode(pickByDate ? "duration" : "date");
  }, [expirationDate, pickByDate, setDurationMode, updateExpirationDate, updateYears, years]);

  return (
    <Surface className="border-default mt-4 rounded-2xl border p-4" variant="transparent">
      {pickByDate ? (
        <ExpirationDatePicker value={expirationDate} onChange={updateExpirationDate} />
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
          <Typography.Paragraph className="mx-auto mt-2 text-center" color="muted" size="xs">
            {formatError(price.error, { name: input })}
          </Typography.Paragraph>
        ) : null}
      </div>
      <AdvancedOptions />
    </Surface>
  );
}
