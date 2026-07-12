import type { Meta, StoryObj } from "@storybook/react";

import { useMemo, useState } from "react";

import { Button } from "@thenamespace/uikit/button";
import { Input } from "@thenamespace/uikit/input";
import { Label } from "@thenamespace/uikit/label";
import { SearchField } from "@thenamespace/uikit/search-field";
import { TextField } from "@thenamespace/uikit/textfield";

import { Sheet } from "./index";

const meta = {
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/Sheet",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicDemo() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Open Sheet</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Sheet Title</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-muted text-sm">
                This is a bottom sheet built with smooth drag-to-dismiss
                animations. Try dragging it down to close, or use the close
                button.
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Cancel</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button>Confirm</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const Basic: Story = { render: () => <BasicDemo /> };

function PlacementsDemo() {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Sheet key={placement} placement={placement}>
          <Sheet.Trigger>
            <Button variant="secondary">
              {placement.charAt(0).toUpperCase() + placement.slice(1)}
            </Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant="blur">
            <Sheet.Content
              className={
                placement === "left" || placement === "right"
                  ? "w-[400px]"
                  : undefined
              }
            >
              <Sheet.Dialog>
                <Sheet.CloseTrigger />
                {placement === "bottom" ? <Sheet.Handle /> : null}
                <Sheet.Header>
                  <Sheet.Heading>
                    {placement.charAt(0).toUpperCase() + placement.slice(1)}{" "}
                    Sheet
                  </Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-muted text-sm">
                    This sheet slides in from the <strong>{placement}</strong>{" "}
                    edge of the screen with a smooth spring-like animation.
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button variant="secondary">Cancel</Button>
                  </Sheet.Close>
                  <Sheet.Close>
                    <Button>Done</Button>
                  </Sheet.Close>
                </Sheet.Footer>
                {placement === "top" ? <Sheet.Handle /> : null}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}

export const Placements: Story = { render: () => <PlacementsDemo /> };

const snapPoints = ["148px", "355px", 1];

function SnapPointsDemo() {
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(snapPoints[0]!);

  return (
    <Sheet
      activeSnapPoint={activeSnapPoint}
      snapPoints={snapPoints}
      onActiveSnapPointChange={setActiveSnapPoint}
    >
      <Sheet.Trigger>
        <Button variant="secondary">Snap Points</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Snap Points</Sheet.Heading>
              <p className="text-muted text-sm">
                Current:{" "}
                {typeof activeSnapPoint === "number" ? "100%" : activeSnapPoint}
              </p>
            </Sheet.Header>
            <Sheet.Body>
              <div className="flex flex-col gap-4">
                <p className="text-muted text-sm">
                  Snap points let users drag a sheet to predefined positions.
                  This sheet snaps to 148px, 355px, and full height. The overlay
                  fades in as you reach the highest point.
                </p>
                {Array.from({ length: 6 }).map((_, index) => (
                  <p className="text-muted text-sm" key={index}>
                    {index === 0
                      ? "Drag the handle up to reveal more content and see the overlay fade in."
                      : `More content at this level (${index + 1}).`}
                  </p>
                ))}
              </div>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const SnapPoints: Story = { render: () => <SnapPointsDemo /> };

const sequentialPoints = ["148px", "355px", 1];

function SnapPointsSequentialDemo() {
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(sequentialPoints[0]!);

  return (
    <Sheet
      snapToSequentialPoint
      activeSnapPoint={activeSnapPoint}
      snapPoints={sequentialPoints}
      onActiveSnapPointChange={setActiveSnapPoint}
    >
      <Sheet.Trigger>
        <Button variant="secondary">Sequential Snap Points</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Sequential</Sheet.Heading>
              <p className="text-muted text-sm">
                Current:{" "}
                {typeof activeSnapPoint === "number" ? "100%" : activeSnapPoint}
              </p>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-muted text-sm">
                Velocity-based snapping is disabled with{" "}
                <code className="text-foreground">snapToSequentialPoint</code>.
                A snap point won&apos;t be skipped even if you flick quickly.
                Useful when each level is equally important.
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const SnapPointsSequential: Story = {
  name: "Snap Points (Sequential)",
  render: () => <SnapPointsSequentialDemo />,
};

const customFadePoints = ["150px", "300px", "450px", 1];

function SnapPointsCustomFadeDemo() {
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(customFadePoints[0]!);

  return (
    <Sheet
      activeSnapPoint={activeSnapPoint}
      fadeFromIndex={1}
      snapPoints={customFadePoints}
      onActiveSnapPointChange={setActiveSnapPoint}
    >
      <Sheet.Trigger>
        <Button variant="secondary">Custom Fade Index</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Custom Fade</Sheet.Heading>
              <p className="text-muted text-sm">
                Current:{" "}
                {typeof activeSnapPoint === "number" ? "100%" : activeSnapPoint}
              </p>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-muted text-sm">
                The <code className="text-foreground">fadeFromIndex</code> prop
                controls when the overlay starts fading in. Here it&apos;s set
                to index 1 (300px), so the overlay begins appearing at the
                second snap point instead of the last.
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const SnapPointsCustomFade: Story = {
  name: "Snap Points (Custom Fade)",
  render: () => <SnapPointsCustomFadeDemo />,
};

function BackdropVariantsDemo() {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Sheet key={variant}>
          <Sheet.Trigger>
            <Button variant="secondary">
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant={variant}>
            <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
              <Sheet.Dialog>
                <Sheet.Handle />
                <Sheet.CloseTrigger />
                <Sheet.Header>
                  <Sheet.Heading>
                    Backdrop:{" "}
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-muted text-sm">
                    This sheet uses the{" "}
                    <code className="text-foreground">{variant}</code> backdrop
                    variant.
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button className="w-full">Close</Button>
                  </Sheet.Close>
                </Sheet.Footer>
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}

export const BackdropVariants: Story = {
  render: () => <BackdropVariantsDemo />,
};

function NonDismissableDemo() {
  return (
    <Sheet isDismissable={false}>
      <Sheet.Trigger>
        <Button variant="secondary">Important Action</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Header>
              <Sheet.Heading>Confirm Action</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-muted text-sm">
                This sheet cannot be dismissed by clicking outside or dragging.
                You must use one of the buttons below.
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Cancel</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button>Confirm</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const NonDismissable: Story = { render: () => <NonDismissableDemo /> };

function ScrollableContentDemo() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Terms &amp; Conditions</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Terms &amp; Conditions</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              {Array.from({ length: 20 }).map((_, index) => (
                <p className="text-muted mb-3 text-sm" key={index}>
                  Paragraph {index + 1}: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nullam pulvinar risus non risus hendrerit
                  venenatis. Pellentesque sit amet hendrerit risus, sed
                  porttitor quam. Donec nec vestibulum libero.
                </p>
              ))}
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Decline</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button>Accept</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const ScrollableContent: Story = {
  render: () => <ScrollableContentDemo />,
};

function WithFormDemo() {
  return (
    <Sheet placement="right">
      <Sheet.Trigger>
        <Button variant="secondary">Edit Profile</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="w-[400px]">
          <Sheet.Dialog>
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Edit Profile</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <form className="flex flex-col gap-4">
                <TextField className="w-full" name="name" type="text">
                  <Label>Name</Label>
                  <Input placeholder="Enter your name" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="email" type="email">
                  <Label>Email</Label>
                  <Input placeholder="Enter your email" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="bio">
                  <Label>Bio</Label>
                  <Input
                    placeholder="Tell us about yourself"
                    variant="secondary"
                  />
                </TextField>
              </form>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Cancel</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button>Save Changes</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const WithForm: Story = { render: () => <WithFormDemo /> };

function DetachedDemo() {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Sheet isDetached key={placement} placement={placement}>
          <Sheet.Trigger>
            <Button variant="secondary">
              {placement.charAt(0).toUpperCase() + placement.slice(1)}
            </Button>
          </Sheet.Trigger>
          <Sheet.Backdrop>
            <Sheet.Content
              className={
                placement === "left" || placement === "right"
                  ? "w-[310px]"
                  : "mx-auto max-w-[420px]"
              }
            >
              <Sheet.Dialog
                className={
                  placement === "left" || placement === "right"
                    ? "h-full"
                    : undefined
                }
              >
                {placement === "bottom" ? <Sheet.Handle /> : null}
                <Sheet.Body className="flex flex-col gap-4 py-5">
                  <Sheet.Heading>Detached {placement}</Sheet.Heading>
                  <p className="text-muted text-sm">
                    The sheet floats away from the viewport edge with rounded
                    corners on all sides.
                  </p>
                </Sheet.Body>
                {placement === "top" ? <Sheet.Handle /> : null}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}

export const Detached: Story = { render: () => <DetachedDemo /> };

function ControlledDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
          Open Sheet
        </Button>
        <Button size="sm" variant="tertiary" onPress={() => setIsOpen(!isOpen)}>
          Toggle
        </Button>
        <p className="text-muted text-xs">
          Status:{" "}
          <span className="text-foreground font-mono font-medium">
            {isOpen ? "open" : "closed"}
          </span>
        </p>
      </div>
      <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
        <Sheet.Backdrop>
          <Sheet.Content className="mx-auto max-w-[420px]">
            <Sheet.Dialog>
              <Sheet.Handle />
              <Sheet.CloseTrigger />
              <Sheet.Header>
                <Sheet.Heading>Controlled Sheet</Sheet.Heading>
              </Sheet.Header>
              <Sheet.Body>
                <p className="text-muted text-sm">
                  This sheet is controlled via <code>isOpen</code> and{" "}
                  <code>onOpenChange</code> props. The parent manages the state
                  externally.
                </p>
              </Sheet.Body>
              <Sheet.Footer>
                <Sheet.Close>
                  <Button variant="secondary">Close</Button>
                </Sheet.Close>
              </Sheet.Footer>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
    </div>
  );
}

export const Controlled: Story = { render: () => <ControlledDemo /> };

function HandleOnlyDemo() {
  return (
    <Sheet isHandleOnly>
      <Sheet.Trigger>
        <Button variant="secondary">Handle Only</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Handle-Only Drag</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-muted text-sm">
                This sheet can only be dragged via the handle at the top.
                Dragging the body content will not dismiss it — useful when the
                body has interactive elements.
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button>Done</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const HandleOnly: Story = { render: () => <HandleOnlyDemo /> };

const nestedHeight = "h-[320px]";

function NestedDemo() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Open Parent Sheet</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog className={nestedHeight}>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Parent Sheet</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body className="flex flex-col justify-between pb-4">
              <p className="text-muted mb-4 text-sm">
                This is the parent sheet. Open a nested sheet from here — the
                parent will scale down and the child slides on top.
              </p>
              <Sheet.NestedRoot>
                <Sheet.Trigger>
                  <Button className="w-full" variant="secondary">
                    Open Nested Sheet
                  </Button>
                </Sheet.Trigger>
                <Sheet.Backdrop>
                  <Sheet.Content className="mx-auto max-w-[420px]">
                    <Sheet.Dialog className={nestedHeight}>
                      <Sheet.Handle />
                      <Sheet.CloseTrigger />
                      <Sheet.Header>
                        <Sheet.Heading>Nested Sheet</Sheet.Heading>
                      </Sheet.Header>
                      <Sheet.Body>
                        <p className="text-muted mb-4 text-sm">
                          This is a nested sheet that sits on top of the parent.
                          Drag it down to dismiss and return to the parent
                          sheet.
                        </p>
                        <Sheet.NestedRoot>
                          <Sheet.Trigger>
                            <Button className="w-full" variant="secondary">
                              Go Deeper
                            </Button>
                          </Sheet.Trigger>
                          <Sheet.Backdrop>
                            <Sheet.Content className="mx-auto max-w-[420px]">
                              <Sheet.Dialog className={nestedHeight}>
                                <Sheet.Handle />
                                <Sheet.CloseTrigger />
                                <Sheet.Header>
                                  <Sheet.Heading>Third Level</Sheet.Heading>
                                </Sheet.Header>
                                <Sheet.Body>
                                  <p className="text-muted text-sm">
                                    Three levels deep! Each parent sheet scales
                                    down as the next one opens, creating a
                                    stacking effect.
                                  </p>
                                </Sheet.Body>
                                <Sheet.Footer>
                                  <Sheet.Close>
                                    <Button className="w-full">Close</Button>
                                  </Sheet.Close>
                                </Sheet.Footer>
                              </Sheet.Dialog>
                            </Sheet.Content>
                          </Sheet.Backdrop>
                        </Sheet.NestedRoot>
                      </Sheet.Body>
                      <Sheet.Footer>
                        <Sheet.Close>
                          <Button variant="secondary">Back</Button>
                        </Sheet.Close>
                      </Sheet.Footer>
                    </Sheet.Dialog>
                  </Sheet.Content>
                </Sheet.Backdrop>
              </Sheet.NestedRoot>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const Nested: Story = { render: () => <NestedDemo /> };

const emojis = ["😀", "😍", "🥳", "🔥", "👏", "❤️", "👍", "🎉", "🚀", "✨"];

export const EmojiPickerSheet: Story = {
  name: "Emoji Picker Sheet",
  render: () => (
    <Sheet isDetached snapPoints={["355px", 1]}>
      <Sheet.Trigger>
        <Button variant="secondary">😀 Emoji Picker</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Body className="min-h-0 overflow-hidden p-0">
              <div className="grid grid-cols-5 gap-2 p-4">
                {emojis.map((emoji) => (
                  <Sheet.Close key={emoji}>
                    <Button isIconOnly aria-label={emoji} variant="ghost">
                      {emoji}
                    </Button>
                  </Sheet.Close>
                ))}
              </div>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  ),
};

export const SlackLikeMessageActions: Story = {
  name: "Slack-like Message Actions",
  render: () => (
    <Sheet snapPoints={["355px", 1]}>
      <Sheet.Trigger>
        <Button variant="secondary">Slack message actions</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
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
    </Sheet>
  ),
};

function ProfessionsPickerDemo() {
  const occupations = [
    "Designer",
    "Developer",
    "Product manager",
    "Researcher",
    "Writer",
  ];
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const filtered = useMemo(
    () =>
      occupations.filter((occupation) =>
        occupation.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="flex flex-col items-center gap-3">
      <Sheet snapPoints={["355px", 1]}>
        <Sheet.Trigger>
          <Button variant="secondary">Choose Occupation</Button>
        </Sheet.Trigger>
        <Sheet.Backdrop>
          <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
            <Sheet.Dialog>
              <Sheet.Handle />
              <Sheet.Body className="flex min-h-0 flex-col gap-0 overflow-hidden p-0">
                <div className="px-4 pt-1 pb-2">
                  <SearchField
                    aria-label="Search occupations"
                    value={query}
                    onChange={setQuery}
                  >
                    <SearchField.Input placeholder="Search" />
                  </SearchField>
                </div>
                <div className="grid gap-1 p-3">
                  {filtered.map((occupation) => (
                    <Sheet.Close key={occupation}>
                      <Button
                        className="justify-start"
                        variant="ghost"
                        onPress={() => setSelected(occupation)}
                      >
                        {occupation}
                      </Button>
                    </Sheet.Close>
                  ))}
                </div>
              </Sheet.Body>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
      <p className="text-muted text-sm">
        Selected:{" "}
        <span className="text-foreground font-medium">{selected}</span>
      </p>
    </div>
  );
}

export const ProfessionsPicker: Story = {
  render: () => <ProfessionsPickerDemo />,
};
