"use client";

// @demo-title Line Indicator
import { ChartTooltip } from "@thenamespace/uikit";

export const ProLineIndicatorExample = () => (
  <ChartTooltip indicator="line">
    <ChartTooltip.Header>March 2025</ChartTooltip.Header>
    {[
      ["Organic", "15,200", "var(--chart-1)"],
      ["Paid Ads", "8,400", "var(--chart-2)"],
      ["Referral", "3,100", "var(--chart-3)"],
    ].map(([label, value, color]) => (
      <ChartTooltip.Item key={label}>
        <ChartTooltip.Indicator color={color} />
        <ChartTooltip.Label>{label}</ChartTooltip.Label>
        <ChartTooltip.Value>{value}</ChartTooltip.Value>
      </ChartTooltip.Item>
    ))}
  </ChartTooltip>
);
