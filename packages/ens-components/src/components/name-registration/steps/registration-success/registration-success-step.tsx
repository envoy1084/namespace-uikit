import { Button, Surface, Typography } from "@thenamespace/uikit";

import { FlowSuccessHeader } from "#/components/flow-success-header";
import { useNameRegistration } from "#/components/name-registration/context";
import { NameRegistrationBody } from "#/components/name-registration/layout";
import { PaymentTokenIcon } from "#/components/payment-token-icon";
import type { EnsPaymentToken } from "#/data";
import { formatTokenAmount } from "#/lib";
import { formatLocalizedDate, formatRegistrationDuration } from "#/lib/helpers";

export interface RegistrationSuccessDetails {
  amount: bigint;
  decimals: number;
  duration: bigint;
  expiresAt: number;
  name: string;
  paymentTokenIcon: EnsPaymentToken["icon"];
  paymentTokenSymbol: string;
  primaryNameStatus: "failed" | "not-requested" | "set";
}

export interface RegistrationSuccessStepProps {
  onDone: () => void;
  registration: RegistrationSuccessDetails;
}

export function RegistrationSuccessStep({ onDone, registration }: RegistrationSuccessStepProps) {
  const { messages, presentation, slots } = useNameRegistration();
  const expirationDate = formatLocalizedDate(registration.expiresAt);

  return (
    <NameRegistrationBody className="flex-none">
      <div className="flex flex-col items-center px-1 py-4 text-center">
        <FlowSuccessHeader
          graphic={slots.successGraphic}
          name={registration.name}
          title={messages.successTitle}
        />

        <div className="w-full">
          <Surface className="mt-6 w-full rounded-2xl p-4" variant="secondary">
            <div className="flex items-center justify-between gap-4">
              <Typography.Paragraph color="muted" size="sm">
                Registration duration
              </Typography.Paragraph>
              <Typography.Paragraph size="sm" weight="medium">
                {formatRegistrationDuration(registration.duration)}
              </Typography.Paragraph>
            </div>
            <div className="border-default mt-3 flex items-center justify-between gap-4 border-t pt-3">
              <Typography.Paragraph color="muted" size="sm">
                Registration price
              </Typography.Paragraph>
              <div className="flex items-center gap-2">
                <PaymentTokenIcon
                  icon={registration.paymentTokenIcon}
                  symbol={registration.paymentTokenSymbol}
                />
                <span className="text-foreground text-sm font-medium">
                  {formatTokenAmount(registration.amount, registration.decimals, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </Surface>

          <Surface
            className="mt-3 flex w-full items-center justify-between gap-4 rounded-2xl p-4"
            variant="secondary"
          >
            <Typography.Paragraph color="muted" size="sm">
              Name expires
            </Typography.Paragraph>
            <Typography.Paragraph size="sm" weight="medium">
              {expirationDate}
            </Typography.Paragraph>
          </Surface>

          {registration.primaryNameStatus !== "not-requested" ? (
            <Surface
              className="mt-3 flex w-full items-center justify-between gap-4 rounded-2xl p-4"
              variant="secondary"
            >
              <Typography.Paragraph color="muted" size="sm">
                Primary name
              </Typography.Paragraph>
              <Typography.Paragraph
                size="sm"
                weight="medium"
                {...(registration.primaryNameStatus === "failed"
                  ? { className: "text-danger" }
                  : {})}
              >
                {registration.primaryNameStatus === "set" ? "Set" : "Not set"}
              </Typography.Paragraph>
            </Surface>
          ) : null}
        </div>

        <div className="w-full">
          <Button
            className="mt-6 w-full"
            onPress={onDone}
            {...(presentation === "dialog" ? { slot: "close" } : {})}
          >
            {messages.doneLabel}
          </Button>
        </div>
      </div>
    </NameRegistrationBody>
  );
}
