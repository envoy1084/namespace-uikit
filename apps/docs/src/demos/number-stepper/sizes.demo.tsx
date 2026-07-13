"use client";

// @demo-title Sizes
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

export const DemoSizesExample = () => (
  <div className="flex items-end gap-6">
    {(["sm", "md", "lg"] as const).map((size) => (
      <div className="flex flex-col items-center gap-2" key={size}>
        <span className="text-muted text-sm">{size}</span>
        <NumberStepper
          aria-label={`Quantity ${size}`}
          defaultValue={1}
          size={size}
        >
          <StepperContent
            decrementLabel={`Decrease Quantity ${size}`}
            incrementLabel={`Increase Quantity ${size}`}
          />
        </NumberStepper>
      </div>
    ))}
  </div>
);
