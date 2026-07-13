"use client";

// @demo-title With Format Options
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

export const DemoWithFormatOptionsExample = () => (
  <div className="flex flex-col items-center gap-5">
    <p className="text-muted text-sm">
      Currency and percentage formatting via formatOptions.
    </p>
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-muted text-sm">Currency (USD)</span>
        <NumberStepper
          aria-label="Price"
          defaultValue={10}
          formatOptions={{ currency: "USD", style: "currency" }}
          minValue={0}
        >
          <StepperContent
            decrementLabel="Decrease Price"
            incrementLabel="Increase Price"
          />
        </NumberStepper>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-muted text-sm">Percentage</span>
        <NumberStepper
          aria-label="Opacity"
          defaultValue={0.5}
          formatOptions={{ style: "percent" }}
          maxValue={1}
          minValue={0}
          step={0.1}
        >
          <StepperContent
            decrementLabel="Decrease Opacity"
            incrementLabel="Increase Opacity"
          />
        </NumberStepper>
      </div>
    </div>
  </div>
);
