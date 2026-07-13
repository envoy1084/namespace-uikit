"use client";

// @demo-title Default
import type { ReactNode } from "react";

import { RadialChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
import { ChartTooltip } from "@thenamespace/uikit/chart-tooltip";

interface RadialTooltipProps {
  payload?: Array<{
    fill?: string;
    name?: string;
    payload?: { fill?: string; name?: string; value?: number | string };
    value?: number | string;
  }>;
  valueFormatter?: (value: number | string) => ReactNode;
}

function RadialTooltip({ payload, valueFormatter }: RadialTooltipProps) {
  const item = payload?.[0];
  if (!item?.payload) return null;
  const name = item.payload.name ?? item.name;
  const value = item.payload.value ?? item.value;
  const fill = item.payload.fill;
  return (
    <ChartTooltip>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color={fill} />
        <ChartTooltip.Label>{name}</ChartTooltip.Label>
        <ChartTooltip.Value>
          {valueFormatter && value != null ? valueFormatter(value) : value}
        </ChartTooltip.Value>
      </ChartTooltip.Item>
    </ChartTooltip>
  );
}

const activity = [
  {
    fill: "var(--chart-4)",
    name: "Calories",
    value: 200,
    valueText: "1,623/2,000 kcal",
  },
  {
    fill: "var(--chart-3)",
    name: "Steps",
    value: 350,
    valueText: "8,328/10,000 steps",
  },
  {
    fill: "var(--chart-2)",
    name: "Exercise",
    value: 250,
    valueText: "25/120 min",
  },
];

export const ProDefaultExample = () => (
  <Card className="w-[380px] rounded-2xl">
    <Card.Header>
      <Card.Title className="text-base">Energy Activity</Card.Title>
    </Card.Header>
    <Card.Content className="flex items-center gap-4">
      <div className="flex flex-1 flex-col gap-2 self-start">
        {activity.map((item) => (
          <div className="flex flex-col" key={item.name}>
            <span className="text-muted text-xs">{item.name}</span>
            <span className="text-foreground text-sm font-semibold">
              {item.valueText}
            </span>
          </div>
        ))}
      </div>
      <div className="relative shrink-0">
        <RadialChart
          data={activity}
          height={200}
          innerRadius="40%"
          outerRadius="100%"
          width={200}
        >
          <RadialChart.Bar background cornerRadius={12} dataKey="value" />
          <RadialChart.Tooltip content={<RadialTooltip />} />
        </RadialChart>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-muted text-[10px]">Calories</span>
          <span className="text-foreground text-sm font-semibold">
            700 kcal
          </span>
        </div>
      </div>
    </Card.Content>
  </Card>
);
