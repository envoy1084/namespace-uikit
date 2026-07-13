"use client";

// @demo-title With Legend
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

const storage = [
  { fill: "var(--chart-4)", name: "Documents", value: 42 },
  { fill: "var(--chart-3)", name: "Media", value: 28 },
  { fill: "var(--chart-2)", name: "System", value: 18 },
];

export const DemoWithLegendExample = () => (
  <Card className="w-[400px] rounded-2xl">
    <Card.Header>
      <Card.Title className="text-base">Storage Breakdown</Card.Title>
      <Card.Description className="text-muted text-xs">
        88 GB of 128 GB used
      </Card.Description>
    </Card.Header>
    <Card.Content className="flex items-center gap-6">
      <div className="relative shrink-0">
        <RadialChart
          data={storage}
          height={180}
          innerRadius="40%"
          outerRadius="100%"
          width={180}
        >
          <RadialChart.Bar background cornerRadius={12} dataKey="value" />
          <RadialChart.Tooltip
            content={
              <RadialTooltip valueFormatter={(value) => `${value} GB`} />
            }
          />
        </RadialChart>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-foreground text-xl font-bold">88</span>
          <span className="text-muted text-xs">GB used</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {storage.map((item) => (
          <div className="flex items-center gap-3" key={item.name}>
            <span
              className="size-3 shrink-0 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <div className="flex flex-1 items-center justify-between">
              <span className="text-foreground text-sm">{item.name}</span>
              <span className="text-foreground text-sm font-semibold">
                {item.value} GB
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card.Content>
  </Card>
);
