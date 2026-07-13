"use client";

// @demo-title Currency
import { NumberValue } from "@thenamespace/uikit";

export const DemoCurrencyExample = () => (
  <div className="flex flex-col gap-3 rounded-2xl p-6">
    {[
      { currency: "USD", maximumFractionDigits: undefined },
      { currency: "EUR", maximumFractionDigits: undefined },
      { currency: "JPY", maximumFractionDigits: 0 },
      { currency: "GBP", maximumFractionDigits: undefined },
    ].map((item) => (
      <div className="flex items-baseline gap-4" key={item.currency}>
        <span className="text-muted w-12 text-xs">{item.currency}</span>
        <NumberValue
          className="text-foreground text-2xl font-semibold"
          currency={item.currency}
          maximumFractionDigits={item.maximumFractionDigits}
          style="currency"
          value={228441}
        />
      </div>
    ))}
  </div>
);
