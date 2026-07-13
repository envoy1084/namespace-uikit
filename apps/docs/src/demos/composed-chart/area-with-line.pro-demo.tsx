"use client";

// @demo-title Area With Line
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

const sessions = defaultData.map((item, index) => ({
  month: item.month,
  sessions: [
    12000, 18000, 15000, 22000, 19000, 25000, 23000, 28000, 26000, 31000, 29000,
    34000,
  ][index]!,
  target: [
    15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000,
    26000,
  ][index]!,
}));

export const ProAreaWithLineExample = () => (
  <Card className="w-full max-w-[560px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Sessions vs Target</Card.Title>
      <Legend
        items={[
          { color: "var(--chart-3)", label: "Sessions" },
          { color: "var(--chart-1)", label: "Target" },
        ]}
      />
    </Card.Header>
    <Card.Content>
      <ComposedChart data={sessions} height={260}>
        <defs>
          <linearGradient id="sessions-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Axes />
        <ComposedChart.Area
          dataKey="sessions"
          dot={false}
          fill="url(#sessions-gradient)"
          name="Sessions"
          stroke="var(--chart-3)"
          strokeWidth={2}
          type="monotone"
        />
        <ComposedChart.Line
          dataKey="target"
          dot={false}
          name="Target"
          stroke="var(--chart-1)"
          strokeDasharray="6 3"
          strokeWidth={2}
          type="monotone"
        />
        <ComposedChart.Tooltip content={<ComposedChart.TooltipContent />} />
      </ComposedChart>
    </Card.Content>
  </Card>
);
