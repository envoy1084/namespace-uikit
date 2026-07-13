"use client";

// @demo-title Custom Indicator
import { CheckboxButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { NumberValue } from "@thenamespace/uikit/number-value";

import { Icon } from "@/demos/icon";

export const DemoCustomIndicatorExample = () => (
  <CheckboxButtonGroup
    className="w-full max-w-3xl grid-cols-3"
    defaultValue={["product-updates", "security-alerts"]}
    layout="grid"
    name="notifications"
    variant="secondary"
  >
    <Label className="col-span-full">Notification preferences</Label>
    {[
      ["product-updates", "Weekly product updates and tips", 4200],
      ["security-alerts", "Security alerts and maintenance notices", 8100],
      ["marketing", "Promotions, deals, and special offers", 2300],
    ].map(([value, description, subscribers]) => (
      <CheckboxButtonGroup.Item key={value} value={value as string}>
        <CheckboxButtonGroup.Indicator>
          <Icon icon="solar:check-circle-bold" />
        </CheckboxButtonGroup.Indicator>
        <CheckboxButtonGroup.ItemContent>
          <Label className="capitalize">
            {(value as string).replace(/-/g, " ")}
          </Label>
          <Description>{description}</Description>
          <NumberValue
            className="mt-3 text-sm font-semibold"
            maximumFractionDigits={0}
            value={subscribers as number}
          >
            <NumberValue.Suffix>
              <span className="text-muted text-xs font-normal">
                {" "}
                subscribers
              </span>
            </NumberValue.Suffix>
          </NumberValue>
        </CheckboxButtonGroup.ItemContent>
      </CheckboxButtonGroup.Item>
    ))}
  </CheckboxButtonGroup>
);
