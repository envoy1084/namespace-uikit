"use client";

// @demo-title With Ripple
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

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

export const ProWithRippleExample = () => (
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
);
