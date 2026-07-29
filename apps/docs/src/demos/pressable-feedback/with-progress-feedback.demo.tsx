"use client";

// @demo-title With Progress Feedback
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/icon";

const Gear = () => <Icon icon="solar:settings-linear" />;
const Trash = () => <Icon icon="solar:trash-bin-trash-linear" />;

export const DemoWithProgressFeedbackExample = () => (
  <div className="flex flex-col gap-6">
    <p className="text-muted text-xs">Click once — the overlay sweeps in automatically.</p>
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
          <Icon icon="solar:add-circle-linear" />
          Added!
        </PressableFeedback.ProgressFeedback>
        <Icon icon="solar:add-circle-linear" />
        Add Item
      </Button>
    </div>
    <div className="flex gap-3">
      <Button isIconOnly variant="danger-soft">
        <PressableFeedback.ProgressFeedback className="bg-danger text-danger-foreground" sweep="up">
          <Trash />
        </PressableFeedback.ProgressFeedback>
        <Trash />
      </Button>
      <Button isIconOnly variant="secondary">
        <PressableFeedback.ProgressFeedback className="bg-accent text-accent-foreground">
          <Gear />
        </PressableFeedback.ProgressFeedback>
        <Gear />
      </Button>
    </div>
  </div>
);
