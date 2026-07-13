"use client";

// @demo-title Multi Type
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

function Axes({ dual = false }: { dual?: boolean }) {
  return (
    <>
      <ComposedChart.Grid vertical={false} />
      <ComposedChart.XAxis dataKey="month" tickMargin={8} />
      <ComposedChart.YAxis
        tickFormatter={(value: number) =>
          value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`
        }
        width={dual ? 35 : 30}
        {...(dual ? { yAxisId: "left" } : {})}
      />
      {dual ? (
        <ComposedChart.YAxis
          domain={[0, 60]}
          orientation="right"
          tickFormatter={(value: number) => `${value}%`}
          width={35}
          yAxisId="right"
        />
      ) : null}
    </>
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

const analytics = defaultData.map((item, index) => ({
  bounceRate: [42, 38, 40, 35, 37, 32, 34, 30, 31, 28, 29, 26][index]!,
  month: item.month,
  pageViews: [
    8200, 11500, 9800, 14200, 12100, 16800, 15200, 18400, 17200, 20500, 19600,
    23000,
  ][index]!,
  users: [
    3200, 4500, 3800, 5600, 4800, 6600, 6000, 7200, 6800, 8100, 7700, 9100,
  ][index]!,
}));

export const ProMultiTypeExample = () => (
  <Card className="w-full max-w-[620px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Site Analytics</Card.Title>
      <Legend
        items={[
          { color: "var(--chart-3)", label: "Page Views" },
          { color: "var(--chart-4)", label: "Users" },
          { color: "var(--chart-1)", label: "Bounce Rate" },
        ]}
      />
    </Card.Header>
    <Card.Content>
      <ComposedChart data={analytics} height={280}>
        <defs>
          <linearGradient id="pv-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.15} />
            <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Axes dual />
        <ComposedChart.Area
          dataKey="pageViews"
          dot={false}
          fill="url(#pv-gradient)"
          name="Page Views"
          stroke="var(--chart-3)"
          strokeWidth={2}
          type="monotone"
          yAxisId="left"
        />
        <ComposedChart.Bar
          barSize={14}
          dataKey="users"
          fill="var(--chart-4)"
          name="Users"
          radius={[4, 4, 0, 0]}
          yAxisId="left"
        />
        <ComposedChart.Line
          dataKey="bounceRate"
          dot={{ fill: "var(--chart-1)", r: 3, strokeWidth: 0 }}
          name="Bounce Rate"
          stroke="var(--chart-1)"
          strokeWidth={2}
          type="monotone"
          yAxisId="right"
        />
        <ComposedChart.Tooltip
          content={<ComposedChart.TooltipContent indicator="line" />}
        />
      </ComposedChart>
    </Card.Content>
  </Card>
);
