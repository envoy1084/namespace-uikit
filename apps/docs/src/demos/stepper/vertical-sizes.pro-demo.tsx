"use client";

// @demo-title Vertical Sizes
import { useState } from "react";

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

function Demo({
  descriptions = false,
  orientation = "horizontal",
  size = "md",
  withIcons = false,
}: {
  descriptions?: boolean;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  withIcons?: boolean;
}) {
  const [step, setStep] = useState(1);
  return (
    <div className={orientation === "horizontal" ? "w-[600px]" : "w-[280px]"}>
      <Stepper
        currentStep={step}
        onStepChange={setStep}
        orientation={orientation}
        size={size}
      >
        {steps({ descriptions, withIcons })}
      </Stepper>
    </div>
  );
}

export const ProVerticalSizesExample = () => (
  <div className="flex gap-12">
    {(["sm", "md", "lg"] as const).map((size) => (
      <Demo key={size} orientation="vertical" size={size} />
    ))}
  </div>
);
