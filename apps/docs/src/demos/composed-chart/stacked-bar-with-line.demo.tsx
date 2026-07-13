"use client";

// @demo-title Stacked Bar With Line
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

const codeData = [
  {
    aiPct: 72,
    cli: 800,
    cloudAgent: 200,
    day: "Mar 13",
    ide: 2200,
    other: 100,
  },
  { aiPct: 65, cli: 500, cloudAgent: 100, day: "Mar 14", ide: 1200, other: 80 },
  { aiPct: 78, cli: 400, cloudAgent: 150, day: "Mar 15", ide: 3200, other: 50 },
  {
    aiPct: 88,
    cli: 1200,
    cloudAgent: 300,
    day: "Mar 16",
    ide: 13500,
    other: 200,
  },
  {
    aiPct: 85,
    cli: 1000,
    cloudAgent: 250,
    day: "Mar 17",
    ide: 13200,
    other: 180,
  },
  { aiPct: 60, cli: 200, cloudAgent: 50, day: "Mar 18", ide: 800, other: 30 },
  { aiPct: 55, cli: 150, cloudAgent: 40, day: "Mar 19", ide: 600, other: 20 },
  { aiPct: 50, cli: 100, cloudAgent: 30, day: "Mar 22", ide: 400, other: 15 },
  { aiPct: 48, cli: 80, cloudAgent: 20, day: "Mar 25", ide: 300, other: 10 },
  {
    aiPct: 70,
    cli: 600,
    cloudAgent: 200,
    day: "Mar 28",
    ide: 5000,
    other: 100,
  },
  {
    aiPct: 75,
    cli: 800,
    cloudAgent: 250,
    day: "Mar 31",
    ide: 8500,
    other: 150,
  },
  { aiPct: 68, cli: 500, cloudAgent: 150, day: "Apr 3", ide: 3000, other: 80 },
  {
    aiPct: 82,
    cli: 900,
    cloudAgent: 300,
    day: "Apr 6",
    ide: 10500,
    other: 200,
  },
  {
    aiPct: 90,
    cli: 1500,
    cloudAgent: 500,
    day: "Apr 7",
    ide: 23000,
    other: 300,
  },
  {
    aiPct: 85,
    cli: 1200,
    cloudAgent: 400,
    day: "Apr 9",
    ide: 18000,
    other: 250,
  },
];

export const DemoStackedBarWithLineExample = () => {
  const bars = [
    { color: "var(--chart-4)", key: "ide", label: "IDE" },
    { color: "var(--chart-2)", key: "cli", label: "CLI" },
    { color: "var(--chart-3)", key: "cloudAgent", label: "Cloud Agent" },
    { color: "var(--chart-1)", key: "other", label: "Other" },
  ] as const;
  return (
    <Card className="w-full max-w-[700px] rounded-2xl">
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base">
          AI Share of Committed Code
        </Card.Title>
        <Legend items={[...bars, { color: "var(--muted)", label: "AI %" }]} />
      </Card.Header>
      <Card.Content>
        <ComposedChart data={codeData} height={300}>
          <ComposedChart.Grid vertical={false} />
          <ComposedChart.XAxis dataKey="day" tickMargin={8} />
          <ComposedChart.YAxis
            tickFormatter={(value: number) =>
              value >= 1000 ? `${(value / 1000).toFixed(0)}K` : `${value}`
            }
            width={35}
            yAxisId="left"
          />
          <ComposedChart.YAxis
            domain={[0, 100]}
            orientation="right"
            tickFormatter={(value: number) => `${value}%`}
            width={40}
            yAxisId="right"
          />
          {bars.map((bar, index) => (
            <ComposedChart.Bar
              barSize={index === 0 ? 20 : undefined}
              dataKey={bar.key}
              fill={bar.color}
              key={bar.key}
              name={bar.label}
              radius={index === bars.length - 1 ? [4, 4, 0, 0] : undefined}
              stackId="code"
              yAxisId="left"
            />
          ))}
          <ComposedChart.Line
            dataKey="aiPct"
            dot={false}
            name="AI %"
            stroke="var(--muted)"
            strokeWidth={1.5}
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
};
