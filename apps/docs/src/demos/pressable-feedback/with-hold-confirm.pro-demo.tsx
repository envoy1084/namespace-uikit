"use client";

// @demo-title With Hold Confirm
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

const Trash = () => <Icon icon="solar:trash-bin-trash-linear" />;

const Gear = () => <Icon icon="solar:settings-linear" />;

export const ProWithHoldConfirmExample = () => (
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
);
