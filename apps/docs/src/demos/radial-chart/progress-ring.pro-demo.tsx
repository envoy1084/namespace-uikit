"use client";

// @demo-title Progress Ring
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

export const ProProgressRingExample = () => {
  const value = 7452;
  const max = 10000;
  const percent = ((value / max) * 100).toFixed(0);
  const data = [{ fill: "var(--chart-3)", name: "Steps", value }];
  return (
    <Card className="w-[300px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Daily Steps</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-3">
        <div className="relative">
          <RadialChart
            barSize={12}
            data={data}
            height={200}
            innerRadius="86%"
            outerRadius="100%"
            width={200}
          >
            <RadialChart.AngleAxis
              angleAxisId={0}
              domain={[0, max]}
              tick={false}
              type="number"
            />
            <RadialChart.Bar
              background
              angleAxisId={0}
              cornerRadius={12}
              dataKey="value"
            />
            <RadialChart.Tooltip
              content={
                <RadialTooltip
                  valueFormatter={(item) => Number(item).toLocaleString()}
                />
              }
            />
          </RadialChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground text-3xl font-bold">
              {percent}%
            </span>
            <span className="text-muted text-xs">
              {value.toLocaleString()} / {max.toLocaleString()}
            </span>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};
