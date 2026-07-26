import {
  Avatar,
  Button,
  Modal,
  NumberValue,
  Surface,
  Typography,
} from "@thenamespace/uikit";
import { motion } from "motion/react";
import { formatUnits } from "viem";

const RegistrationSuccessGraphic = new URL(
  "../../../../assets/register-ens-success.svg",
  import.meta.url,
);

const SECONDS_PER_DAY = 86_400n;
const SECONDS_PER_YEAR = 365n * SECONDS_PER_DAY;

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
  if (duration % SECONDS_PER_YEAR === 0n) {
    const years = duration / SECONDS_PER_YEAR;
    return `${years} ${years === 1n ? "year" : "years"}`;
  }

  const days = duration / SECONDS_PER_DAY;
  return `${days} ${days === 1n ? "day" : "days"}`;
}

export function RegistrationSuccess({
  onDone,
  registration,
}: RegistrationSuccessProps) {
  const expirationDate = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(registration.expiresAt));

  return (
    <Modal.Body className="flex-none">
      <div className="flex flex-col items-center px-1 py-4 text-center">
        <motion.img
          alt=""
          animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
          className="h-auto w-full max-w-48"
          initial={{ opacity: 0, rotate: -3, scale: 0.94, y: 8 }}
          src={RegistrationSuccessGraphic.href}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 6 }}
          transition={{ delay: 0.08, duration: 0.25 }}
        >
          <Typography.Paragraph className="mt-5" color="muted" size="sm">
            Hooray! You&apos;ve registered
          </Typography.Paragraph>
          <Typography.Heading
            className="mt-1 max-w-full text-2xl font-semibold break-all"
            level={3}
          >
            {registration.name}
          </Typography.Heading>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
          initial={{ opacity: 0, y: 8 }}
          transition={{ delay: 0.14, duration: 0.28 }}
        >
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
                <NumberValue
                  className="text-foreground text-sm font-medium"
                  maximumFractionDigits={2}
                  minimumFractionDigits={2}
                  value={Number(
                    formatUnits(registration.amount, registration.decimals),
                  )}
                />
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
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
          initial={{ opacity: 0, y: 6 }}
          transition={{ delay: 0.2, duration: 0.25 }}
        >
          <Button className="mt-6 w-full" slot="close" onPress={onDone}>
            Done
          </Button>
        </motion.div>
      </div>
    </Modal.Body>
  );
}
