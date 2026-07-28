import { Avatar, Button, Surface, Typography } from "@thenamespace/uikit";

import { FlowSuccessHeader } from "#/components/flow-success-header";
import { useNameRenewal } from "#/components/name-renewal/context";
import { NameRenewalBody } from "#/components/name-renewal/layout";
import type { NameRenewalSuccessDetails } from "#/components/name-renewal/types";
import { formatTokenAmount } from "#/lib";
import { formatRegistrationDuration, formatUnixTimestamp } from "#/lib/helpers";

export interface NameRenewalSuccessProps {
  onDone: () => void;
  renewal: NameRenewalSuccessDetails;
}

export function NameRenewalSuccess({ onDone, renewal }: NameRenewalSuccessProps) {
  const { messages, presentation, slots } = useNameRenewal();

  return (
    <NameRenewalBody className="flex-none">
      <div className="flex flex-col items-center px-1 py-4 text-center">
        <FlowSuccessHeader
          graphic={slots.successGraphic}
          name={renewal.name}
          title={messages.successTitle}
        />

        <div className="mt-6 w-full space-y-3">
          <Surface className="w-full rounded-2xl p-4" variant="secondary">
            <div className="flex items-center justify-between gap-4">
              <Typography.Paragraph color="muted" size="sm">
                Extended by
              </Typography.Paragraph>
              <Typography.Paragraph size="sm" weight="medium">
                {formatRegistrationDuration(renewal.duration)}
              </Typography.Paragraph>
            </div>
            <div className="border-default mt-3 border-t pt-3">
              <div className="flex items-center justify-between gap-4">
                <Typography.Paragraph color="muted" size="sm">
                  New expiry
                </Typography.Paragraph>
                <Typography.Paragraph size="sm" weight="medium">
                  {formatUnixTimestamp(renewal.newExpiry)}
                </Typography.Paragraph>
              </div>
              <Typography.Paragraph className="mt-1 text-right" color="muted" size="xs">
                Previously {formatUnixTimestamp(renewal.currentExpiry)}
              </Typography.Paragraph>
            </div>
          </Surface>

          <Surface
            className="flex w-full items-center justify-between gap-4 rounded-2xl p-4"
            variant="secondary"
          >
            <Typography.Paragraph color="muted" size="sm">
              Renewal price
            </Typography.Paragraph>
            <div className="flex items-center gap-2">
              <Avatar className="size-5">
                <Avatar.Image
                  alt={`${renewal.paymentTokenSymbol} logo`}
                  src={renewal.paymentTokenIcon}
                />
                <Avatar.Fallback>{renewal.paymentTokenSymbol.slice(0, 1)}</Avatar.Fallback>
              </Avatar>
              <span className="text-foreground text-sm font-medium">
                {formatTokenAmount(renewal.amount, renewal.decimals, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </Surface>
        </div>

        <Button
          className="mt-6 w-full"
          onPress={onDone}
          {...(presentation === "dialog" ? { slot: "close" } : {})}
        >
          {messages.doneLabel}
        </Button>
      </div>
    </NameRenewalBody>
  );
}
