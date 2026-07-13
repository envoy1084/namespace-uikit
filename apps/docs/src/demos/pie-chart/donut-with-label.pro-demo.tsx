"use client";

// @demo-title Donut With Label
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

const storage = [
  { name: "Documents", value: 42 },
  { name: "Media", value: 28 },
  { name: "Apps", value: 18 },
  { name: "Other", value: 12 },
];

export const ProDonutWithLabelExample = () => {
  const total = storage.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card className="w-[360px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Storage Usage</Card.Title>
        <Card.Description className="text-muted text-xs">
          {total} GB of 128 GB used
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-4">
        <div className="relative">
          <PieChart height={220} width={220}>
            <PieChart.Pie
              cornerRadius={12}
              cx="50%"
              cy="50%"
              data={storage}
              dataKey="value"
              innerRadius="68%"
              nameKey="name"
              paddingAngle={-20}
              strokeWidth={0}
            >
              <Cells data={storage} />
            </PieChart.Pie>
            <PieChart.Tooltip
              content={<PieTooltip valueFormatter={(value) => `${value} GB`} />}
            />
          </PieChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground text-2xl font-bold">{total}</span>
            <span className="text-muted text-xs">GB used</span>
          </div>
        </div>
        <Legend data={storage} suffix=" GB" />
      </Card.Content>
    </Card>
  );
};
