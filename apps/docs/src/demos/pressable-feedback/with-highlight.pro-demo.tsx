"use client";

// @demo-title With Highlight
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

export const ProWithHighlightExample = () => (
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
);
