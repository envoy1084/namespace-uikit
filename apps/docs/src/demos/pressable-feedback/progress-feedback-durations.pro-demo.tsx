"use client";

// @demo-title Progress Feedback Durations
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

export const ProProgressFeedbackDurationsExample = () => (
  <div className="flex flex-col gap-6">
    <p className="text-muted text-xs">
      Different progress durations: fast (800ms), default (2s), slow (4s).
    </p>
    <div className="flex gap-3">
      {[
        { label: "Fast (800ms)", duration: 800 },
        { label: "Default (2s)", duration: 2000 },
        { label: "Slow (4s)", duration: 4000 },
      ].map((item) => (
        <Button key={item.label} variant="secondary">
          <PressableFeedback.ProgressFeedback
            className="bg-accent text-accent-foreground"
            duration={item.duration}
          >
            {item.label}
          </PressableFeedback.ProgressFeedback>
          {item.label}
        </Button>
      ))}
    </div>
  </div>
);
