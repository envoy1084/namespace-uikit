"use client";

// @demo-title Custom Value
import { NumberStepper } from "@thenamespace/uikit";

export const DemoCustomValueExample = () => (
  <NumberStepper aria-label="Quantity" defaultValue={3} minValue={0}>
    <NumberStepper.Group>
      <NumberStepper.DecrementButton aria-label="Decrease Quantity" />
      <NumberStepper.Value>
        {({ value }) => (
          <span
            className="number-stepper__value number-stepper__value--md"
            data-slot="number-stepper-value"
          >
            {value} {value === 1 ? "item" : "items"}
          </span>
        )}
      </NumberStepper.Value>
      <NumberStepper.IncrementButton aria-label="Increase Quantity" />
    </NumberStepper.Group>
  </NumberStepper>
);
