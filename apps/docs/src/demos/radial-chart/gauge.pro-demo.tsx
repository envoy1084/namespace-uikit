"use client";

// @demo-title Gauge
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

export const ProGaugeExample = () => {
  const data = [{ fill: "var(--chart-3)", name: "Active Users", value: 780 }];
  return (
    <Card className="w-[280px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Activity</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center">
        <div className="relative">
          <RadialChart
            barSize={10}
            data={data}
            endAngle={-45}
            height={200}
            innerRadius="70%"
            outerRadius="90%"
            startAngle={225}
            width={200}
          >
            <RadialChart.AngleAxis
              angleAxisId={0}
              domain={[0, 1358]}
              tick={false}
              type="number"
            />
            <RadialChart.Bar
              background
              angleAxisId={0}
              cornerRadius={12}
              dataKey="value"
            />
            <RadialChart.Tooltip content={<RadialTooltip />} />
          </RadialChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-muted text-xs">Active Users</span>
            <span className="text-foreground text-xl font-bold">
              {(1358).toLocaleString()}
            </span>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};
