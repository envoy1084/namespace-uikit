"use client";

// @demo-title Custom Color Vertical
import { Stepper } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

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

export const DemoCustomColorVerticalExample = () => (
  <div className="w-[280px]">
    <Stepper
      className="[--stepper-active-color:#8b5cf6] [--stepper-complete-color:#8b5cf6] [--stepper-complete-fg:white]"
      currentStep={2}
      orientation="vertical"
    >
      {steps({ descriptions: true, withIcons: true })}
    </Stepper>
  </div>
);
