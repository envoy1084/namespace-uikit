"use client";

// @demo-title Tabular Nums
import { NumberValue } from "@thenamespace/uikit";

export const DemoTabularNumsExample = () => (
  <div className="flex flex-col items-end gap-1 rounded-2xl p-6">
    {[228441, 71887, 156540, 1234, 98234].map((value) => (
      <NumberValue
        className="text-foreground text-xl font-semibold"
        currency="USD"
        key={value}
        style="currency"
        value={value}
      />
    ))}
  </div>
);
