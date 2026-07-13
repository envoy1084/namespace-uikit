"use client";

// @demo-title Custom Icons
import { ZoomInAreaIcon, ZoomOutAreaIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NumberStepper } from "@thenamespace/uikit";

export const DemoCustomIconsExample = () => (
  <NumberStepper
    aria-label="Zoom level"
    defaultValue={100}
    minValue={0}
    step={10}
  >
    <NumberStepper.Group>
      <NumberStepper.DecrementButton aria-label="Decrease Zoom level">
        <HugeiconsIcon icon={ZoomOutAreaIcon} />
      </NumberStepper.DecrementButton>
      <NumberStepper.Value />
      <NumberStepper.IncrementButton aria-label="Increase Zoom level">
        <HugeiconsIcon icon={ZoomInAreaIcon} />
      </NumberStepper.IncrementButton>
    </NumberStepper.Group>
  </NumberStepper>
);
