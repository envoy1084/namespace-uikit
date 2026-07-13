"use client";

// @demo-title Donut With Content
import { PieChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
import { ChartTooltip } from "@thenamespace/uikit/chart-tooltip";

const colors = [
  "var(--chart-4)",
  "var(--chart-3)",
  "var(--chart-2)",
  "var(--chart-1)",
];

interface PieTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    payload?: { fill?: string };
    value?: number | string;
  }>;
  valueFormatter?: (value: number | string) => React.ReactNode;
}

function PieTooltip({ active, payload, valueFormatter }: PieTooltipProps) {
  const item = payload?.[0];
  if (!active || !item) return null;
  return (
    <ChartTooltip>
      <ChartTooltip.Item>
        <ChartTooltip.Indicator color={item.payload?.fill} />
        <ChartTooltip.Label>{item.name}</ChartTooltip.Label>
        <ChartTooltip.Value>
          {valueFormatter ? valueFormatter(item.value ?? "") : item.value}
        </ChartTooltip.Value>
      </ChartTooltip.Item>
    </ChartTooltip>
  );
}

function Cells({ data }: { data: ReadonlyArray<unknown> }) {
  return (
    <>
      {data.map((_, index) => (
        <PieChart.Cell fill={colors[index % colors.length]} key={index} />
      ))}
    </>
  );
}

const devices = [
  { name: "Mobile", value: 2800 },
  { name: "Desktop", value: 1200 },
  { name: "Tablet", value: 500 },
];

export const ProDonutWithContentExample = () => {
  const total = devices.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card className="w-[360px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Connected Devices</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-4">
        <div className="relative">
          <PieChart height={240} width={240}>
            <PieChart.Pie
              cornerRadius={12}
              cx="50%"
              cy="50%"
              data={devices}
              dataKey="value"
              innerRadius="68%"
              nameKey="name"
              paddingAngle={-20}
              strokeWidth={0}
            >
              <Cells data={devices} />
            </PieChart.Pie>
            <PieChart.Tooltip content={<PieTooltip />} />
          </PieChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground text-3xl font-bold">
              {(total / 1000).toFixed(1)}K
            </span>
            <span className="text-muted text-sm">Devices</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {devices.map((item, index) => (
            <div className="flex items-center gap-3" key={item.name}>
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-foreground w-16 text-sm">{item.name}</span>
              <span className="text-foreground text-sm font-semibold">
                {item.value.toLocaleString()}
              </span>
              <span className="text-muted text-xs">
                ({((item.value / total) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};
