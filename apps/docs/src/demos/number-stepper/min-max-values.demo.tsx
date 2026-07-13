"use client";

// @demo-title Min Max Values
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

export const DemoMinMaxValuesExample = () => (
  <div className="flex gap-8">
    <div className="flex flex-col items-center gap-2">
      <span className="text-muted text-sm">Min: 0, Max: 5</span>
      <NumberStepper
        aria-label="Rating"
        defaultValue={3}
        maxValue={5}
        minValue={0}
      >
        <StepperContent
          decrementLabel="Decrease Rating"
          incrementLabel="Increase Rating"
        />
      </NumberStepper>
    </div>
    <div className="flex flex-col items-center gap-2">
      <span className="text-muted text-sm">Min: -10, Max: 10</span>
      <NumberStepper
        aria-label="Temperature"
        defaultValue={0}
        maxValue={10}
        minValue={-10}
      >
        <StepperContent
          decrementLabel="Decrease Temperature"
          incrementLabel="Increase Temperature"
        />
      </NumberStepper>
    </div>
  </div>
);
