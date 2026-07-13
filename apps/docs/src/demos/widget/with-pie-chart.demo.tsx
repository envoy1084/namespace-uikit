"use client";

// @demo-title With Pie Chart
import { Widget } from "@thenamespace/uikit";
import { PieChart } from "@thenamespace/uikit/pie-chart";

const browsers = [
  { name: "Chrome", value: 62 },
  { name: "Safari", value: 19 },
  { name: "Firefox", value: 10 },
  { name: "Edge", value: 9 },
];

const colors = [
  "var(--chart-4)",
  "var(--chart-3)",
  "var(--chart-2)",
  "var(--chart-1)",
];

export const DemoWithPieChartExample = () => (
  <Widget className="w-full max-w-[360px]">
    <Widget.Header>
      <Widget.Title>Browser Usage</Widget.Title>
    </Widget.Header>
    <Widget.Content className="flex flex-col items-center gap-4">
      <PieChart height={200}>
        <PieChart.Tooltip content={<PieChart.TooltipContent />} />
        <PieChart.Pie
          cx="50%"
          cy="50%"
          data={browsers}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
        >
          {browsers.map((item, index) => (
            <PieChart.Cell fill={colors[index]} key={item.name} />
          ))}
        </PieChart.Pie>
      </PieChart>
      <Widget.Legend className="flex-wrap justify-center">
        {browsers.map((item, index) => (
          <Widget.LegendItem color={colors[index]} key={item.name}>
            {item.name}
          </Widget.LegendItem>
        ))}
      </Widget.Legend>
    </Widget.Content>
  </Widget>
);
