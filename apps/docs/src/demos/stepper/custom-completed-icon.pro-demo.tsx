"use client";

// @demo-title Custom Completed Icon
import { Stepper } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

const basic = ["Cart", "Shipping", "Payment", "Confirmation"];

function CompletedIcon() {
  const { status } = Stepper.useStep();
  return status === "complete" ? <Icon icon="lucide:circle-check-big" /> : null;
}

export const ProCustomCompletedIconExample = () => (
  <div className="w-[600px]">
    <Stepper currentStep={2}>
      {basic.map((title) => (
        <Stepper.Step key={title}>
          <Stepper.Indicator>
            <Stepper.Icon>
              <CompletedIcon />
            </Stepper.Icon>
          </Stepper.Indicator>
          <Stepper.Content>
            <Stepper.Title>{title}</Stepper.Title>
          </Stepper.Content>
          <Stepper.Separator />
        </Stepper.Step>
      ))}
    </Stepper>
  </div>
);
