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
  <div className="flex flex-col items-center gap-3">
    <p className="text-muted text-sm">
      With Label and Description using OSS form primitives.
    </p>
    <NumberStepper defaultValue={1} maxValue={10} minValue={1}>
      <Label>Guests</Label>
      <StepperContent
        decrementLabel="Decrease Guests"
        incrementLabel="Increase Guests"
      />
      <Description>Maximum 10 guests per reservation</Description>
    </NumberStepper>
  </div>
);
