"use client";

// @demo-title KPIWith Chart
import { LineChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const sparkUp = [30, 35, 28, 42, 38, 45, 50, 48, 55, 60, 58, 65].map(
  (value) => ({ value }),
);

const sparkDown = [65, 60, 62, 55, 58, 52, 50, 48, 45, 42, 44, 40].map(
  (value) => ({ value }),
);

const kpis = [
  {
    color: "var(--chart-3)",
    data: sparkUp,
    direction: "up",
    label: "Total Revenue",
    suffix: "last 30d",
    trend: "3.3%",
    value: "US$228,451",
  },
  {
    color: "var(--color-danger)",
    data: sparkDown,
    direction: "down",
    label: "Bounce Rate",
    suffix: "vs last 7d",
    trend: "5.9%",
    value: "42.3%",
  },
  {
    color: "var(--color-success)",
    data: sparkUp,
    direction: "up",
    label: "New Customers",
    suffix: "this week",
    trend: "1.0%",
    value: "1,234",
  },
] as const;

export const DemoKPIWithChartExample = () => (
  <div className="grid w-[900px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {kpis.map((kpi) => (
      <Card className="min-h-[148px]" key={kpi.label}>
        <Card.Header>
          <Card.Title className="text-muted">{kpi.label}</Card.Title>
        </Card.Header>
        <Card.Content className="grid grid-cols-[1fr_1fr] items-end">
          <div className="flex flex-col gap-1">
            <span className="text-foreground text-3xl font-semibold">
              {kpi.value}
            </span>
            <span
              className={
                kpi.direction === "up"
                  ? "text-success flex gap-1 text-xs"
                  : "text-danger flex gap-1 text-xs"
              }
            >
              {kpi.direction === "up" ? "↑" : "↓"} {kpi.trend}{" "}
              <span className="text-muted">{kpi.suffix}</span>
            </span>
          </div>
          <LineChart
            data={[...kpi.data]}
            height={70}
            margin={{ bottom: 0, left: 0, right: 0, top: 4 }}
          >
            <LineChart.Line
              dataKey="value"
              dot={false}
              stroke={kpi.color}
              strokeWidth={1.5}
              type="monotone"
            />
          </LineChart>
        </Card.Content>
      </Card>
    ))}
  </div>
);
