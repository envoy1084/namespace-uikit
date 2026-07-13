"use client";

// @demo-title Gauge Grid
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

const gauges = [
  {
    color: "var(--chart-4)",
    label: "Conversion",
    max: 1000,
    value: 750,
  },
  {
    color: "var(--chart-3)",
    label: "Engagement",
    max: 4200,
    value: 3150,
  },
  { color: "var(--chart-2)", label: "Bounce Rate", max: 100, value: 35 },
  {
    color: "var(--color-danger)",
    label: "Errors",
    max: 500,
    value: 450,
  },
];

export const DemoGaugeGridExample = () => (
  <div className="grid w-[640px] grid-cols-2 gap-3 lg:grid-cols-4">
    {gauges.map((gauge) => {
      const data = [
        { fill: gauge.color, name: gauge.label, value: gauge.value },
      ];
      const percent = ((gauge.value / gauge.max) * 100).toFixed(0);
      return (
        <Card className="rounded-2xl" key={gauge.label}>
          <Card.Header className="pb-0">
            <Card.Title className="text-muted text-xs font-medium">
              {gauge.label}
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex flex-col items-center">
            <div className="relative">
              <RadialChart
                barSize={8}
                data={data}
                endAngle={-45}
                height={120}
                innerRadius="70%"
                outerRadius="90%"
                startAngle={225}
                width={120}
              >
                <RadialChart.AngleAxis
                  angleAxisId={0}
                  domain={[0, gauge.max]}
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
                <span className="text-foreground text-lg font-bold">
                  {percent}%
                </span>
              </div>
            </div>
          </Card.Content>
        </Card>
      );
    })}
  </div>
);
