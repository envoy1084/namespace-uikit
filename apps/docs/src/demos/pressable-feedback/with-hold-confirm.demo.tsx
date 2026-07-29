"use client";

// @demo-title With Hold Confirm
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/icon";

const Trash = () => <Icon icon="solar:trash-bin-trash-linear" />;

const Gear = () => <Icon icon="solar:settings-linear" />;

export const DemoWithHoldConfirmExample = () => (
  <div className="flex flex-col gap-6">
    <p className="text-muted text-xs">Press and hold buttons to see the clip-path reveal.</p>
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
          <Icon icon="solar:add-circle-linear" />
          Added!
        </PressableFeedback.HoldConfirm>
        <Icon icon="solar:add-circle-linear" />
        Hold to Add
      </Button>
    </div>
    <div className="flex gap-3">
      <Button isIconOnly variant="danger-soft">
        <PressableFeedback.HoldConfirm className="bg-danger text-danger-foreground" sweep="up">
          <Trash />
        </PressableFeedback.HoldConfirm>
        <Trash />
      </Button>
      <Button isIconOnly variant="secondary">
        <PressableFeedback.HoldConfirm className="bg-accent text-accent-foreground">
          <Gear />
        </PressableFeedback.HoldConfirm>
        <Gear />
      </Button>
    </div>
  </div>
);
