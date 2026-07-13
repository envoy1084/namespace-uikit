"use client";

// @demo-title Donut
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

const traffic = [
  { name: "Organic", value: 4500 },
  { name: "Direct", value: 3200 },
  { name: "Referral", value: 2100 },
  { name: "Social", value: 1400 },
];

export const DemoDonutExample = () => (
  <Card className="w-[360px] rounded-2xl">
    <Card.Header>
      <Card.Title className="text-base">Traffic Sources</Card.Title>
    </Card.Header>
    <Card.Content className="flex flex-col items-center gap-4">
      <PieChart height={220}>
        <PieChart.Pie
          cornerRadius={12}
          cx="50%"
          cy="50%"
          data={traffic}
          dataKey="value"
          innerRadius="68%"
          nameKey="name"
          paddingAngle={-20}
          strokeWidth={0}
        >
          <Cells data={traffic} />
        </PieChart.Pie>
        <PieChart.Tooltip
          content={
            <PieTooltip
              valueFormatter={(value) => Number(value).toLocaleString()}
            />
          }
        />
      </PieChart>
      <Legend data={traffic} suffix="" />
    </Card.Content>
  </Card>
);
