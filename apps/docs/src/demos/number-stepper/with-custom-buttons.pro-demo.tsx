"use client";

// @demo-title With Custom Buttons
import { NumberStepper } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

const buttonVariants = ["primary", "secondary", "tertiary", "outline"] as const;

export const ProWithCustomButtonsExample = () => (
  <div className="flex max-w-xl flex-col items-center gap-5">
    <p className="text-muted text-sm">
      Using Namespace UIKit Button (isIconOnly) as custom increment/decrement
      buttons.
    </p>
    <div className="grid grid-cols-4 gap-5">
      {[false, true].flatMap((withoutBackground) =>
        buttonVariants.map((variant) => {
          const suffix = withoutBackground ? " no bg" : "";

          return (
            <div
              className="flex flex-col items-center gap-2"
              key={`${variant}-${suffix}`}
            >
              <span className="text-muted text-xs">{variant}</span>
              <NumberStepper
                aria-label={`Quantity ${variant}${suffix}`}
                defaultValue={1}
              >
                <NumberStepper.Group
                  className={withoutBackground ? "bg-transparent" : undefined}
                >
                  <Button
                    aria-label={`Decrease Quantity ${variant}${suffix}`}
                    className="rounded-full"
                    isIconOnly
                    slot="decrement"
                    variant={variant}
                  >
                    −
                  </Button>
                  <NumberStepper.Value />
                  <Button
                    aria-label={`Increase Quantity ${variant}${suffix}`}
                    className="rounded-full"
                    isIconOnly
                    slot="increment"
                    variant={variant}
                  >
                    +
                  </Button>
                </NumberStepper.Group>
              </NumberStepper>
            </div>
          );
        }),
      )}
    </div>
  </div>
);
