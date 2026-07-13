"use client";

// @demo-title Hold Confirm Sweep
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

const Trash = () => <Icon icon="solar:trash-bin-trash-linear" />;

export const ProHoldConfirmSweepExample = () => (
  <div className="flex flex-col gap-6">
    <p className="text-muted text-xs">
      The clip-path reveal can sweep in four directions: right, left, down, up.
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
);
