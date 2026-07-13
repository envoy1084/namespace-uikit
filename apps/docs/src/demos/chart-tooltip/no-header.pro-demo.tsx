"use client";

// @demo-title No Header
import { ChartTooltip } from "@thenamespace/uikit";

export const ProNoHeaderExample = () => (
  <ChartTooltip>
    <ChartTooltip.Item>
      <ChartTooltip.Indicator color="var(--chart-3)" />
      <ChartTooltip.Label>Sales</ChartTooltip.Label>
      <ChartTooltip.Value>458</ChartTooltip.Value>
    </ChartTooltip.Item>
  </ChartTooltip>
);
