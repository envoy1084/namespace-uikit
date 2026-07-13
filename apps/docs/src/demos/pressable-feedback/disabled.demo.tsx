"use client";

// @demo-title Disabled
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/icon";

const Trash = () => <Icon icon="solar:trash-bin-trash-linear" />;

const Gear = () => <Icon icon="solar:settings-linear" />;

export const DemoDisabledExample = () => (
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
);
