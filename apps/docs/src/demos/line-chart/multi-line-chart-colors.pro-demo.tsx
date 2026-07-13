"use client";

// @demo-title Multi Line Chart Colors
import { LineChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const trafficData = [
  { month: "Jan", organic: 2000, paidAds: 1000 },
  { month: "Feb", organic: 15000, paidAds: 10000 },
  { month: "Mar", organic: 8000, paidAds: 12000 },
  { month: "Apr", organic: 14000, paidAds: 14000 },
  { month: "May", organic: 15000, paidAds: 8000 },
  { month: "Jun", organic: 8000, paidAds: 9000 },
  { month: "Jul", organic: 18000, paidAds: 12000 },
  { month: "Aug", organic: 18000, paidAds: 10000 },
  { month: "Sep", organic: 20000, paidAds: 5000 },
  { month: "Oct", organic: 17000, paidAds: 12000 },
  { month: "Nov", organic: 22000, paidAds: 18000 },
  { month: "Dec", organic: 15000, paidAds: 9000 },
];

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

const multiData = trafficData.map((item, index) => ({
  ...item,
  directTraffic: [
    800, 1500, 2200, 1800, 2600, 2000, 3100, 2800, 3500, 3200, 4000, 3700,
  ][index]!,
  referral: [
    500, 1200, 2100, 2800, 3200, 2600, 4100, 3800, 4500, 5200, 5800, 5100,
  ][index]!,
}));

const multiSeries = [
  { color: "var(--chart-4)", key: "organic", label: "Organic" },
  { color: "var(--chart-3)", key: "paidAds", label: "Paid Ads" },
  { color: "var(--chart-2)", key: "referral", label: "Referral" },
  { color: "var(--chart-1)", key: "directTraffic", label: "Direct" },
] as const;

export const ProMultiLineChartColorsExample = () => (
  <Card className="w-[600px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Traffic Sources</Card.Title>
      <Legend items={multiSeries} />
    </Card.Header>
    <Card.Content>
      <LineChart data={multiData} height={240}>
        <TrafficAxes />
        {multiSeries.map((series) => (
          <LineChart.Line
            dataKey={series.key}
            dot={false}
            key={series.key}
            name={series.label}
            stroke={series.color}
            strokeWidth={2}
            type="monotone"
          />
        ))}
        <LineChart.Tooltip
          content={<LineChart.TooltipContent indicator="line" />}
        />
      </LineChart>
    </Card.Content>
  </Card>
);
