"use client";

// @demo-title Delivery And Payment
import { RadioButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { NumberValue } from "@thenamespace/uikit/number-value";

import { Icon } from "@/demos/icon";

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

const payment = [
  ["visa", "**** 0123", "Exp. on 01/2026", "logos:visa"],
  ["mastercard", "**** 8304", "Exp. on 06/2028", "logos:mastercard"],
  ["paypal", "PayPal", "Pay with PayPal", "logos:paypal"],
] as const;

function PaymentGroup({ align = "center" }: { align?: "center" | "start" }) {
  return (
    <RadioButtonGroup
      className="w-full max-w-2xl grid-cols-1 sm:grid-cols-2"
      defaultValue="visa"
      layout="grid"
      name="payment"
      variant="secondary"
    >
      <Label className="col-span-full">Payment method</Label>
      {payment.map(([value, title, description, icon]) => (
        <RadioButtonGroup.Item key={value} value={value}>
          <RadioButtonGroup.ItemContent
            className={`flex-row gap-4 ${align === "start" ? "items-start" : "items-center"}`}
          >
            <RadioButtonGroup.ItemIcon>
              <Icon icon={icon} />
            </RadioButtonGroup.ItemIcon>
            <div className="flex flex-col gap-0.5">
              <Label>{title}</Label>
              <Description>{description}</Description>
            </div>
          </RadioButtonGroup.ItemContent>
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup>
  );
}

export const DemoDeliveryAndPaymentExample = () => (
  <div className="flex w-full max-w-lg flex-col items-center gap-10">
    <section className="flex w-full flex-col gap-4">
      <DeliveryGroup name="delivery-full" />
    </section>
    <section className="flex w-full flex-col gap-4">
      <PaymentGroup align="start" />
    </section>
  </div>
);
