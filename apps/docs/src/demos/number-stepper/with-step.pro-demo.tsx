"use client";

// @demo-title With Step
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

export const ProWithStepExample = () => (
  <div className="flex gap-8">
    {[5, 10].map((step) => (
      <div className="flex flex-col items-center gap-2" key={step}>
        <span className="text-muted text-sm">Step: {step}</span>
        <NumberStepper
          aria-label={`Quantity step ${step}`}
          defaultValue={0}
          minValue={0}
          step={step}
        >
          <StepperContent
            decrementLabel={`Decrease Quantity step ${step}`}
            incrementLabel={`Increase Quantity step ${step}`}
          />
        </NumberStepper>
      </div>
    ))}
  </div>
);
