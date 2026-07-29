"use client";

// @demo-title KPIWith Chart
import { LineChart } from "@thenamespace/uikit";
import { KPI } from "@thenamespace/uikit/kpi";
import { TrendChip } from "@thenamespace/uikit/trend-chip";

const sparkUp = [30, 35, 28, 42, 38, 45, 50, 48, 55, 60, 58, 65].map((value) => ({ value }));

const sparkDown = [65, 60, 62, 55, 58, 52, 50, 48, 45, 42, 44, 40].map((value) => ({ value }));

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
      <KPI key={kpi.label}>
        <KPI.Header>
          <KPI.Title>{kpi.label}</KPI.Title>
        </KPI.Header>
        <KPI.Content className="grid-cols-[1fr_1fr] items-end">
          <div className="flex flex-col gap-1">
            {kpi.label === "Total Revenue" ? (
              <KPI.Value
                className="text-3xl"
                currency="USD"
                maximumFractionDigits={0}
                style="currency"
                value={228451}
              />
            ) : kpi.label === "Bounce Rate" ? (
              <KPI.Value
                className="text-3xl"
                maximumFractionDigits={1}
                style="percent"
                value={0.423}
              />
            ) : (
              <KPI.Value className="text-3xl" maximumFractionDigits={0} value={1234} />
            )}
            <TrendChip trend={kpi.direction} variant="tertiary">
              {kpi.trend}
              <TrendChip.Suffix>{kpi.suffix}</TrendChip.Suffix>
            </TrendChip>
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
        </KPI.Content>
      </KPI>
    ))}
  </div>
);
