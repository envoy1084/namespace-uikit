"use client";

// @demo-title With Dots
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

export const ProWithDotsExample = () => (
  <Card className="w-[520px] rounded-2xl">
    <Card.Header>
      <Card.Title className="text-base">Monthly Revenue</Card.Title>
    </Card.Header>
    <Card.Content>
      <LineChart data={revenueData} height={200}>
        <TrafficAxes currency />
        <LineChart.Line
          activeDot={{ r: 5 }}
          dataKey="revenue"
          dot={{ fill: "var(--chart-3)", r: 3, strokeWidth: 0 }}
          name="Revenue"
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
