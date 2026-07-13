"use client";

// @demo-title Custom Formatters
import { ChartTooltip } from "@thenamespace/uikit";

export const DemoCustomFormattersExample = () => (
  <ChartTooltip.Content
    active
    label="2025-01-15"
    labelFormatter={() => "January 15, 2025"}
    payload={[
      { color: "var(--chart-3)", name: "Portfolio", value: 24801.32 },
      { color: "var(--chart-1)", name: "Benchmark", value: 21500 },
    ]}
    valueFormatter={(value) =>
      new Intl.NumberFormat("en-US", {
        currency: "USD",
        maximumFractionDigits: 2,
        style: "currency",
      }).format(Number(value))
    }
  />
);
