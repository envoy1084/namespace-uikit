"use client";

// @demo-title Controlled
import { useState } from "react";

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

function AddonContent({ addon }: { addon: (typeof addons)[number] }) {
  return (
    <CheckboxButtonGroup.ItemContent>
      <div className="flex flex-col gap-1">
        <Label>{addon.title}</Label>
        <Description>{addon.description}</Description>
      </div>
      <NumberValue
        className="mt-2 text-sm font-semibold"
        currency="USD"
        style="currency"
        value={addon.price}
      >
        <NumberValue.Suffix>
          <span className="text-muted text-xs font-normal">/mo</span>
        </NumberValue.Suffix>
      </NumberValue>
    </CheckboxButtonGroup.ItemContent>
  );
}

export const ProControlledExample = function Demo() {
  const [value, setValue] = useState(["backups"]);
  return (
    <div className="flex w-[360px] flex-col gap-4">
      <CheckboxButtonGroup
        name="addons-controlled"
        value={value}
        variant="secondary"
        onChange={setValue}
      >
        <Label>Add-ons</Label>
        <Description>Select the add-ons you need</Description>
        {addons.map((addon) => (
          <CheckboxButtonGroup.Item key={addon.value} value={addon.value}>
            <CheckboxButtonGroup.Indicator />
            <AddonContent addon={addon} />
          </CheckboxButtonGroup.Item>
        ))}
      </CheckboxButtonGroup>
      <p className="text-muted text-sm">
        Selected:{" "}
        <span className="text-foreground font-medium">
          {value.join(", ") || "None"}
        </span>
      </p>
    </div>
  );
};
