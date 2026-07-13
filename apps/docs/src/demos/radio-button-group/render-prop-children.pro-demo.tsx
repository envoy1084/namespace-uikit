"use client";

// @demo-title Render Prop Children
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

export const ProRenderPropChildrenExample = () => (
  <RadioButtonGroup
    className="w-[min(360px,calc(100vw-2rem))]"
    defaultValue="pro"
    name="plan-render"
    variant="secondary"
  >
    <Label>Select a plan</Label>
    {plans.map((plan) => (
      <RadioButtonGroup.Item key={plan.value} value={plan.value}>
        {({ isSelected }) => (
          <>
            <RadioButtonGroup.Indicator />
            <RadioButtonGroup.ItemContent>
              <Label className="capitalize">{plan.value}</Label>
              <Description>{plan.description}</Description>
              <NumberValue
                className={`mt-2 text-sm font-semibold ${isSelected ? "text-accent" : ""}`}
                currency="USD"
                maximumFractionDigits={0}
                style="currency"
                value={plan.price}
              />
            </RadioButtonGroup.ItemContent>
          </>
        )}
      </RadioButtonGroup.Item>
    ))}
  </RadioButtonGroup>
);
