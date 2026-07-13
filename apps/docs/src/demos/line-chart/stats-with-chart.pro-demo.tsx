"use client";

// @demo-title Stats With Chart
import { LineChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const revenueData = [
  4200, 5800, 4900, 7200, 6100, 8400, 7800, 9200, 8600, 10200, 9800, 11500,
].map((revenue, index) => ({
  month: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][index]!,
  revenue,
}));

function Legend({
  items,
}: {
  items: ReadonlyArray<{ color: string; dashed?: boolean; label: string }>;
}) {
  return (
    <div className="flex items-center gap-3">
      {items.map(({ color, dashed, label }) => (
        <div className="flex items-center gap-1.5" key={label}>
          <span
            className={
              dashed
                ? "h-0 w-3 border-t-2 border-dashed"
                : "size-3 rounded-full"
            }
            style={dashed ? { borderColor: color } : { backgroundColor: color }}
          />
          <span className="text-muted text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

function TrafficAxes({ currency = false }: { currency?: boolean }) {
  return (
    <>
      <LineChart.Grid vertical={false} />
      <LineChart.XAxis dataKey="month" tickMargin={8} />
      <LineChart.YAxis
        tickFormatter={(value: number) =>
          currency
            ? `$${(value / 1000).toFixed(0)}k`
            : value >= 1000
              ? `${(value / 1000).toFixed(0)}k`
              : `${value}`
        }
        width={currency ? 40 : 30}
      />
    </>
  );
}

export const ProStatsWithChartExample = () => {
  const stats = [
    { label: "Revenue", trend: "up", value: "$228,441" },
    { label: "Expenses", trend: "down", value: "$25,108" },
    { label: "Sales", trend: "up", value: "458" },
  ];
  return (
    <div className="flex w-[700px] flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <Card className="gap-1 rounded-2xl" key={stat.label}>
            <Card.Header>
              <Card.Description className="text-sm font-medium">
                {stat.label}
              </Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-row items-center gap-2">
              <span className="text-foreground flex-1 text-2xl font-semibold">
                {stat.value}
              </span>
              <span
                className={
                  stat.trend === "up"
                    ? "bg-success/15 text-success rounded-full px-2 py-1 text-xs"
                    : "bg-danger/15 text-danger rounded-full px-2 py-1 text-xs"
                }
              >
                {stat.trend === "up" ? "↑" : "↓"} 3.3%
              </span>
            </Card.Content>
          </Card>
        ))}
      </div>
      <Card className="rounded-2xl">
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="text-base">Monthly Revenue</Card.Title>
          <Legend items={[{ color: "var(--chart-3)", label: "Revenue" }]} />
        </Card.Header>
        <Card.Content>
          <LineChart data={revenueData} height={200}>
            <TrafficAxes currency />
            <LineChart.Line
              dataKey="revenue"
              dot={false}
              name="Revenue"
              stroke="var(--chart-3)"
              strokeWidth={2}
              type="monotone"
            />
            <LineChart.Tooltip
              content={
                <LineChart.TooltipContent
                  valueFormatter={(value) =>
                    `$${Number(value).toLocaleString()}`
                  }
                />
              }
            />
          </LineChart>
        </Card.Content>
      </Card>
    </div>
  );
};
