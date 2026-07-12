import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { ArrowRight01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Icon } from "@iconify/react";

import { Button } from "../button";
import { Card } from "../card";
import { PressableFeedback } from "./index";

const meta = {
  component: PressableFeedback,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/PressableFeedback",
} satisfies Meta<typeof PressableFeedback>;
export default meta;
type Story = StoryObj<typeof meta>;

const variants = [
  "primary",
  "secondary",
  "tertiary",
  "outline",
  "ghost",
  "danger",
] as const;
const Trash = () => <Icon icon="solar:trash-bin-trash-linear" />;
const Gear = () => <Icon icon="solar:settings-linear" />;

export const WithRipple: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            <PressableFeedback.Ripple />
            {variant === "primary"
              ? "Primary"
              : variant[0].toUpperCase() + variant.slice(1)}
          </Button>
        ))}
        <Button variant="danger-soft">
          <PressableFeedback.Ripple />
          Danger Soft
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>
          <PressableFeedback.Ripple />
          <Icon icon="solar:global-linear" />
          Search
        </Button>
        <Button variant="secondary">
          <PressableFeedback.Ripple />
          <Icon icon="solar:add-circle-linear" />
          Add Member
        </Button>
        <Button variant="tertiary">
          <PressableFeedback.Ripple />
          <Icon icon="solar:letter-linear" />
          Email
        </Button>
        <Button variant="danger">
          <PressableFeedback.Ripple />
          <Trash />
          Delete
        </Button>
      </div>
      <div className="flex gap-3">
        <Button isIconOnly variant="tertiary">
          <PressableFeedback.Ripple />
          <Icon icon="solar:menu-dots-bold" />
        </Button>
        <Button isIconOnly variant="secondary">
          <PressableFeedback.Ripple />
          <Gear />
        </Button>
        <Button isIconOnly variant="danger">
          <PressableFeedback.Ripple />
          <Trash />
        </Button>
      </div>
    </div>
  ),
};

export const WithHighlight: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            <PressableFeedback.Highlight />
            {variant === "primary"
              ? "Primary"
              : variant[0].toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>
          <PressableFeedback.Highlight />
          <Icon icon="solar:global-linear" />
          Search
        </Button>
        <Button variant="secondary">
          <PressableFeedback.Highlight />
          <Icon icon="solar:add-circle-linear" />
          Add Member
        </Button>
        <Button variant="tertiary">
          <PressableFeedback.Highlight />
          <Icon icon="solar:letter-linear" />
          Email
        </Button>
        <Button variant="danger">
          <PressableFeedback.Highlight />
          <Trash />
          Delete
        </Button>
      </div>
      <div className="flex gap-3">
        <Button isIconOnly variant="tertiary">
          <PressableFeedback.Highlight />
          <Icon icon="solar:menu-dots-bold" />
        </Button>
        <Button isIconOnly variant="secondary">
          <PressableFeedback.Highlight />
          <Gear />
        </Button>
        <Button isIconOnly variant="danger">
          <PressableFeedback.Highlight />
          <Trash />
        </Button>
      </div>
    </div>
  ),
};

