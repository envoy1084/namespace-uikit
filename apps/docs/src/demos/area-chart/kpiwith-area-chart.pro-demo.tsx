"use client";

// @demo-title KPIWith Area Chart
import { AreaChart } from "@thenamespace/uikit";
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
    id: "kpi-revenue",
    label: "Total Revenue",
    suffix: "last 30d",
    trend: "3.3%",
    value: "US$228,451",
  },
  {
    color: "var(--color-danger)",
    data: sparkDown,
    direction: "down",
    id: "kpi-bounce",
    label: "Bounce Rate",
    suffix: "vs last 7d",
    trend: "5.9%",
    value: "42.3%",
  },
  {
    color: "var(--color-success)",
    data: sparkUp,
    direction: "up",
    id: "kpi-users",
    label: "Active Users",
    suffix: "this month",
    trend: "10.9%",
    value: "98k",
  },
] as const;

export const ProKPIWithAreaChartExample = () => (
  <div className="grid w-full max-w-[900px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                  ? "text-success flex items-center gap-1 text-xs"
                  : "text-danger flex items-center gap-1 text-xs"
              }
            >
              <span>{kpi.direction === "up" ? "↑" : "↓"}</span>
              <span>{kpi.trend}</span>
              <span className="text-muted">{kpi.suffix}</span>
            </span>
          </div>
          <div className="min-w-0">
            <AreaChart
              data={[...kpi.data]}
              height={70}
              margin={{ bottom: 0, left: 0, right: 0, top: 4 }}
            >
              <defs>
                <linearGradient id={kpi.id} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={kpi.color} stopOpacity={0.2} />
                  <stop
                    offset="100%"
                    stopColor={kpi.color}
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <AreaChart.Area
                dataKey="value"
                dot={false}
                fill={`url(#${kpi.id})`}
                stroke={kpi.color}
                strokeWidth={1.5}
                type="monotone"
              />
            </AreaChart>
          </div>
        </Card.Content>
      </Card>
    ))}
  </div>
);
