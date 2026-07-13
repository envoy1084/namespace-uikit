"use client";

// @demo-title Default
import { NumberStepper } from "@thenamespace/uikit";

interface StepperContentProps {
  decrementLabel?: string;
  incrementLabel?: string;
}

function StepperContent({
  decrementLabel = "Decrease Quantity",
  incrementLabel = "Increase Quantity",
}: StepperContentProps) {
  return (
    <NumberStepper.Group>
      <NumberStepper.DecrementButton aria-label={decrementLabel} />
      <NumberStepper.Value />
      <NumberStepper.IncrementButton aria-label={incrementLabel} />
    </NumberStepper.Group>
  );
}

export const ProDefaultExample = () => (
  <NumberStepper
    aria-label="Quantity"
    defaultValue={1}
    maxValue={99}
    minValue={0}
  >
    <StepperContent />
  </NumberStepper>
);
