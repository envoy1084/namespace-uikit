"use client";

// @demo-title Bullet Steps
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

function BulletDemo() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex flex-col gap-8">
      <div className="w-[500px]">
        <Stepper currentStep={step} onStepChange={setStep}>
          {basic.map((title) => (
            <Stepper.Step key={title}>
              <Stepper.Indicator className="size-3 border-0">
                <Stepper.Icon>
                  <Icon icon="lucide:circle" />
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
      <div className="w-[280px]">
        <Stepper
          currentStep={step}
          onStepChange={setStep}
          orientation="vertical"
        >
          {steps({ descriptions: true })}
        </Stepper>
      </div>
    </div>
  );
}

export const ProBulletStepsExample = () => <BulletDemo />;
