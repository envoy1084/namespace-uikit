"use client";

import {
  AreaChart,
  BarChart,
  Card,
  ComposedChart,
  KPI,
  LineChart,
  PieChart,
  RadarChart,
  RadialChart,
} from "@thenamespace/uikit";

const chartColors = [1, 2, 3, 4, 5].map((index) => `var(--chart-${index})`);
const months = [
  { month: "Jan", a: 32, b: 18, c: 27, d: 12, e: 22 },
  { month: "Feb", a: 44, b: 25, c: 31, d: 20, e: 28 },
  { month: "Mar", a: 38, b: 34, c: 42, d: 26, e: 35 },
  { month: "Apr", a: 55, b: 42, c: 38, d: 34, e: 44 },
  { month: "May", a: 48, b: 50, c: 54, d: 39, e: 47 },
  { month: "Jun", a: 68, b: 56, c: 61, d: 48, e: 59 },
];
const share = [
  { name: "Search", value: 38 },
  { name: "Social", value: 24 },
  { name: "Direct", value: 18 },
  { name: "Email", value: 12 },
  { name: "Other", value: 8 },
];
const activity = [
  { fill: "var(--chart-1)", name: "Product", value: 84 },
  { fill: "var(--chart-3)", name: "Growth", value: 68 },
  { fill: "var(--chart-5)", name: "Support", value: 52 },
];
const metrics = [
  { change: "+18.2%", title: "Revenue", trend: "up", value: 228451 },
  { change: "+8.4%", title: "Customers", trend: "up", value: 12480 },
  { change: "-2.1%", title: "Churn", trend: "down", value: 3.2 },
] as const;

function PreviewCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card className="min-w-0 rounded-2xl">
      <Card.Header>
        <Card.Title className="text-sm">{title}</Card.Title>
      </Card.Header>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}

export function ProComponentsPreview() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted mr-2 text-xs font-semibold tracking-wider uppercase">
          Chart palette
        </span>
        {chartColors.map((color, index) => (
          <div className="flex items-center gap-1.5" key={color}>
            <span
              className="size-4 rounded-full"
              style={{ background: color }}
            />
            <span className="text-muted font-mono text-[10px]">
              {index + 1}
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {metrics.map((metric) => (
          <KPI key={metric.title}>
            <KPI.Header>
              <KPI.Title>{metric.title}</KPI.Title>
            </KPI.Header>
            <KPI.Content>
              <KPI.Value
                maximumFractionDigits={metric.title === "Churn" ? 1 : 0}
                style="decimal"
                value={metric.value}
              />
              <KPI.Trend trend={metric.trend}>{metric.change}</KPI.Trend>
            </KPI.Content>
          </KPI>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <PreviewCard title="Multi-series performance">
          <LineChart data={months} height={220}>
            <LineChart.Grid vertical={false} />
            <LineChart.XAxis dataKey="month" tickMargin={8} />
            <LineChart.YAxis width={28} />
            {["a", "b", "c", "d", "e"].map((key, index) => (
              <LineChart.Line
                dataKey={key}
                dot={false}
                key={key}
                stroke={chartColors[index]}
                strokeWidth={2}
                type="monotone"
              />
            ))}
            <LineChart.Tooltip content={<LineChart.TooltipContent />} />
          </LineChart>
        </PreviewCard>

        <PreviewCard title="Channel distribution">
          <div className="grid items-center sm:grid-cols-[1fr_auto]">
            <PieChart height={220}>
              <PieChart.Pie
                cx="50%"
                cy="50%"
                data={share}
                dataKey="value"
                innerRadius={50}
                nameKey="name"
                outerRadius={88}
              >
                {share.map((item, index) => (
                  <PieChart.Cell fill={chartColors[index]} key={item.name} />
                ))}
              </PieChart.Pie>
            </PieChart>
            <div className="grid gap-2 pr-4">
              {share.map((item, index) => (
                <div
                  className="flex items-center gap-2 text-xs"
                  key={item.name}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: chartColors[index] }}
                  />
                  <span className="text-muted flex-1">{item.name}</span>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </PreviewCard>

        <PreviewCard title="Revenue mix">
          <BarChart data={months} height={220}>
            <BarChart.Grid vertical={false} />
            <BarChart.XAxis dataKey="month" tickMargin={8} />
            <BarChart.YAxis width={28} />
            {["a", "b", "c", "d", "e"].map((key, index) => (
              <BarChart.Bar
                dataKey={key}
                fill={chartColors[index]}
                key={key}
                radius={[3, 3, 0, 0]}
                stackId="total"
              />
            ))}
            <BarChart.Tooltip content={<BarChart.TooltipContent />} />
          </BarChart>
        </PreviewCard>

        <PreviewCard title="Capability profile">
          <RadarChart data={months} height={220}>
            <RadarChart.Grid />
            <RadarChart.AngleAxis dataKey="month" />
            {["a", "c", "e"].map((key, index) => (
              <RadarChart.Radar
                dataKey={key}
                fill={chartColors[index * 2]}
                fillOpacity={0.08}
                key={key}
                stroke={chartColors[index * 2]}
                strokeWidth={2}
              />
            ))}
            <RadarChart.Tooltip content={<RadarChart.TooltipContent />} />
          </RadarChart>
        </PreviewCard>

        <PreviewCard title="Revenue trend">
          <AreaChart data={months} height={220}>
            <defs>
              <linearGradient id="pro-area-fill" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <AreaChart.Grid vertical={false} />
            <AreaChart.XAxis dataKey="month" tickMargin={8} />
            <AreaChart.YAxis width={28} />
            <AreaChart.Area
              dataKey="a"
              fill="url(#pro-area-fill)"
              stroke="var(--chart-3)"
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </PreviewCard>

        <PreviewCard title="Orders and conversion">
          <ComposedChart data={months} height={220}>
            <ComposedChart.Grid vertical={false} />
            <ComposedChart.XAxis dataKey="month" tickMargin={8} />
            <ComposedChart.YAxis width={28} />
            <ComposedChart.Bar
              barSize={18}
              dataKey="a"
              fill="var(--chart-2)"
              radius={[4, 4, 0, 0]}
            />
            <ComposedChart.Line
              dataKey="e"
              dot={false}
              stroke="var(--chart-5)"
              strokeWidth={2}
              type="monotone"
            />
            <ComposedChart.Tooltip
              content={<ComposedChart.TooltipContent indicator="line" />}
            />
          </ComposedChart>
        </PreviewCard>

        <PreviewCard title="Team progress">
          <div className="grid items-center gap-4 sm:grid-cols-[200px_1fr]">
            <div className="relative mx-auto size-[200px]">
              <RadialChart
                data={activity}
                height={200}
                innerRadius="45%"
                outerRadius="100%"
                width={200}
              >
                <RadialChart.Bar background cornerRadius={12} dataKey="value" />
              </RadialChart>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">68%</span>
                <span className="text-muted text-xs">average</span>
              </div>
            </div>
            <div className="grid gap-3">
              {activity.map((item) => (
                <div className="grid gap-1" key={item.name}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">{item.name}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="bg-default h-1.5 overflow-hidden rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: item.fill,
                        width: `${item.value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PreviewCard>
      </div>
    </div>
  );
}
