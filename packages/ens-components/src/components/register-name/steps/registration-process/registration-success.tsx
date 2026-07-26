import { Avatar, Button, Surface, Typography } from "@thenamespace/uikit";

import {
  REGISTRATION_SECONDS_PER_DAY,
  REGISTRATION_SECONDS_PER_YEAR,
  useNameRegistration,
} from "#/components/register-name/context";
import { NameRegistrationBody } from "#/components/register-name/layout";
import { formatTokenAmount } from "#/lib";

const RegistrationSuccessGraphic = new URL(
  "../../../../assets/register-ens-success.svg",
  import.meta.url,
);

export interface RegistrationSuccessDetails {
  amount: bigint;
  decimals: number;
  duration: bigint;
  expiresAt: number;
  name: string;
  paymentTokenIcon: string;
  paymentTokenSymbol: string;
}

export interface RegistrationSuccessProps {
  onDone: () => void;
  registration: RegistrationSuccessDetails;
}

function formatDuration(duration: bigint) {
  if (duration % REGISTRATION_SECONDS_PER_YEAR === 0n) {
    const years = duration / REGISTRATION_SECONDS_PER_YEAR;
    return `${years} ${years === 1n ? "year" : "years"}`;
  }

  const days = duration / REGISTRATION_SECONDS_PER_DAY;
  return `${days} ${days === 1n ? "day" : "days"}`;
}

export function RegistrationSuccess({
  onDone,
  registration,
}: RegistrationSuccessProps) {
  const { messages, presentation, slots } = useNameRegistration();
  const expirationDate = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(registration.expiresAt));

  return (
    <NameRegistrationBody className="flex-none">
      <div className="flex flex-col items-center px-1 py-4 text-center">
        {slots.successGraphic === undefined ? (
          <img
            alt=""
            className="h-auto w-full max-w-48"
            src={RegistrationSuccessGraphic.href}
          />
        ) : (
          slots.successGraphic
        )}
        <div>
          <Typography.Paragraph className="mt-5" color="muted" size="sm">
            {messages.successTitle}
          </Typography.Paragraph>
          <Typography.Heading
            className="mt-1 max-w-full text-center text-2xl font-semibold break-all"
            level={3}
          >
            {registration.name}
          </Typography.Heading>
        </div>

        <div className="w-full">
          <Surface className="mt-6 w-full rounded-2xl p-4" variant="secondary">
            <div className="flex items-center justify-between gap-4">
              <Typography.Paragraph color="muted" size="sm">
                Registration duration
              </Typography.Paragraph>
              <Typography.Paragraph size="sm" weight="medium">
                {formatDuration(registration.duration)}
              </Typography.Paragraph>
            </div>
            <div className="border-default mt-3 flex items-center justify-between gap-4 border-t pt-3">
              <Typography.Paragraph color="muted" size="sm">
                Registration price
              </Typography.Paragraph>
              <div className="flex items-center gap-2">
                <Avatar className="size-5">
                  <Avatar.Image
                    alt={`${registration.paymentTokenSymbol} logo`}
                    src={registration.paymentTokenIcon}
                  />
                  <Avatar.Fallback>
                    {registration.paymentTokenSymbol.slice(0, 1)}
                  </Avatar.Fallback>
                </Avatar>
                <span className="text-foreground text-sm font-medium">
                  {formatTokenAmount(
                    registration.amount,
                    registration.decimals,
                    {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    },
                  )}
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
