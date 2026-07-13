"use client";

// @demo-title With Chart Inline
import { KPI } from "@thenamespace/uikit";
import { TrendChip } from "@thenamespace/uikit/trend-chip";

import { Icon } from "@/demos/icon";

const up = [
  { value: 30 },
  { value: 35 },
  { value: 28 },
  { value: 42 },
  { value: 38 },
  { value: 45 },
  { value: 50 },
  { value: 48 },
  { value: 55 },
  { value: 60 },
  { value: 58 },
  { value: 65 },
];

const down = [
  { value: 65 },
  { value: 60 },
  { value: 62 },
  { value: 55 },
  { value: 58 },
  { value: 52 },
  { value: 50 },
  { value: 48 },
  { value: 45 },
  { value: 42 },
  { value: 44 },
  { value: 40 },
];

export const DemoWithChartInlineExample = () => (
  <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2">
    {[
      {
        title: "Total Clicks",
        value: 2441,
        trend: "up",
        change: "3.5%",
        suffix: "last 30d",
        data: up,
        color: "var(--color-accent)",
      },
      {
        title: "Bounce Rate",
        value: 0.423,
        trend: "down",
        change: "5.9%",
        suffix: "vs last 7d",
        data: down,
        color: "var(--color-danger)",
      },
    ].map((card) => (
      <KPI key={card.title}>
        <KPI.Header>
          <Icon className="text-muted size-4" icon="solar:target-linear" />
          <KPI.Title>{card.title}</KPI.Title>
        </KPI.Header>
        <KPI.Content className="grid-cols-[1fr_1fr] items-end">
          <div className="flex flex-col gap-1">
            <KPI.Value
              className="text-3xl"
              maximumFractionDigits={card.title === "Bounce Rate" ? 1 : 0}
              {...(card.title === "Bounce Rate"
                ? { style: "percent" as const }
                : {})}
              value={card.value}
            />
            <div className="flex items-center gap-1.5">
              <TrendChip trend={card.trend as "down" | "up"} variant="tertiary">
                {card.change}
                <TrendChip.Suffix>{card.suffix}</TrendChip.Suffix>
              </TrendChip>
            </div>
          </div>
          <KPI.Chart
            color={card.color}
            data={card.data}
            height={70}
            strokeWidth={1.5}
          />
        </KPI.Content>
      </KPI>
    ))}
  </div>
);
