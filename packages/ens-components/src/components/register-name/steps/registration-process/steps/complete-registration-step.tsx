import type { RegistrationSuccessDetails } from "#/components/register-name/steps/registration-success";

import { Accordion, Typography } from "@thenamespace/uikit";

import { RegistrationPayment } from "#/components/register-name/steps/registration-process/steps/registration-payment";

export interface CompleteRegistrationStepProps {
  isDisabled?: boolean;
  onCommitmentInvalid: (error: unknown) => void;
  onPendingChange?: (isPending: boolean) => void;
  onSuccess: (registration: RegistrationSuccessDetails) => void;
}

export function CompleteRegistrationStep({
  isDisabled = true,
  onCommitmentInvalid,
  onPendingChange,
  onSuccess,
}: CompleteRegistrationStepProps) {
  return (
    <Accordion.Item
      className="bg-surface overflow-hidden rounded-xl [&::after]:hidden"
      id="complete-registration"
      isDisabled={isDisabled}
    >
      <Accordion.Heading>
        <Accordion.Trigger className="gap-3 px-4 py-3">
          <span className="border-default text-muted flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
            3
          </span>
          <span>Complete registration</span>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body>
          <Typography.Paragraph
            color="muted"
            size="xs"
            className="mx-auto text-center leading-[1.2]"
          >
            Your name is not registered yet. Complete the final transaction
            before your commitment expires to claim it.
          </Typography.Paragraph>
          <RegistrationPayment
            onCommitmentInvalid={onCommitmentInvalid}
            onSuccess={onSuccess}
            {...(onPendingChange === undefined ? {} : { onPendingChange })}
          />
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
