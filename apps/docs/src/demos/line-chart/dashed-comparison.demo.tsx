"use client";

// @demo-title Dashed Comparison
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

export const DemoDashedComparisonExample = () => {
  const data = revenueData.map((item, index) => ({
    actual: item.revenue,
    month: item.month,
    target: [
      5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500,
    ][index]!,
  }));
  return (
    <Card className="w-[520px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Actual vs Target</Card.Title>
        <Legend
          items={[
            { color: "var(--chart-3)", label: "Actual" },
            { color: "var(--chart-2)", dashed: true, label: "Target" },
          ]}
        />
      </Card.Header>
      <Card.Content>
        <LineChart data={data} height={200}>
          <TrafficAxes currency />
          <LineChart.Line
            dataKey="target"
            dot={false}
            name="Target"
            stroke="var(--chart-2)"
            strokeDasharray="5 5"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Line
            dataKey="actual"
            dot={false}
            name="Actual"
            stroke="var(--chart-3)"
            strokeWidth={2}
            type="monotone"
          />
          <LineChart.Tooltip
            content={
              <LineChart.TooltipContent
                valueFormatter={(value) => `$${Number(value).toLocaleString()}`}
              />
            }
          />
        </LineChart>
      </Card.Content>
    </Card>
  );
};
