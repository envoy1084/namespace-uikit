"use client";

// @demo-title No Indicator
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

function PlanGroup({
  defaultValue = "pro",
  indicator = true,
}: {
  defaultValue?: string;
  indicator?: boolean;
}) {
  return (
    <RadioButtonGroup
      className="w-[min(360px,calc(100vw-2rem))]"
      defaultValue={defaultValue}
      name="plan"
      variant="secondary"
    >
      <Label>Select a plan</Label>
      <Description>Choose the plan that suits your needs</Description>
      {plans.map((plan) => (
        <RadioButtonGroup.Item key={plan.value} value={plan.value}>
          {indicator ? <RadioButtonGroup.Indicator /> : null}
          <PlanContent plan={plan} />
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup>
  );
}

export const DemoNoIndicatorExample = () => <PlanGroup indicator={false} />;
