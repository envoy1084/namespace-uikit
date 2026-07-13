"use client";

// @demo-title Dynamic Icon
import { useState } from "react";

import { Stepper } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

const basic = ["Cart", "Shipping", "Payment", "Confirmation"];

const icons = ["lucide:user", "lucide:bell", "lucide:lock", "lucide:thumbs-up"];

function DynamicIconDemo() {
  const [step, setStep] = useState(1);
  return (
    <div className="w-[600px]">
      <Stepper currentStep={step} onStepChange={setStep}>
        {basic.map((title, index) => (
          <Stepper.Step key={title}>
            <Stepper.Indicator>
              <Stepper.Icon>
                <Icon icon={index < step ? "lucide:check" : icons[index]!} />
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
}

export const ProDynamicIconExample = () => <DynamicIconDemo />;
