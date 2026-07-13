"use client";

// @demo-title Custom Icons
import { NumberStepper } from "@thenamespace/uikit";
import { ZoomInAreaIcon, ZoomOutAreaIcon } from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";

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
