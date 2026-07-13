"use client";

// @demo-title Hold Confirm Durations
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/icon";

const Trash = () => <Icon icon="solar:trash-bin-trash-linear" />;

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

export const DemoHoldConfirmDurationsExample = () => (
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
);
