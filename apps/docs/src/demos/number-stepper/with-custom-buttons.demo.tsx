"use client";

// @demo-title With Custom Buttons
import { NumberStepper } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { IconMinus, IconPlus } from "@thenamespace/uikit/icons";

const buttonVariants = ["primary", "secondary", "tertiary", "outline"] as const;

export const DemoWithCustomButtonsExample = () => (
  <div className="grid grid-cols-4 gap-5">
    {[false, true].flatMap((withoutBackground) =>
      buttonVariants.map((variant) => {
        const suffix = withoutBackground ? " no bg" : "";

        return (
          <div className="flex flex-col items-center gap-2" key={`${variant}-${suffix}`}>
            <span className="text-muted text-xs">{variant}</span>
            <NumberStepper aria-label={`Quantity ${variant}${suffix}`} defaultValue={1}>
              <NumberStepper.Group className={`gap-3 ${withoutBackground ? "bg-transparent" : ""}`}>
                <Button
                  isIconOnly
                  aria-label={`Decrease Quantity ${variant}${suffix}`}
                  size="sm"
                  slot="decrement"
                  variant={variant}
                >
                  <IconMinus />
                </Button>
                <NumberStepper.Value />
                <Button
                  isIconOnly
                  aria-label={`Increase Quantity ${variant}${suffix}`}
                  size="sm"
                  slot="increment"
                  variant={variant}
                >
                  <IconPlus />
                </Button>
              </NumberStepper.Group>
            </NumberStepper>
          </div>
        );
      }),
    )}
  </div>
);
