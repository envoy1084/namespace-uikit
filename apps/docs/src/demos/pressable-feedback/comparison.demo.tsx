"use client";

// @demo-title Comparison
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

export const DemoComparisonExample = () => (
  <div className="flex flex-col gap-6">
    {["Ripple", "Highlight", "Hold Confirm", "Progress Feedback"].map((label) => (
      <div key={label}>
        <span className="text-muted mb-2 block text-xs font-medium">{label}</span>
        <div className="flex gap-3">
          {(["primary", "secondary", "outline"] as const).map((variant) => (
            <Button key={variant} variant={variant}>
              {label === "Ripple" && <PressableFeedback.Ripple />}
              {label === "Highlight" && <PressableFeedback.Highlight />}
              {label === "Hold Confirm" && (
                <PressableFeedback.HoldConfirm
                  className={
                    variant === "primary"
                      ? "bg-accent text-accent-foreground"
                      : variant === "secondary"
                        ? "bg-accent-soft text-accent-soft-foreground"
                        : "bg-danger text-danger-foreground"
                  }
                >
                  {variant}
                </PressableFeedback.HoldConfirm>
              )}
              {label === "Progress Feedback" && (
                <PressableFeedback.ProgressFeedback
                  className={
                    variant === "primary"
                      ? "bg-accent text-accent-foreground"
                      : variant === "secondary"
                        ? "bg-accent-soft text-accent-soft-foreground"
                        : "bg-danger text-danger-foreground"
                  }
                >
                  {variant}
                </PressableFeedback.ProgressFeedback>
              )}
              {variant}
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);
