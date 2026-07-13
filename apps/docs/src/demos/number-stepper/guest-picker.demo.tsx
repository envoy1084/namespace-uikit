"use client";

// @demo-title Guest Picker
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

const guestTypes = [
  { description: "Ages 13 or above", label: "Adults" },
  { description: "Ages 2–12", label: "Children" },
  { description: "Under 2", label: "Infants" },
  { description: "Bringing a service animal?", label: "Pets" },
] as const;

export const DemoGuestPickerExample = () => (
  <div className="w-80 space-y-5">
    <p className="text-muted text-sm">
      Guest picker using the default NumberStepper look.
    </p>
    {guestTypes.map(({ description, label }) => (
      <div className="flex items-center justify-between gap-8" key={label}>
        <div>
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-muted text-sm">{description}</p>
        </div>
        <NumberStepper
          aria-label={label}
          defaultValue={0}
          minValue={0}
          size="sm"
        >
          <StepperContent
            decrementLabel={`Decrease ${label}`}
            incrementLabel={`Increase ${label}`}
          />
        </NumberStepper>
      </div>
    ))}
  </div>
);
