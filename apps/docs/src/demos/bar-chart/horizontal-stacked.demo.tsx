"use client";

// @demo-title Horizontal Stacked
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

const energy = [
  { day: "Mon", high: 180, low: 120, medium: 280 },
  { day: "Tue", high: 220, low: 150, medium: 320 },
  { day: "Wed", high: 150, low: 180, medium: 250 },
  { day: "Thu", high: 180, low: 140, medium: 290 },
  { day: "Fri", high: 190, low: 160, medium: 270 },
  { day: "Sat", high: 210, low: 130, medium: 240 },
  { day: "Sun", high: 240, low: 170, medium: 300 },
];

export const DemoHorizontalStackedExample = () => (
  <Card className="w-full max-w-[480px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <div>
        <Card.Title className="text-base">Avg. Energy Activity</Card.Title>
        <div className="text-foreground mt-1 text-2xl font-bold">
          580/280 <span className="text-muted text-sm font-normal">kcal</span>
        </div>
      </div>
    </Card.Header>
    <Card.Content className="flex flex-col gap-3">
      <BarChart
        data={energy}
        height={280}
        layout="vertical"
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <BarChart.XAxis hide type="number" />
        <BarChart.YAxis
          dataKey="day"
          tickMargin={8}
          type="category"
          width={36}
        />
        <BarChart.Bar
          barSize={18}
          dataKey="low"
          fill="var(--chart-1)"
          name="Low"
          radius={[4, 0, 0, 4]}
          stackId="energy"
        />
        <BarChart.Bar
          barSize={18}
          dataKey="medium"
          fill="var(--chart-2)"
          name="Medium"
          stackId="energy"
        />
        <BarChart.Bar
          barSize={18}
          dataKey="high"
          fill="var(--chart-4)"
          name="High"
          radius={[0, 4, 4, 0]}
          stackId="energy"
        />
        <BarChart.Tooltip
          content={
            <BarChart.TooltipContent
              indicator="line"
              valueFormatter={(value) => `${value} kcal`}
            />
          }
        />
      </BarChart>
      <div className="flex items-center justify-center gap-4">
        <Legend
          items={[
            { color: "var(--chart-1)", label: "Low" },
            { color: "var(--chart-2)", label: "Medium" },
            { color: "var(--chart-4)", label: "High" },
          ]}
        />
      </div>
    </Card.Content>
  </Card>
);
