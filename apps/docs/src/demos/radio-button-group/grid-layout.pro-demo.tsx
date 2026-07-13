"use client";

// @demo-title Grid Layout
import { RadioButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { NumberValue } from "@thenamespace/uikit/number-value";

const delivery = [
  {
    description: "4-10 business days",
    price: 5,
    title: "Standard",
    value: "standard",
  },
  {
    description: "2-5 business days",
    price: 16,
    title: "Express",
    value: "express",
  },
  {
    description: "1 business day",
    price: 25,
    title: "Super Fast",
    value: "super-fast",
  },
];

function DeliveryGroup({ name = "delivery" }: { name?: string }) {
  return (
    <RadioButtonGroup
      className="w-full max-w-2xl grid-cols-1 sm:grid-cols-3"
      defaultValue="express"
      layout="grid"
      name={name}
      variant="secondary"
    >
      <Label className="col-span-full">Delivery method</Label>
      {delivery.map((item) => (
        <RadioButtonGroup.Item key={item.value} value={item.value}>
          <RadioButtonGroup.Indicator />
          <RadioButtonGroup.ItemContent>
            <div className="flex flex-col gap-1">
              <Label>{item.title}</Label>
              <Description>{item.description}</Description>
            </div>
            <NumberValue
              className="mt-2 text-sm font-semibold"
              currency="USD"
              style="currency"
              value={item.price}
            />
          </RadioButtonGroup.ItemContent>
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup>
  );
}

export const ProGridLayoutExample = () => <DeliveryGroup />;
