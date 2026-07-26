"use client";

import { useEffect, useState } from "react";

import {
  Button,
  InputGroup,
  Modal,
  Spinner,
  Typography,
} from "@thenamespace/uikit";
import { Icon, Search01Icon } from "@thenamespace/uikit/icons";

import { parseNameInput } from "#/actions";
import { useRegisterName } from "#/components/register-name/context";
import { RegistrationDetails } from "#/components/register-name/steps/name-search/registration-details";
import { useNameAvailability } from "#/hooks";
import { formatError } from "#/lib";

const RegisterEnsHeader = new URL(
  "../../../../assets/register-ens-header.svg",
  import.meta.url,
);

export interface NameSearchStepProps {
  onAvailabilityChange?: (isAvailable: boolean) => void;
  onNext: () => void;
}

export const NameSearchStep = ({
  onAvailabilityChange,
  onNext,
}: NameSearchStepProps) => {
  const { input, isReferrerValid, setInput } = useRegisterName();
  const [isPricingReady, setIsPricingReady] = useState(false);
  const availability = useNameAvailability({
    input,
    query: {
      retry: (failureCount, error) =>
        error === "CONTRACT_READ_FAILED" && failureCount < 3,
    },
  });
  const parsedInput = parseNameInput(input);
  const name = parsedInput.isOk() ? parsedInput.value.normalizedName : input;
  const isShortLabelError = availability.error === "LABEL_TOO_SHORT";
  const isAvailable = availability.isSuccess && availability.data;
  const canContinue = isAvailable && isPricingReady && isReferrerValid;
  const showAvailabilityStatus =
    availability.isFetching || availability.isSuccess || availability.isError;

  useEffect(() => {
    onAvailabilityChange?.(isAvailable);
  }, [isAvailable, onAvailabilityChange]);

  return (
    <>
      <Modal.Header className="mx-auto">
        <img
          alt=""
          className="mx-auto w-full max-w-64"
          src={RegisterEnsHeader.href}
        />
        <div>
          <Modal.Heading className="mx-auto text-center">
            Register your ENS Name
          </Modal.Heading>
          <p className="text-muted text-center text-sm">
            Register your ENS name and set a profile
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="flex-none">
        <div>
          <InputGroup className="w-full" variant="secondary">
            <InputGroup.Prefix>
              <Icon
                icon={Search01Icon}
                className="text-muted size-4"
                strokeWidth={2}
              />
            </InputGroup.Prefix>
            <InputGroup.Input
              className="w-full"
              placeholder="Search Label, eg- vitalik"
              value={input}
              onChange={(event) => {
                onAvailabilityChange?.(false);
                setInput(event.target.value);
              }}
            />
            <InputGroup.Suffix>
              <span>.eth</span>
            </InputGroup.Suffix>
          </InputGroup>
          {!isAvailable && showAvailabilityStatus ? (
            <div
              className="mt-2 flex min-h-5 items-center justify-center"
              aria-live="polite"
            >
              {availability.isFetching ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-3" size="sm" />
                  <Typography.Paragraph color="muted" size="xs">
                    Checking availability…
                  </Typography.Paragraph>
                </div>
              ) : availability.isSuccess ? (
                <Typography.Paragraph
                  className="text-danger"
                  size="xs"
                  weight="medium"
                >
                  {name} is not available.
                </Typography.Paragraph>
              ) : availability.isError ? (
                <Typography.Paragraph
                  className={isShortLabelError ? "text-danger" : "text-muted"}
                  size="xs"
                  {...(isShortLabelError && { weight: "medium" })}
                >
                  {formatError(availability.error, { name })}
                </Typography.Paragraph>
              ) : null}
            </div>
          ) : null}
          {isAvailable ? (
            <RegistrationDetails
              input={name}
              onReadyChange={setIsPricingReady}
            />
          ) : null}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="w-full" isDisabled={!canContinue} onPress={onNext}>
          Next
        </Button>
      </Modal.Footer>
    </>
  );
};
