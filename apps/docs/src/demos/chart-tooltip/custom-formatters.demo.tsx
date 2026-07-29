"use client";

// @demo-title Custom Formatters
import { ChartTooltip } from "@thenamespace/uikit";

export const DemoCustomFormattersExample = () => (
  <ChartTooltip.Content
    active
    label="2025-01-15"
    labelFormatter={(label) =>
      new Date(String(label)).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    }
    payload={[
      { name: "Portfolio", stroke: "var(--chart-3)", value: 24801.32 },
      { name: "Benchmark", stroke: "var(--chart-2)", value: 21500 },
    ]}
    valueFormatter={(value) => `$${Number(value).toLocaleString()}`}
  />
);
