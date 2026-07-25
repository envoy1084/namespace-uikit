import { Accordion, Typography } from "@thenamespace/uikit";

export interface CompleteRegistrationStepProps {
  isDisabled?: boolean;
}

export function CompleteRegistrationStep({
  isDisabled = true,
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
            className="mx-auto text-center"
          >
            Your name is not registered yet. Complete the final transaction
            before your commitment expires to claim it.
          </Typography.Paragraph>
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
