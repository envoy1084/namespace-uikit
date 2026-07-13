"use client";

// @demo-title With Icons
import { RadioButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";

import { Icon } from "@/demos/pro-icon";

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

export const ProWithIconsExample = () => <PaymentGroup />;
