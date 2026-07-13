"use client";

// @demo-title With Breakdown
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

const plans = [
  { name: "Enterprise", value: 340 },
  { name: "Pro", value: 520 },
  { name: "Starter", value: 280 },
];

export const DemoWithBreakdownExample = () => {
  const total = plans.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card className="w-[460px] rounded-2xl">
      <Card.Header>
        <Card.Title className="text-base">Users by Plan</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-row items-center gap-6">
        <div className="relative shrink-0">
          <PieChart height={180} width={180}>
            <PieChart.Pie
              cornerRadius={12}
              cx="50%"
              cy="50%"
              data={plans}
              dataKey="value"
              innerRadius="68%"
              nameKey="name"
              paddingAngle={-20}
              strokeWidth={0}
            >
              <Cells data={plans} />
            </PieChart.Pie>
            <PieChart.Tooltip content={<PieTooltip />} />
          </PieChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground text-xl font-bold">
              {total.toLocaleString()}
            </span>
            <span className="text-muted text-[10px]">Total</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {plans.map((item, index) => (
            <div className="flex items-center gap-3" key={item.name}>
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <div className="flex flex-1 items-center justify-between">
                <span className="text-foreground text-sm">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-sm font-semibold">
                    {item.value}
                  </span>
                  <span className="text-muted text-xs">
                    ({((item.value / total) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};
