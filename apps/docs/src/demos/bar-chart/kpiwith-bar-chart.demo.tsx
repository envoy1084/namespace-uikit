"use client";

// @demo-title KPIWith Bar Chart
import { BarChart } from "@thenamespace/uikit";
import { KPI } from "@thenamespace/uikit/kpi";

const sales = [18, 32, 28, 45, 38, 52, 42, 55, 48, 60, 53, 58].map(
  (value, index) => ({
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][index]!,
    sales: value,
  }),
);

export const DemoKPIWithBarChartExample = () => (
  <KPI className="w-full max-w-[400px]">
    <KPI.Header>
      <KPI.Title>Monthly Sales</KPI.Title>
    </KPI.Header>
    <KPI.Content className="flex flex-col gap-3">
      <div className="flex items-center gap-3 self-start">
        <KPI.Value value={278} />
        <KPI.Trend trend="up">
          3.3% <span className="text-muted">last 30d</span>
        </KPI.Trend>
      </div>
      <BarChart data={sales} height={160}>
        <BarChart.Grid vertical={false} />
        <BarChart.XAxis dataKey="month" tickMargin={8} />
        <BarChart.Bar
          barSize={16}
          dataKey="sales"
          fill="var(--accent)"
          radius={[24, 24, 24, 24]}
        />
        <BarChart.Tooltip content={<BarChart.TooltipContent />} />
      </BarChart>
    </KPI.Content>
  </KPI>
);
