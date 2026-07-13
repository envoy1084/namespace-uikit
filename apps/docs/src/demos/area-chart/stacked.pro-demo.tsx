"use client";

// @demo-title Stacked
import { AreaChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const trafficData = [
  { month: "Jan", organic: 2000, paidAds: 1000 },
  { month: "Feb", organic: 5000, paidAds: 3000 },
  { month: "Mar", organic: 8000, paidAds: 5000 },
  { month: "Apr", organic: 7000, paidAds: 6000 },
  { month: "May", organic: 9500, paidAds: 4000 },
  { month: "Jun", organic: 8000, paidAds: 5500 },
  { month: "Jul", organic: 12000, paidAds: 7000 },
  { month: "Aug", organic: 11000, paidAds: 6500 },
  { month: "Sep", organic: 14000, paidAds: 8000 },
  { month: "Oct", organic: 13000, paidAds: 9000 },
  { month: "Nov", organic: 16000, paidAds: 10000 },
  { month: "Dec", organic: 15000, paidAds: 9500 },
];

function AxisSet() {
  return (
    <>
      <AreaChart.Grid vertical={false} />
      <AreaChart.XAxis dataKey="month" tickMargin={8} />
      <AreaChart.YAxis
        tickFormatter={(value: number) =>
          value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`
        }
        width={30}
      />
    </>
  );
}

function Legend({
  items,
}: {
  items: ReadonlyArray<{ color: string; label: string }>;
}) {
  return (
    <div className="flex items-center gap-3">
      {items.map(({ color, label }) => (
        <div className="flex items-center gap-1.5" key={label}>
          <span
            className="size-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-muted text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

const stackedData = trafficData.map((item, index) => ({
  ...item,
  direct: [
    800, 1500, 2200, 1800, 2600, 2000, 3100, 2800, 3500, 3200, 4000, 3700,
  ][index]!,
  referral: [
    500, 1200, 2100, 2800, 3200, 2600, 4100, 3800, 4500, 5200, 5800, 5100,
  ][index]!,
}));

export const ProStackedExample = () => {
  const series = [
    { color: "var(--chart-4)", key: "organic", label: "Organic" },
    { color: "var(--chart-3)", key: "paidAds", label: "Paid Ads" },
    { color: "var(--chart-2)", key: "referral", label: "Referral" },
    { color: "var(--chart-1)", key: "direct", label: "Direct" },
  ];

  return (
    <Card className="w-full max-w-[600px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">Traffic Breakdown</Card.Title>
        <Legend items={series} />
      </Card.Header>
      <Card.Content>
        <AreaChart data={stackedData} height={240}>
          <defs>
            {series.map(({ color, key }) => (
              <linearGradient
                id={`stacked-${key}`}
                key={key}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          <AxisSet />
          {series.map(({ color, key, label }) => (
            <AreaChart.Area
              dataKey={key}
              dot={false}
              fill={`url(#stacked-${key})`}
              key={key}
              name={label}
              stackId="traffic"
              stroke={color}
              strokeWidth={2}
              type="monotone"
            />
          ))}
          <AreaChart.Tooltip
            content={<AreaChart.TooltipContent indicator="line" />}
          />
        </AreaChart>
      </Card.Content>
    </Card>
  );
};
