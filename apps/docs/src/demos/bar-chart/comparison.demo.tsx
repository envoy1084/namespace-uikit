"use client";

// @demo-title Comparison
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

export const DemoComparisonExample = () => {
  const data = [
    { current: 120, day: "Mon", previous: 90 },
    { current: 180, day: "Tue", previous: 150 },
    { current: 150, day: "Wed", previous: 170 },
    { current: 210, day: "Thu", previous: 140 },
    { current: 190, day: "Fri", previous: 160 },
    { current: 80, day: "Sat", previous: 100 },
    { current: 60, day: "Sun", previous: 70 },
  ];
  return (
    <Card className="w-full max-w-[480px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <div>
          <Card.Title className="text-base">Weekly Orders</Card.Title>
          <Card.Description className="text-muted text-xs">
            This week vs last week
          </Card.Description>
        </div>
        <Legend
          items={[
            { color: "var(--chart-3)", label: "This week" },
            { color: "var(--chart-1)", label: "Last week" },
          ]}
        />
      </Card.Header>
      <Card.Content>
        <BarChart data={data} height={200}>
          <BarChart.Grid vertical={false} />
          <BarChart.XAxis dataKey="day" tickMargin={8} />
          <BarChart.YAxis width={30} />
          <BarChart.Bar
            barSize={12}
            dataKey="current"
            fill="var(--chart-3)"
            name="This week"
            radius={[4, 4, 0, 0]}
          />
          <BarChart.Bar
            barSize={12}
            dataKey="previous"
            fill="var(--chart-1)"
            name="Last week"
            radius={[4, 4, 0, 0]}
          />
          <BarChart.Tooltip content={<BarChart.TooltipContent />} />
        </BarChart>
      </Card.Content>
    </Card>
  );
};
