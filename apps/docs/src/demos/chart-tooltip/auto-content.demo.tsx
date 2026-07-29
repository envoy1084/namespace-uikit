"use client";

// @demo-title Auto Content
import { ChartTooltip } from "@thenamespace/uikit";

export const DemoAutoContentExample = () => (
  <div className="flex gap-6">
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
        { name: "Organic", stroke: "var(--chart-3)", value: 22000 },
        { name: "Paid Ads", stroke: "var(--chart-2)", value: 14500 },
        { name: "Referral", stroke: "var(--chart-1)", value: 5200 },
      ]}
    />
  </div>
);
