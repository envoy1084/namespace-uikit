"use client";

// @demo-title Bar With Area
import { ComposedChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

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

const defaultData = [
  { month: "Jan", orders: 320, revenue: 4200 },
  { month: "Feb", orders: 450, revenue: 5800 },
  { month: "Mar", orders: 380, revenue: 4900 },
  { month: "Apr", orders: 520, revenue: 7200 },
  { month: "May", orders: 480, revenue: 6100 },
  { month: "Jun", orders: 600, revenue: 8400 },
  { month: "Jul", orders: 550, revenue: 7800 },
  { month: "Aug", orders: 680, revenue: 9200 },
  { month: "Sep", orders: 620, revenue: 8600 },
  { month: "Oct", orders: 750, revenue: 10200 },
  { month: "Nov", orders: 700, revenue: 9800 },
  { month: "Dec", orders: 820, revenue: 11500 },
];

const impressions = defaultData.map((item, index) => ({
  ctr: [3.2, 3.8, 3.5, 4.2, 4, 4.8, 4.5, 5.1, 4.9, 5.5, 5.2, 5.8][index]!,
  impressions: [
    45000, 52000, 48000, 61000, 58000, 72000, 68000, 78000, 75000, 85000, 82000,
    92000,
  ][index]!,
  month: item.month,
}));

export const DemoBarWithAreaExample = () => (
  <Card className="w-full max-w-[560px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Impressions & CTR</Card.Title>
      <Legend
        items={[
          { color: "var(--chart-3)", label: "Impressions" },
          { color: "var(--chart-4)", label: "CTR %" },
        ]}
      />
    </Card.Header>
    <Card.Content>
      <ComposedChart data={impressions} height={260}>
        <defs>
          <linearGradient id="ctr-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-4)" stopOpacity={0.15} />
            <stop offset="100%" stopColor="var(--chart-4)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <ComposedChart.Grid vertical={false} />
        <ComposedChart.XAxis dataKey="month" tickMargin={8} />
        <ComposedChart.YAxis
          tickFormatter={(value: number) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`
          }
          width={35}
          yAxisId="left"
        />
        <ComposedChart.YAxis
          domain={[0, 8]}
          orientation="right"
          tickFormatter={(value: number) => `${value}%`}
          width={35}
          yAxisId="right"
        />
        <ComposedChart.Area
          dataKey="ctr"
          dot={false}
          fill="url(#ctr-gradient)"
          name="CTR"
          stroke="none"
          type="monotone"
          yAxisId="right"
        />
        <ComposedChart.Bar
          barSize={16}
          dataKey="impressions"
          fill="var(--chart-3)"
          name="Impressions"
          radius={[4, 4, 0, 0]}
          yAxisId="left"
        />
        <ComposedChart.Line
          dataKey="ctr"
          dot={false}
          legendType="none"
          stroke="var(--chart-4)"
          strokeWidth={2}
          tooltipType="none"
          type="monotone"
          yAxisId="right"
        />
        <ComposedChart.Tooltip content={<ComposedChart.TooltipContent />} />
      </ComposedChart>
    </Card.Content>
  </Card>
);
