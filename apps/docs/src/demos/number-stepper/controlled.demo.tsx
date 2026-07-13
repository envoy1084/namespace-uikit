"use client";

// @demo-title Controlled
import React from "react";

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

function ControlledExample() {
  const [value, setValue] = React.useState(5);

  return (
    <div className="flex flex-col items-center gap-3">
      <NumberStepper
        aria-label="Quantity"
        maxValue={10}
        minValue={0}
        onChange={setValue}
        value={value}
      >
        <StepperContent />
      </NumberStepper>
      <span className="text-muted text-sm">Value: {value}</span>
    </div>
  );
}

export const DemoControlledExample = () => <ControlledExample />;