export const PressableCards: Story = {
  render: () => (
    <div className="grid w-[500px] grid-cols-12 gap-4">
      <Card className="relative col-span-12 h-[220px] overflow-hidden">
        <PressableFeedback.Ripple className="z-1" />
        <img
          alt="NEO Home Robot"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo1.jpeg"
        />
        <Card.Header className="z-10">
          <Card.Title className="text-xs font-semibold tracking-wide text-black/70">
            NEO
          </Card.Title>
          <Card.Description className="text-sm leading-5 font-medium text-black/50">
            Home Robot
          </Card.Description>
        </Card.Header>
        <Card.Footer className="z-10 mt-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-black">Available soon</div>
            <div className="text-xs text-black/60">Get notified</div>
          </div>
          <Button className="bg-white text-black" size="sm" variant="tertiary">
            <PressableFeedback.Ripple />
            Notify me
          </Button>
        </Card.Footer>
      </Card>
      {[
        {
          name: "Indie Hackers",
          members: 148,
          image: "demo1.jpg",
          color: "text-rose-200",
        },
        {
          name: "AI Builders",
          members: 362,
          image: "demo2.jpg",
          color: "text-sky-300",
        },
      ].map((item) => (
        <Card
          className="col-span-6 cursor-pointer gap-2 overflow-hidden"
          key={item.name}
        >
          <PressableFeedback.Ripple className={item.color} />
          <Card.Header>
            <img
              alt={item.name}
              className="size-14 rounded-xl object-cover"
              src={`https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/${item.image}`}
            />
          </Card.Header>
          <Card.Content className="mt-1">
            <p className="text-sm leading-4 font-medium">{item.name}</p>
            <p className="text-muted text-xs">{item.members} members</p>
          </Card.Content>
          <Card.Footer>
            <p className="text-muted text-xs">
              By {item.name === "Indie Hackers" ? "John" : "Martha"}
            </p>
          </Card.Footer>
        </Card>
      ))}
      {[
        {
          title: "Bridging the Future",
          time: "Today, 6:30 PM",
          image: "robot1.jpeg",
        },
        {
          title: "Avocado Hackathon",
          time: "Wed, 4:30 PM",
          image: "avocado.jpeg",
        },
      ].map((item) => (
        <Card
          className="col-span-12 flex cursor-pointer flex-row gap-3 overflow-hidden p-2"
          key={item.title}
          variant="transparent"
        >
          <PressableFeedback.Highlight />
          <img
            alt={item.title}
            className="aspect-square h-20 w-20 shrink-0 rounded-xl object-cover"
            src={`https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/${item.image}`}
          />
          <div className="flex flex-1 flex-col justify-center gap-1">
            <Card.Title className="text-sm">{item.title}</Card.Title>
            <Card.Description className="text-xs">{item.time}</Card.Description>
          </div>
        </Card>
      ))}
    </div>
  ),
};

function HoldButtons({ duration }: { duration?: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="danger-soft">
        <PressableFeedback.HoldConfirm
          className="bg-danger text-danger-foreground"
          duration={duration}
        >
          <Trash />
          {duration
            ? `${duration === 800 ? "Fast" : "Slow"} (${duration >= 1000 ? duration / 1000 + "s" : duration + "ms"})`
            : "Hold to Delete"}
        </PressableFeedback.HoldConfirm>
        <Trash />
        {duration
          ? `${duration === 800 ? "Fast" : "Slow"} (${duration >= 1000 ? duration / 1000 + "s" : duration + "ms"})`
          : "Hold to Delete"}
      </Button>
    </div>
  );
}

