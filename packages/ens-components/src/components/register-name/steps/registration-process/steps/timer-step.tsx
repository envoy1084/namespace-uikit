import { Accordion, Typography } from "@thenamespace/uikit";

export function TimerStep() {
  return (
    <Accordion.Item
      isDisabled
      className="bg-surface overflow-hidden rounded-xl [&::after]:hidden"
      id="timer"
    >
      <Accordion.Heading>
        <Accordion.Trigger className="gap-3 px-4 py-3">
          <span className="border-default text-muted flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
            2
          </span>
          <span>Timer started</span>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body>
          <Typography.Paragraph color="muted" size="sm">
            Wait for the commitment to become eligible for registration.
          </Typography.Paragraph>
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
