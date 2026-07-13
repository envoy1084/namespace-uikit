"use client";

// @demo-title Grouped
import { BarChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const channels = [
  { direct: 3200, month: "Jan", online: 4200, retail: 2800 },
  { direct: 4100, month: "Feb", online: 5800, retail: 3400 },
  { direct: 3800, month: "Mar", online: 4900, retail: 3100 },
  { direct: 5200, month: "Apr", online: 7200, retail: 4200 },
  { direct: 4600, month: "May", online: 6100, retail: 3800 },
  { direct: 5800, month: "Jun", online: 8400, retail: 4500 },
];

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

const channelSeries = [
  { color: "var(--chart-3)", key: "online", label: "Online" },
  { color: "var(--chart-2)", key: "retail", label: "Retail" },
  { color: "var(--chart-1)", key: "direct", label: "Direct" },
] as const;

export const DemoGroupedExample = () => (
  <Card className="w-full max-w-[480px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Revenue by Channel</Card.Title>
      <Legend items={channelSeries} />
    </Card.Header>
    <Card.Content>
      <BarChart data={channels} height={220}>
        <BarChart.Grid vertical={false} />
        <BarChart.XAxis dataKey="month" tickMargin={8} />
        <BarChart.YAxis
          tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
          width={40}
        />
        {channelSeries.map((series) => (
          <BarChart.Bar
            barSize={10}
            dataKey={series.key}
            fill={series.color}
            key={series.key}
            name={series.label}
            radius={[4, 4, 0, 0]}
          />
        ))}
        <BarChart.Tooltip
          content={
            <BarChart.TooltipContent
              valueFormatter={(value) => `$${Number(value).toLocaleString()}`}
            />
          }
        />
      </BarChart>
    </Card.Content>
  </Card>
);
