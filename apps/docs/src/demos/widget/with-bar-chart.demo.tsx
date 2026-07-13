"use client";

// @demo-title With Bar Chart
import { Widget } from "@thenamespace/uikit";
import { BarChart } from "@thenamespace/uikit/bar-chart";

const requests = Array.from({ length: 30 }, (_, index) => ({
  date: `2025-09-${String(index + 1).padStart(2, "0")}`,
  requests: [
    680, 1150, 1470, 1130, 560, 470, 960, 1200, 1120, 1060, 780, 930, 950, 1050,
    1740, 940, 1570, 1250, 930, 1280, 1180, 1320, 950, 980, 680, 510, 960, 860,
    630, 380,
  ][index],
}));

export const DemoWithBarChartExample = () => (
  <Widget className="w-full max-w-[520px]">
    <Widget.Header>
      <Widget.Title>Requests Over Time</Widget.Title>
      <Widget.Legend>
        <Widget.LegendItem color="var(--chart-3)">Requests</Widget.LegendItem>
      </Widget.Legend>
    </Widget.Header>
    <Widget.Content>
      <BarChart data={requests} height={220}>
        <BarChart.Grid vertical={false} />
        <BarChart.XAxis
          dataKey="date"
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
            })
          }
          tickMargin={8}
        />
        <BarChart.YAxis width={40} />
        <BarChart.Tooltip content={<BarChart.TooltipContent />} />
        <BarChart.Bar
          dataKey="requests"
          fill="var(--chart-3)"
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </Widget.Content>
  </Widget>
);
