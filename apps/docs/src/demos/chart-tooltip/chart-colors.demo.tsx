"use client";

// @demo-title Chart Colors
import { ChartTooltip } from "@thenamespace/uikit";

const chartColors = [
  ["chart-1", "Lightest"],
  ["chart-2", "Light"],
  ["chart-3", "Accent"],
  ["chart-4", "Darkest"],
] as const;

function ColorTooltip({ indicator = "dot" }: { indicator?: "dot" | "line" }) {
  return (
    <ChartTooltip indicator={indicator}>
      <ChartTooltip.Header>
        {indicator === "line" ? "Line Indicators" : "All Chart Colors"}
      </ChartTooltip.Header>
      {chartColors.map(([token, label]) => (
        <ChartTooltip.Item key={token}>
          <ChartTooltip.Indicator color={`var(--${token})`} />
          <ChartTooltip.Label>{token}</ChartTooltip.Label>
          <ChartTooltip.Value>{label}</ChartTooltip.Value>
        </ChartTooltip.Item>
      ))}
    </ChartTooltip>
  );
}

export const DemoChartColorsExample = () => (
  <div className="flex gap-4">
    <ColorTooltip />
    <ColorTooltip indicator="line" />
  </div>
);
