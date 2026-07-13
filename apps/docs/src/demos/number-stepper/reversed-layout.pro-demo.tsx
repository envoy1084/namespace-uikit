"use client";

// @demo-title Reversed Layout
import { NumberStepper } from "@thenamespace/uikit";

export const ProReversedLayoutExample = () => (
  <div className="flex flex-col items-center gap-3">
    <p className="text-muted text-sm">
      Reversed order — plus on the left, minus on the right.
    </p>
    <NumberStepper aria-label="Quantity" defaultValue={1}>
      <NumberStepper.Group>
        <NumberStepper.IncrementButton aria-label="Increase Quantity" />
        <NumberStepper.Value />
        <NumberStepper.DecrementButton aria-label="Decrease Quantity" />
      </NumberStepper.Group>
    </NumberStepper>
  </div>
);
