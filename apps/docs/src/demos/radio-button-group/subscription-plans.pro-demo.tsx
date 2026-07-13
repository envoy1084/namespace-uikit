"use client";

// @demo-title Subscription Plans
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { RadioButtonGroup } from "@thenamespace/uikit";
import { Chip } from "@thenamespace/uikit/chip";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { PressableFeedback } from "@thenamespace/uikit/pressable-feedback";

export const ProSubscriptionPlansExample = () => (
  <RadioButtonGroup
    className="w-[min(400px,calc(100vw-2rem))]"
    defaultValue="annual"
    name="subscription"
  >
    {[
      ["annual", "Annual", "Billed at USD 99.99/year (US$ 8.33/month)"],
      [
        "annual-toolkit",
        "Annual + Toolkit",
        "Billed at USD 149.99/year (US$ 12.50/month)",
      ],
    ].map(([value, title, billing], index) => (
      <RadioButtonGroup.Item
        key={value}
        className="data-[selected=true]:bg-foreground border-none ring-transparent transition-colors duration-150"
        value={value}
      >
        {({ isSelected }) => (
          <>
            <PressableFeedback.Ripple />
            <RadioButtonGroup.Indicator className="top-1/2 -translate-y-1/2">
              <HugeiconsIcon
                aria-hidden
                className="text-[#e95f2a]"
                icon={CheckmarkCircle02Icon}
                size={24}
                strokeWidth={2}
              />
            </RadioButtonGroup.Indicator>
            <RadioButtonGroup.ItemContent>
              {index ? (
                <Chip
                  className="absolute -top-1.5 -left-1 w-fit bg-[#e95f2a] text-black"
                  size="sm"
                >
                  <Chip.Label>Save up to 50%</Chip.Label>
                </Chip>
              ) : null}
              <Label
                className={`text-xl font-bold ${isSelected ? "text-background" : ""}`}
              >
                {title}
              </Label>
              <Description
                className={`mt-1 ${isSelected ? "text-background/70" : ""}`}
              >
                {billing}
              </Description>
            </RadioButtonGroup.ItemContent>
          </>
        )}
      </RadioButtonGroup.Item>
    ))}
  </RadioButtonGroup>
);
