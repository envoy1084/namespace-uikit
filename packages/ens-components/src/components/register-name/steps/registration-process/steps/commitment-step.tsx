import { Accordion, Button, Typography } from "@thenamespace/uikit";

export function CommitmentStep() {
  return (
    <Accordion.Item
      className="bg-surface overflow-hidden rounded-xl [&::after]:hidden"
      id="commitment"
    >
      <Accordion.Heading>
        <Accordion.Trigger className="gap-3 px-4 py-3">
          <span className="bg-foreground text-background flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            1
          </span>
          <span className="text-foreground">Commitment</span>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body className="px-4 pt-2 pb-4 text-center">
          <Typography.Heading
            className="text-foreground text-base font-semibold"
            level={3}
          >
            Start your registration
          </Typography.Heading>
          <Typography.Paragraph className="mt-2" color="muted" size="sm">
            Submit a commitment transaction to begin the secure registration
            process.
          </Typography.Paragraph>
          <Button className="mt-4 w-full">Commit name</Button>
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
