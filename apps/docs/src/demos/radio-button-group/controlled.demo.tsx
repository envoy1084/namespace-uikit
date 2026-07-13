"use client";

// @demo-title Controlled
import { useState } from "react";

import { RadioButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { NumberValue } from "@thenamespace/uikit/number-value";

const plans = [
  {
    description: "For individuals and small projects",
    price: 5,
    value: "starter",
  },
  {
    description: "For growing teams and businesses",
    price: 15,
    value: "pro",
  },
  {
    description: "For large organizations at scale",
    price: 45,
    value: "enterprise",
  },
];

function PlanContent({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <RadioButtonGroup.ItemContent>
      <Label className="capitalize">{plan.value}</Label>
      <Description>{plan.description}</Description>
      <NumberValue
        className="mt-2 text-sm font-semibold"
        currency="USD"
        maximumFractionDigits={0}
        style="currency"
        value={plan.price}
      >
        <NumberValue.Suffix>
          <span className="text-muted text-xs font-normal">/mo</span>
        </NumberValue.Suffix>
      </NumberValue>
    </RadioButtonGroup.ItemContent>
  );
}

export const DemoControlledExample = function Demo() {
  const [value, setValue] = useState("pro");
  return (
    <div className="flex w-[min(360px,calc(100vw-2rem))] flex-col gap-4">
      <RadioButtonGroup
        name="plan-controlled"
        value={value}
        variant="secondary"
        onChange={setValue}
      >
        <Label>Select a plan</Label>
        <Description>Choose the plan that suits your needs</Description>
        {plans.map((plan) => (
          <RadioButtonGroup.Item key={plan.value} value={plan.value}>
            <RadioButtonGroup.Indicator />
            <PlanContent plan={plan} />
          </RadioButtonGroup.Item>
        ))}
      </RadioButtonGroup>
      <p className="text-muted text-sm">
        Selected: <span className="text-foreground font-medium">{value}</span>
      </p>
    </div>
  );
};
