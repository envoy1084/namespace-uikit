import { Accordion, Typography } from "@thenamespace/uikit";

export function CompleteRegistrationStep() {
  return (
    <Accordion.Item
      isDisabled
      className="bg-surface overflow-hidden rounded-xl [&::after]:hidden"
      id="complete-registration"
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
          <Typography.Paragraph color="muted" size="sm">
            Complete the registration transaction to claim your name.
          </Typography.Paragraph>
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
