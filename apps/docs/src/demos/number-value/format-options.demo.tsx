"use client";

// @demo-title Format Options
import { NumberValue } from "@thenamespace/uikit";

export const DemoFormatOptionsExample = () => (
  <div className="flex flex-col gap-3 rounded-2xl p-6">
    <div className="flex items-baseline gap-4">
      <span className="text-muted w-32 text-xs">Compact currency</span>
      <NumberValue
        className="text-foreground text-2xl font-semibold"
        formatOptions={{
          currency: "USD",
          maximumFractionDigits: 1,
          notation: "compact",
          style: "currency",
        }}
        value={1234567}
      />
    </div>
    <div className="flex items-baseline gap-4">
      <span className="text-muted w-32 text-xs">Accounting</span>
      <NumberValue
        className="text-foreground text-2xl font-semibold"
        formatOptions={{
          currency: "USD",
          currencySign: "accounting",
          style: "currency",
        }}
        value={-1234.56}
      />
    </div>
  </div>
);
