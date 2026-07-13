"use client";

// @demo-title Render Prop Children
import { CheckboxButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { NumberValue } from "@thenamespace/uikit/number-value";

const addons = [
  {
    description: "Automated daily backups",
    price: 5,
    title: "Backups",
    value: "backups",
  },
  {
    description: "24/7 monitoring and alerts",
    price: 12,
    title: "Monitoring",
    value: "monitoring",
  },
  {
    description: "Priority email and chat support",
    price: 8,
    title: "Support",
    value: "support",
  },
];

export const DemoRenderPropChildrenExample = () => (
  <CheckboxButtonGroup
    className="w-[360px]"
    defaultValue={["backups"]}
    name="features-render"
    variant="secondary"
  >
    <Label>Select features</Label>
    {addons.map((addon) => (
      <CheckboxButtonGroup.Item key={addon.value} value={addon.value}>
        {({ isSelected }) => (
          <>
            <CheckboxButtonGroup.Indicator />
            <CheckboxButtonGroup.ItemContent>
              <Label>{addon.title}</Label>
              <Description>{addon.description}</Description>
              <NumberValue
                className={`mt-2 text-sm font-semibold ${isSelected ? "text-accent" : ""}`}
                currency="USD"
                maximumFractionDigits={0}
                style="currency"
                value={addon.price}
              >
                <NumberValue.Suffix>
                  <span className="text-muted text-xs font-normal">/mo</span>
                </NumberValue.Suffix>
              </NumberValue>
            </CheckboxButtonGroup.ItemContent>
          </>
        )}
      </CheckboxButtonGroup.Item>
    ))}
  </CheckboxButtonGroup>
);
