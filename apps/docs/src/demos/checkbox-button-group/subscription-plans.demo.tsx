"use client";

// @demo-title Subscription Plans
import { CheckboxButtonGroup } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { Link } from "@thenamespace/uikit/link";
import { NumberValue } from "@thenamespace/uikit/number-value";

import { Icon } from "@/demos/icon";

const plans = [
  [
    "gold",
    "Gold",
    0.4,
    12,
    "Full suite of saving, investing, and learning tools for you and your family.",
  ],
  [
    "silver",
    "Silver",
    0.2,
    6,
    "Level up your saving and investing skills with even more tools.",
  ],
  [
    "bronze",
    "Bronze",
    0.1,
    3,
    "Investing tools to get you started on your financial journey.",
  ],
] as const;

export const DemoSubscriptionPlansExample = () => (
  <div className="flex w-[420px] flex-col items-center gap-6">
    <div className="flex flex-col items-center gap-1 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        Choose a subscription
      </h2>
      <p className="text-muted text-sm">
        Pick a plan. <Link href="#">Try a month on us!</Link>
      </p>
    </div>
    <CheckboxButtonGroup
      className="w-full"
      defaultValue={["silver"]}
      name="subscription-plan"
    >
      {plans.map(([value, title, daily, monthly, description]) => (
        <CheckboxButtonGroup.Item key={value} value={value}>
          {({ isSelected }) => (
            <>
              <CheckboxButtonGroup.Indicator>
                <Icon icon="solar:check-circle-bold" />
              </CheckboxButtonGroup.Indicator>
              <CheckboxButtonGroup.ItemContent>
                <Label className="text-lg font-bold">{title}</Label>
                <Description>{description}</Description>
                <p className="mt-3 text-sm">
                  <span className={isSelected ? "text-success" : ""}>
                    <NumberValue currency="USD" style="currency" value={daily}>
                      <NumberValue.Suffix>/day</NumberValue.Suffix>
                    </NumberValue>
                  </span>{" "}
                  <span className="text-muted">
                    (
                    <NumberValue
                      currency="USD"
                      maximumFractionDigits={0}
                      style="currency"
                      value={monthly}
                    />{" "}
                    billed monthly)
                  </span>
                </p>
              </CheckboxButtonGroup.ItemContent>
            </>
          )}
        </CheckboxButtonGroup.Item>
      ))}
    </CheckboxButtonGroup>
    <div className="flex w-full flex-col items-center gap-4">
      <p className="text-muted px-2 text-center text-xs">
        *APY is variable and subject to change at our discretion, without prior
        notice.
      </p>
      <Button fullWidth className="rounded-full" size="lg">
        Try a month on us
      </Button>
      <Link href="#">Compare plans</Link>
    </div>
  </div>
);
