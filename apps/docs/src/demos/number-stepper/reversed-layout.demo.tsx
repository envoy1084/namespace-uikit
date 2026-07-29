"use client";

// @demo-title Reversed Layout
import { NumberStepper } from "@thenamespace/uikit";

export const DemoReversedLayoutExample = () => (
  <NumberStepper aria-label="Quantity" defaultValue={1}>
    <NumberStepper.Group>
      <NumberStepper.IncrementButton aria-label="Increase Quantity" />
      <NumberStepper.Value />
      <NumberStepper.DecrementButton aria-label="Decrease Quantity" />
    </NumberStepper.Group>
  </NumberStepper>
);
