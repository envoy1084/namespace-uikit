"use client";

import { useCallback, useEffect, useState, type ChangeEvent } from "react";

import { Button, InputGroup, Spinner, Typography } from "@thenamespace/uikit";
import { Icon, Search01Icon } from "@thenamespace/uikit/icons";

import { useNameRegistration } from "#/components/name-registration/context";
import {
  NameRegistrationBody,
  NameRegistrationFooter,
  NameRegistrationHeader,
  NameRegistrationHeading,
} from "#/components/name-registration/layout";
import { RegistrationDetails } from "#/components/name-registration/steps/name-search/registration-details";
import { useNameAvailability } from "#/hooks";
import { formatError } from "#/lib";
import { parseNameInput } from "#/lib/parse-name-input";

const DefaultNameRegistrationGraphic = new URL(
  "../../../../assets/register-ens-header.svg",
  import.meta.url,
);

export interface NameSearchStepProps {
  onAvailabilityChange?: (isAvailable: boolean) => void;
  onNext: () => void;
}

export const NameSearchStep = ({ onAvailabilityChange, onNext }: NameSearchStepProps) => {
  const { input, isReferrerValid, isResolverValid, messages, setInput, slots } =
    useNameRegistration();
  const [isPricingReady, setIsPricingReady] = useState(false);
  const availability = useNameAvailability({
    input,
    query: {
      retry: (failureCount, error) => error === "CONTRACT_READ_FAILED" && failureCount < 3,
    },
  });
  const parsedInput = parseNameInput(input);
  const name = parsedInput.isOk() ? parsedInput.value.normalizedName : input;
  const inputError =
    input.trim() === ""
      ? undefined
      : parsedInput.isErr()
        ? parsedInput.error
        : parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth"
          ? ("UNSUPPORTED_NAME" as const)
          : undefined;
  const displayedError = availability.error ?? inputError;
  const isShortLabelError = displayedError === "LABEL_TOO_SHORT";
  const isAvailable = availability.isSuccess && availability.data;
  const canContinue = isAvailable && isPricingReady && isReferrerValid && isResolverValid;
  const showAvailabilityStatus =
    inputError !== undefined ||
    availability.isFetching ||
    availability.isSuccess ||
    availability.isError;
  const showEthSuffix = !input.trim().includes(".");

  useEffect(() => {
    onAvailabilityChange?.(isAvailable);
  }, [isAvailable, onAvailabilityChange]);
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onAvailabilityChange?.(false);
      setInput(event.target.value);
    },
    [onAvailabilityChange, setInput],
  );

  return (
    <>
      <NameRegistrationHeader className="mx-auto">
        {slots.searchGraphic === undefined ? (
          <img
            alt=""
            className="mx-auto w-full max-w-64"
            src={DefaultNameRegistrationGraphic.href}
          />
        ) : (
          slots.searchGraphic
        )}
        <div>
          <NameRegistrationHeading className="mx-auto text-center">
            {messages.searchTitle}
          </NameRegistrationHeading>
          <p className="text-muted text-center text-sm">{messages.searchDescription}</p>
        </div>
      </NameRegistrationHeader>
      <NameRegistrationBody className="mt-2 flex-none">
        <div>
          <InputGroup className="w-full" variant="secondary">
            <InputGroup.Prefix>
              <Icon icon={Search01Icon} className="text-muted size-4" strokeWidth={2} />
            </InputGroup.Prefix>
            <InputGroup.Input
              className="w-full"
              placeholder={messages.searchPlaceholder}
              value={input}
              onChange={handleInputChange}
            />
            {showEthSuffix ? (
              <InputGroup.Suffix>
                <span>.eth</span>
              </InputGroup.Suffix>
            ) : null}
          </InputGroup>
          {!isAvailable && showAvailabilityStatus ? (
            <div className="mt-2 flex min-h-5 items-center justify-center" aria-live="polite">
              {availability.isFetching ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-3" size="sm" />
                  <Typography.Paragraph color="muted" size="xs">
                    Checking availability…
                  </Typography.Paragraph>
                </div>
              ) : availability.isSuccess ? (
                <Typography.Paragraph
                  className="text-danger mx-auto text-center"
                  size="xs"
                  weight="medium"
                >
                  {name} is not available.
                </Typography.Paragraph>
              ) : availability.isError || inputError !== undefined ? (
                <Typography.Paragraph
                  className={`mx-auto text-center ${
                    isShortLabelError ? "text-danger" : "text-muted"
                  }`}
                  size="xs"
                  {...(isShortLabelError && { weight: "medium" })}
                >
                  {formatError(displayedError, { name })}
                </Typography.Paragraph>
              ) : null}
            </div>
          ) : null}
          {isAvailable ? (
            <RegistrationDetails input={name} onReadyChange={setIsPricingReady} />
          ) : null}
        </div>
      </NameRegistrationBody>
      <NameRegistrationFooter className="mt-5">
        <Button className="w-full" isDisabled={!canContinue} onPress={onNext}>
          Next
        </Button>
      </NameRegistrationFooter>
    </>
  );
};
