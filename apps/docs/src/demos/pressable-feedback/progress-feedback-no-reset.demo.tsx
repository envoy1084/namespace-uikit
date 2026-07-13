"use client";

// @demo-title Progress Feedback No Reset
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/icon";

const Trash = () => <Icon icon="solar:trash-bin-trash-linear" />;

const Gear = () => <Icon icon="solar:settings-linear" />;

export const DemoProgressFeedbackNoResetExample = () => (
  <div className="flex flex-col gap-6">
    <p className="text-muted text-xs">
      With autoReset=false, the overlay stays revealed after progress completes.
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
);