export const WithHoldConfirm: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        Press and hold buttons to see the clip-path reveal.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm className="bg-danger text-danger-foreground">
            <Trash />
            Hold to Delete
          </PressableFeedback.HoldConfirm>
          <Trash />
          Hold to Delete
        </Button>
        <Button variant="secondary">
          <PressableFeedback.HoldConfirm className="bg-accent-soft text-accent-soft-foreground">
            <Gear />
            Hold to Apply
          </PressableFeedback.HoldConfirm>
          <Gear />
          Hold to Apply
        </Button>
        <Button variant="tertiary">
          <PressableFeedback.HoldConfirm className="bg-accent text-accent-foreground">
            Added!
          </PressableFeedback.HoldConfirm>
          Hold to Add
        </Button>
      </div>
    </div>
  ),
};
export const HoldConfirmDurations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        Different hold durations: fast (800ms), default (2s), slow (4s).
      </p>
      <div className="flex gap-3">
        <HoldButtons duration={800} />
        <HoldButtons />
        <HoldButtons duration={4000} />
      </div>
    </div>
  ),
};
export const HoldConfirmSweep: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        The clip-path reveal can sweep in four directions: right, left, down,
        up.
      </p>
      <div className="flex gap-3">
        {(["right", "left", "down", "up"] as const).map((sweep) => (
          <Button key={sweep} variant="danger-soft">
            <PressableFeedback.HoldConfirm
              className="bg-danger text-danger-foreground"
              sweep={sweep}
            >
              <Trash />
              Sweep {sweep[0].toUpperCase() + sweep.slice(1)}
            </PressableFeedback.HoldConfirm>
            <Trash />
            Sweep {sweep[0].toUpperCase() + sweep.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const HoldConfirmCallback: Story = {
  render: function Demo() {
    const [count, setCount] = useState(0);
    return (
      <div className="flex flex-col items-center gap-4">
        <Button variant="danger-soft">
          <PressableFeedback.HoldConfirm
            className="bg-danger text-danger-foreground"
            onComplete={() => setCount((v) => v + 1)}
          >
            <Trash />
            Hold to Delete
          </PressableFeedback.HoldConfirm>
          <Trash />
          Hold to Delete
        </Button>
        <p className="text-muted text-xs">
          Count: <strong>{count}</strong>
        </p>
      </div>
    );
  },
};

export const WithProgressFeedback: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        Click once — the overlay sweeps in automatically.
      </p>
      <div className="flex gap-3">
        <Button variant="secondary">
          <PressableFeedback.ProgressFeedback className="bg-accent text-accent-foreground">
            Buying!
          </PressableFeedback.ProgressFeedback>
          <Icon icon="solar:cart-large-2-linear" />
          Buy Now
        </Button>
        <Button variant="secondary">
          <PressableFeedback.ProgressFeedback className="bg-accent text-accent-foreground">
            <Gear />
            Applied!
          </PressableFeedback.ProgressFeedback>
          <Gear />
          Apply Settings
        </Button>
        <Button variant="tertiary">
          <PressableFeedback.ProgressFeedback className="bg-accent text-accent-foreground">
            Added!
          </PressableFeedback.ProgressFeedback>
          Add Item
        </Button>
      </div>
    </div>
  ),
};
export const ProgressFeedbackDurations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        Different progress durations: fast (800ms), default (2s), slow (4s).
      </p>
      <div className="flex gap-3">
        {[
          { label: "Fast (800ms)", duration: 800 },
          { label: "Default (2s)", duration: 2000 },
          { label: "Slow (4s)", duration: 4000 },
        ].map((item) => (
          <Button key={item.label} variant="secondary">
            <PressableFeedback.ProgressFeedback
              className="bg-accent text-accent-foreground"
              duration={item.duration}
            >
              {item.label}
            </PressableFeedback.ProgressFeedback>
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  ),
};
export const ProgressFeedbackSweep: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        The clip-path reveal can sweep in four directions: right, left, down,
        up.
      </p>
      <div className="flex gap-3">
        {(["right", "left", "down", "up"] as const).map((sweep) => (
          <Button key={sweep} variant="secondary">
            <PressableFeedback.ProgressFeedback
              className="bg-accent text-accent-foreground"
              sweep={sweep}
            >
              Sweep {sweep[0].toUpperCase() + sweep.slice(1)}
            </PressableFeedback.ProgressFeedback>
            Sweep {sweep[0].toUpperCase() + sweep.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  ),
};
export const ProgressFeedbackCallback: Story = {
  render: function Demo() {
    const [count, setCount] = useState(0);
    return (
      <div className="flex flex-col items-center gap-4">
        <Button variant="secondary">
          <PressableFeedback.ProgressFeedback
            className="bg-accent text-accent-foreground"
            onComplete={() => setCount((v) => v + 1)}
          >
            Send
          </PressableFeedback.ProgressFeedback>
          Send
        </Button>
        <p className="text-muted text-xs">
          Count: <strong>{count}</strong>
        </p>
      </div>
    );
  },
};
export const ProgressFeedbackNoReset: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-xs">
        With autoReset=false, the overlay stays revealed after progress
        completes.
      </p>
      <div className="flex gap-3">
        <Button variant="danger-soft">
          <PressableFeedback.ProgressFeedback
            autoReset={false}
            className="bg-danger text-danger-foreground"
          >
            <Trash />
            Account Deleted
          </PressableFeedback.ProgressFeedback>
          <Trash />
          Delete Account
        </Button>
        <Button variant="secondary">
          <PressableFeedback.ProgressFeedback
            autoReset={false}
            className="bg-accent text-accent-foreground"
          >
            <Gear />
            Settings Applied
          </PressableFeedback.ProgressFeedback>
          <Gear />
          Apply Settings
        </Button>
      </div>
    </div>
  ),
};

export const Comparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {["Ripple", "Highlight", "Hold Confirm", "Progress Feedback"].map(
        (label) => (
          <div key={label}>
            <span className="text-muted mb-2 block text-xs font-medium">
              {label}
            </span>
            <div className="flex gap-3">
              {(["primary", "secondary", "outline"] as const).map((variant) => (
                <Button key={variant} variant={variant}>
                  {label === "Ripple" && <PressableFeedback.Ripple />}
                  {label === "Highlight" && <PressableFeedback.Highlight />}
                  {label === "Hold Confirm" && (
                    <PressableFeedback.HoldConfirm className="bg-accent text-accent-foreground">
                      {variant}
                    </PressableFeedback.HoldConfirm>
                  )}
                  {label === "Progress Feedback" && (
                    <PressableFeedback.ProgressFeedback className="bg-accent text-accent-foreground">
                      {variant}
                    </PressableFeedback.ProgressFeedback>
                  )}
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button isDisabled>
          <PressableFeedback.Ripple />
          Disabled Ripple
        </Button>
        <Button isDisabled variant="secondary">
          <PressableFeedback.Ripple />
          Secondary
        </Button>
        <Button isDisabled isIconOnly variant="tertiary">
          <PressableFeedback.Ripple />
          <Gear />
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button isDisabled>
          <PressableFeedback.Highlight />
          Disabled Highlight
        </Button>
        <Button isDisabled variant="secondary">
          <PressableFeedback.Highlight />
          Secondary
        </Button>
        <Button isDisabled isIconOnly variant="tertiary">
          <PressableFeedback.Highlight />
          <Gear />
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button isDisabled variant="danger-soft">
          <PressableFeedback.HoldConfirm className="bg-danger text-danger-foreground">
            <Trash />
            Disabled Hold
          </PressableFeedback.HoldConfirm>
          <Trash />
          Disabled Hold
        </Button>
        <Button isDisabled variant="secondary">
          <PressableFeedback.HoldConfirm className="bg-accent-soft text-accent-soft-foreground">
            Secondary
          </PressableFeedback.HoldConfirm>
          Secondary
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button isDisabled variant="danger-soft">
          <PressableFeedback.ProgressFeedback className="bg-danger text-danger-foreground">
            <Trash />
            Disabled Progress
          </PressableFeedback.ProgressFeedback>
          <Trash />
          Disabled Progress
        </Button>
        <Button isDisabled variant="secondary">
          <PressableFeedback.ProgressFeedback className="bg-accent-soft text-accent-soft-foreground">
            Secondary
          </PressableFeedback.ProgressFeedback>
          Secondary
        </Button>
      </div>
    </div>
  ),
};

function StandaloneRow({ mode }: { mode: "highlight" | "ripple" }) {
  return (
    <div className="w-[500px]">
      <button
        className="border-separator bg-surface relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left"
        type="button"
      >
        {mode === "ripple" ? (
          <PressableFeedback.Ripple />
        ) : (
          <PressableFeedback.Highlight />
        )}
        <span className="bg-default flex size-10 items-center justify-center rounded-xl">
          <HugeiconsIcon
            aria-hidden
            icon={UserIcon}
            size={16}
            strokeWidth={2}
          />
        </span>
        <span className="flex flex-1 flex-col">
          <strong>Profile</strong>
          <span className="text-muted text-sm">
            Update your personal information
          </span>
        </span>
        <span>
          <HugeiconsIcon
            aria-hidden
            className="text-muted size-4"
            icon={ArrowRight01Icon}
            strokeWidth={2}
          />
        </span>
      </button>
    </div>
  );
}
export const StandaloneRipple: Story = {
  render: () => <StandaloneRow mode="ripple" />,
};
export const StandaloneHighlight: Story = {
  render: () => <StandaloneRow mode="highlight" />,
};
