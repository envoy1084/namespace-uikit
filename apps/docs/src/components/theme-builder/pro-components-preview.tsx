"use client";

import {
  AreaChart,
  BarChart,
  Card,
  KPI,
  LineChart,
  PieChart,
  RadarChart,
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
      </div>
    </div>
  );
}
