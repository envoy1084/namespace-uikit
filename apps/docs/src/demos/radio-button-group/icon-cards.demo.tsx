"use client";

// @demo-title Icon Cards
import { RadioButtonGroup } from "@thenamespace/uikit";
import { Chip } from "@thenamespace/uikit/chip";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { NumberValue } from "@thenamespace/uikit/number-value";

import { Icon } from "@/demos/icon";

const workspacePlans = [
  [
    "starter",
    "Starter",
    12,
    "For freelancers and solo makers shipping fast.",
    "solar:rocket-outline",
  ],
  [
    "growth",
    "Growth",
    29,
    "For small teams scaling their product.",
    "solar:graph-up-outline",
  ],
  [
    "business",
    "Business",
    59,
    "For companies with advanced compliance needs.",
    "solar:buildings-outline",
  ],
  [
    "scale",
    "Scale",
    149,
    "Dedicated infra, SLA, and custom integrations.",
    "solar:server-outline",
  ],
  [
    "enterprise",
    "Enterprise",
    299,
    "White-glove onboarding, custom contracts.",
    "solar:crown-outline",
  ],
] as const;

export const DemoIconCardsExample = () => (
  <RadioButtonGroup
    className="w-[min(520px,calc(100vw-2rem))]"
    defaultValue="starter"
    name="icon-card"
  >
    <Label>Choose your workspace plan</Label>
    {workspacePlans.map(([value, title, price, description, icon], index) => (
      <RadioButtonGroup.Item className="bg-default" key={value} value={value}>
        <RadioButtonGroup.Indicator>
          <Icon icon="solar:check-circle-bold" />
        </RadioButtonGroup.Indicator>
        <RadioButtonGroup.ItemContent>
          <div className="flex items-center gap-3">
            <span className="bg-surface shadow-surface flex size-8 items-center justify-center rounded-lg">
              <Icon icon={icon} />
            </span>
            <div className="flex gap-2">
              <Label className="text-sm font-semibold">{title}</Label>
              {index === 0 ? (
                <Chip color="success" size="sm" variant="soft">
                  <Chip.Label>Most popular</Chip.Label>
                </Chip>
              ) : null}
            </div>
          </div>
          <NumberValue
            className="mt-2 text-2xl font-bold"
            currency="USD"
            maximumFractionDigits={0}
            style="currency"
            value={price}
          >
            <NumberValue.Suffix>
              <span className="text-muted text-sm font-normal"> per month</span>
            </NumberValue.Suffix>
          </NumberValue>
          <Description className="mt-1">{description}</Description>
        </RadioButtonGroup.ItemContent>
      </RadioButtonGroup.Item>
    ))}
  </RadioButtonGroup>
);
