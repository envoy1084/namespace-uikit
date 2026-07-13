"use client";

// @demo-title Controlled
import { useState } from "react";

import { Button } from "@thenamespace/uikit";
import { Stepper } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

const basic = ["Cart", "Shipping", "Payment", "Confirmation"];

const detailed = [
  ["Account", "Create your account"],
  ["Profile", "Set up your profile"],
  ["Settings", "Configure preferences"],
  ["Review", "Review and confirm"],
] as const;

const icons = ["lucide:user", "lucide:bell", "lucide:lock", "lucide:thumbs-up"];

function steps({
  descriptions = false,
  withIcons = false,
}: {
  descriptions?: boolean;
  withIcons?: boolean;
}) {
  const data = descriptions
    ? detailed
    : basic.map((title) => [title, ""] as const);
  return data.map(([title, description], index) => (
    <Stepper.Step key={title}>
      <Stepper.Indicator>
        {withIcons ? (
          <Stepper.Icon>
            <Icon icon={icons[index]!} />
          </Stepper.Icon>
        ) : null}
      </Stepper.Indicator>
      <Stepper.Content>
        <Stepper.Title>{title}</Stepper.Title>
        {description ? (
          <Stepper.Description>{description}</Stepper.Description>
        ) : null}
      </Stepper.Content>
      <Stepper.Separator />
    </Stepper.Step>
  ));
}

function ControlledDemo({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) {
  const [step, setStep] = useState(1);
  return (
    <div className="flex flex-col gap-6">
      <div className={orientation === "horizontal" ? "w-[600px]" : "w-[280px]"}>
        <Stepper
          currentStep={step}
          onStepChange={setStep}
          orientation={orientation}
        >
          {steps({ descriptions: orientation === "vertical" })}
        </Stepper>
      </div>
      <div className="flex gap-2">
        <Button
          isDisabled={step === 0}
          onPress={() => setStep((value) => value - 1)}
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          isDisabled={step === basic.length - 1}
          onPress={() => setStep((value) => value + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export const ProControlledExample = () => <ControlledDemo />;
