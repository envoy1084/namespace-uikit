"use client";

// @demo-title With Label
import { NumberStepper } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";

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

export const DemoWithLabelExample = () => (
  <NumberStepper
    className="flex-col items-start gap-1.5"
    defaultValue={1}
    maxValue={10}
    minValue={1}
  >
    <Label>Guests</Label>
    <StepperContent decrementLabel="Decrease Guests" incrementLabel="Increase Guests" />
    <Description>Maximum 10 guests per reservation</Description>
  </NumberStepper>
);
