"use client";

// @demo-title Auto Content
import { ChartTooltip } from "@thenamespace/uikit";

export const DemoAutoContentExample = () => (
  <div className="flex gap-4">
    <ChartTooltip.Content
      active
      label="February"
      payload={[
        { color: "var(--chart-3)", name: "Revenue", value: 18200 },
        { color: "var(--chart-1)", name: "Expenses", value: 9800 },
      ]}
    />
    <ChartTooltip.Content
      active
      indicator="line"
      label="Q1 2025"
      payload={[
        { color: "var(--chart-1)", name: "Organic", value: 22000 },
        { color: "var(--chart-2)", name: "Paid Ads", value: 14500 },
        { color: "var(--chart-3)", name: "Referral", value: 5200 },
      ]}
    />
  </div>
);
