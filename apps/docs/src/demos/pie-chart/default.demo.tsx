"use client";

// @demo-title Default
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

function Legend({
  data,
  suffix,
}: {
  data: ReadonlyArray<{ name: string; value: number }>;
  suffix?: string;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
      {data.map((item, index) => (
        <div className="flex items-center gap-1.5" key={item.name}>
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: colors[index % colors.length] }}
          />
          <span className="text-muted text-xs">
            {item.name}
            {suffix !== undefined
              ? ` (${item.value.toLocaleString()}${suffix})`
              : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

const browsers = [
  { name: "Chrome", value: 62 },
  { name: "Safari", value: 19 },
  { name: "Firefox", value: 10 },
  { name: "Edge", value: 9 },
];

export const DemoDefaultExample = () => (
  <Card className="w-[360px] rounded-2xl">
    <Card.Header>
      <Card.Title className="text-base">Browser Usage</Card.Title>
    </Card.Header>
    <Card.Content className="flex flex-col items-center gap-4">
      <PieChart height={220}>
        <PieChart.Pie
          cx="50%"
          cy="50%"
          data={browsers}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
        >
          <Cells data={browsers} />
        </PieChart.Pie>
        <PieChart.Tooltip content={<PieTooltip />} />
      </PieChart>
      <Legend data={browsers} />
    </Card.Content>
  </Card>
);
