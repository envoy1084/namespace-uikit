"use client";

// @demo-title Custom Indicator
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { RadioButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { NumberValue } from "@thenamespace/uikit/number-value";

export const DemoCustomIndicatorExample = () => (
  <RadioButtonGroup
    className="w-full max-w-2xl grid-cols-1 sm:grid-cols-3"
    defaultValue="newsletter"
    layout="grid"
    name="mailing-list"
    variant="secondary"
  >
    <Label className="col-span-full">Select a mailing list</Label>
    {[
      ["newsletter", "Last message sent an hour ago", 621],
      ["existing-customers", "Last message sent 2 weeks ago", 1200],
      ["trial-users", "Last message sent 4 days ago", 2740],
    ].map(([value, description, users]) => (
      <RadioButtonGroup.Item key={value} value={value as string}>
        <RadioButtonGroup.Indicator>
          <HugeiconsIcon
            aria-hidden
            icon={CheckmarkCircle02Icon}
            size={20}
            strokeWidth={2}
          />
        </RadioButtonGroup.Indicator>
        <RadioButtonGroup.ItemContent>
          <Label className="capitalize">
            {(value as string).replace(/-/g, " ")}
          </Label>
          <Description>{description}</Description>
          <NumberValue
            className="mt-3 text-sm font-semibold"
            maximumFractionDigits={0}
            value={users as number}
          >
            <NumberValue.Suffix>
              <span className="text-muted text-xs font-normal"> users</span>
            </NumberValue.Suffix>
          </NumberValue>
        </RadioButtonGroup.ItemContent>
      </RadioButtonGroup.Item>
    ))}
  </RadioButtonGroup>
);
