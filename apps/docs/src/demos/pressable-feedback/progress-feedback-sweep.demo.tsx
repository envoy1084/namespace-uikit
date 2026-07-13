"use client";

// @demo-title Progress Feedback Sweep
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

export const DemoProgressFeedbackSweepExample = () => (
  <div className="flex flex-col gap-6">
    <p className="text-muted text-xs">
      The clip-path reveal can sweep in four directions: right, left, down, up.
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
);
