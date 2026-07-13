"use client";

// @demo-title Stacked
import { BarChart } from "@thenamespace/uikit";
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

const plans = [
  { enterprise: 12000, pro: 8000, quarter: "Q1", starter: 4000 },
  { enterprise: 15000, pro: 10000, quarter: "Q2", starter: 5000 },
  { enterprise: 18000, pro: 12000, quarter: "Q3", starter: 6000 },
  { enterprise: 22000, pro: 14000, quarter: "Q4", starter: 7000 },
];

export const DemoStackedExample = () => (
  <Card className="w-full max-w-[480px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <Card.Title className="text-base">Revenue by Plan</Card.Title>
      <Legend
        items={[
          { color: "var(--chart-4)", label: "Enterprise" },
          { color: "var(--chart-3)", label: "Pro" },
          { color: "var(--chart-1)", label: "Starter" },
        ]}
      />
    </Card.Header>
    <Card.Content>
      <BarChart data={plans} height={220}>
        <BarChart.Grid vertical={false} />
        <BarChart.XAxis dataKey="quarter" tickMargin={8} />
        <BarChart.YAxis
          tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
          width={40}
        />
        <BarChart.Bar
          barSize={32}
          dataKey="starter"
          fill="var(--chart-1)"
          name="Starter"
          stackId="revenue"
        />
        <BarChart.Bar
          barSize={32}
          dataKey="pro"
          fill="var(--chart-3)"
          name="Pro"
          stackId="revenue"
        />
        <BarChart.Bar
          barSize={32}
          dataKey="enterprise"
          fill="var(--chart-4)"
          name="Enterprise"
          radius={[4, 4, 0, 0]}
          stackId="revenue"
        />
        <BarChart.Tooltip
          content={
            <BarChart.TooltipContent
              indicator="line"
              valueFormatter={(value) => `$${Number(value).toLocaleString()}`}
            />
          }
        />
      </BarChart>
    </Card.Content>
  </Card>
);
