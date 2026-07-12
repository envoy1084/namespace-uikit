import type { Meta, StoryObj } from "@storybook/react";

import { useMemo, useState } from "react";

import { Button, Input, SearchField } from "@thenamespace/uikit";

import { Sheet } from "./index";

const meta = {
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/Sheet",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function Content({ title = "Edit profile" }: { title?: string }) {
  return (
    <>
      <Sheet.Handle />
      <Sheet.Header>
        <Sheet.Heading>{title}</Sheet.Heading>
        <p className="text-muted text-sm">Make changes and save when done.</p>
      </Sheet.Header>
      <Sheet.Body>
        <Input aria-label="Name" placeholder="Name" />
      </Sheet.Body>
      <Sheet.Footer>
        <Sheet.Close>
          <Button variant="secondary">Cancel</Button>
        </Sheet.Close>
        <Sheet.Close>
          <Button>Save changes</Button>
        </Sheet.Close>
      </Sheet.Footer>
      <Sheet.CloseTrigger />
    </>
  );
}
function Demo({
  label = "Open sheet",
  ...props
}: { label?: string } & React.ComponentProps<typeof Sheet.Root>) {
  return (
    <Sheet.Root {...props}>
      <Sheet.Trigger>
        <Button>{label}</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog aria-label="Profile sheet">
            <Content />
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet.Root>
  );
}
export const Basic: Story = { render: () => <Demo /> };
export const Placements: Story = {
  render: () => (
    <div className="flex gap-2">
      {(["top", "right", "bottom", "left"] as const).map((placement) => (
        <Demo key={placement} label={placement} placement={placement} />
      ))}
    </div>
  ),
};
function SnapDemo({ sequential = false }: { sequential?: boolean }) {
  const points = [0.25, 0.5, 0.9];
  const [point, setPoint] = useState<number | string | null>(points[0]!);
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-muted text-sm">Active snap point: {point}</span>
      <Demo
        activeSnapPoint={point}
        label="Open snap sheet"
        snapPoints={points}
        snapToSequentialPoint={sequential}
        onActiveSnapPointChange={setPoint}
      />
    </div>
  );
}
export const SnapPoints: Story = {
  name: "Snap Points",
  render: () => <SnapDemo />,
};
export const SnapPointsSequential: Story = {
  name: "Snap Points (Sequential)",
  render: () => <SnapDemo sequential />,
};
export const SnapPointsCustomFade: Story = {
  name: "Snap Points (Custom Fade)",
  render: () => <Demo fadeFromIndex={1} snapPoints={[0.3, 0.6, 0.9]} />,
};
export const BackdropVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      {(["opaque", "blur", "transparent"] as const).map((variant) => (
        <Sheet.Root key={variant}>
          <Sheet.Trigger>
            <Button>{variant}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant={variant}>
            <Sheet.Content>
              <Sheet.Dialog aria-label={`${variant} backdrop`}>
                <Content />
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet.Root>
      ))}
    </div>
  ),
};
export const NonDismissable: Story = {
  render: () => <Demo isDismissable={false} label="Open persistent sheet" />,
};
export const ScrollableContent: Story = {
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger>
        <Button>Read article</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog aria-label="Article">
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Scrollable content</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              {Array.from({ length: 16 }, (_, index) => (
                <p className="mb-4" key={index}>
                  This is a long section of sheet content. Scroll to continue
                  reading the article.
                </p>
              ))}
            </Sheet.Body>
            <Sheet.CloseTrigger />
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet.Root>
  ),
};
export const WithForm: Story = {
  render: () => <Demo label="Create account" placement="right" />,
};
export const Detached: Story = {
  render: () => <Demo isDetached label="Open detached sheet" />,
};
function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <span>Sheet is {open ? "open" : "closed"}</span>
      <Demo
        isOpen={open}
        label="Toggle controlled sheet"
        onOpenChange={setOpen}
      />
    </div>
  );
}
export const Controlled: Story = { render: () => <ControlledDemo /> };
export const HandleOnly: Story = {
  render: () => <Demo isHandleOnly label="Drag using handle" />,
};
function NestedDemo() {
  return (
    <Sheet.Root>
      <Sheet.Trigger>
        <Button>Open parent</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog aria-label="Parent sheet">
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Parent sheet</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <Sheet.NestedRoot>
                <Sheet.Trigger>
                  <Button>Open nested sheet</Button>
                </Sheet.Trigger>
                <Sheet.Backdrop>
                  <Sheet.Content>
                    <Sheet.Dialog aria-label="Nested sheet">
                      <Content title="Nested sheet" />
                    </Sheet.Dialog>
                  </Sheet.Content>
                </Sheet.Backdrop>
              </Sheet.NestedRoot>
            </Sheet.Body>
            <Sheet.CloseTrigger />
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet.Root>
  );
}
export const Nested: Story = { render: () => <NestedDemo /> };
const emojis = ["😀", "😍", "🥳", "🔥", "👏", "❤️", "👍", "🎉", "🚀", "✨"];
export const EmojiPickerSheet: Story = {
  name: "Emoji Picker Sheet",
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger>
        <Button>Choose emoji</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog aria-label="Emoji picker">
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Emoji picker</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji) => (
                  <Button aria-label={emoji} key={emoji} variant="ghost">
                    {emoji}
                  </Button>
                ))}
              </div>
            </Sheet.Body>
            <Sheet.CloseTrigger />
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet.Root>
  ),
};
export const SlackLikeMessageActions: Story = {
  name: "Slack-like Message Actions",
  render: () => (
    <Sheet.Root>
      <Sheet.Trigger>
        <Button>Message actions</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog aria-label="Message actions">
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Message actions</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <div className="grid gap-2">
                {[
                  "Reply in thread",
                  "Save for later",
                  "Copy link",
                  "Delete message",
                ].map((action) => (
                  <Button
                    className="justify-start"
                    key={action}
                    variant="ghost"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet.Root>
  ),
};
function Professions() {
  const [query, setQuery] = useState("");
  const values = [
    "Designer",
    "Developer",
    "Product manager",
    "Researcher",
    "Writer",
  ];
  const filtered = useMemo(
    () =>
      values.filter((value) =>
        value.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <Sheet.Root>
      <Sheet.Trigger>
        <Button>Choose profession</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog aria-label="Professions">
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Choose a profession</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <SearchField
                aria-label="Search professions"
                value={query}
                onChange={setQuery}
              >
                <SearchField.Input placeholder="Search" />
              </SearchField>
              <div className="mt-3 grid gap-1">
                {filtered.map((value) => (
                  <Sheet.Close key={value}>
                    <Button className="justify-start" variant="ghost">
                      {value}
                    </Button>
                  </Sheet.Close>
                ))}
              </div>
            </Sheet.Body>
            <Sheet.CloseTrigger />
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet.Root>
  );
}
export const ProfessionsPicker: Story = { render: () => <Professions /> };
