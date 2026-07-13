"use client";

// @demo-title Nested Donut
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

const lastYear = [
  { name: "Q1", value: 3200 },
  { name: "Q2", value: 4100 },
  { name: "Q3", value: 3800 },
  { name: "Q4", value: 5200 },
];

const thisYear = [
  { name: "Q1", value: 4800 },
  { name: "Q2", value: 5600 },
  { name: "Q3", value: 5100 },
  { name: "Q4", value: 6800 },
];

export const ProNestedDonutExample = () => (
  <Card className="w-[400px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Revenue: This Year vs Last</Card.Title>
    </Card.Header>
    <Card.Content className="flex flex-col items-center gap-4">
      <PieChart height={240}>
        <PieChart.Pie
          cornerRadius={12}
          cx="50%"
          cy="50%"
          data={lastYear}
          dataKey="value"
          innerRadius="34%"
          nameKey="name"
          outerRadius="46%"
          paddingAngle={-20}
          strokeWidth={0}
        >
          <Cells data={lastYear} />
        </PieChart.Pie>
        <PieChart.Pie
          cornerRadius={12}
          cx="50%"
          cy="50%"
          data={thisYear}
          dataKey="value"
          innerRadius="56%"
          nameKey="name"
          outerRadius="68%"
          paddingAngle={-20}
          strokeWidth={0}
        >
          <Cells data={thisYear} />
        </PieChart.Pie>
        <PieChart.Tooltip
          content={
            <PieTooltip
              valueFormatter={(value) => `$${Number(value).toLocaleString()}`}
            />
          }
        />
      </PieChart>
      <div className="flex items-center gap-6">
        <Legend
          data={[
            { name: "Q1", value: 0 },
            { name: "Q2", value: 0 },
            { name: "Q3", value: 0 },
            { name: "Q4", value: 0 },
          ]}
        />
        <div className="text-muted flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="bg-muted/30 size-2.5 rounded-full" />
            Last year (inner)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-muted size-2.5 rounded-full" />
            This year (outer)
          </span>
        </div>
      </div>
    </Card.Content>
  </Card>
);
