"use client";

// @demo-title Default
import { Widget } from "@thenamespace/uikit";
import { LineChart } from "@thenamespace/uikit/line-chart";

const requests = Array.from({ length: 30 }, (_, index) => ({
  date: `2025-09-${String(index + 1).padStart(2, "0")}`,
  requests: [
    680, 1150, 1470, 1130, 560, 470, 960, 1200, 1120, 1060, 780, 930, 950, 1050,
    1740, 940, 1570, 1250, 930, 1280, 1180, 1320, 950, 980, 680, 510, 960, 860,
    630, 380,
  ][index],
}));

export const DemoDefaultExample = () => (
  <Widget className="w-full max-w-[520px]">
    <Widget.Header>
      <Widget.Title>Tokens Over Time</Widget.Title>
      <Widget.Legend>
        <Widget.LegendItem color="var(--chart-4)">Input</Widget.LegendItem>
        <Widget.LegendItem color="var(--chart-1)">Output</Widget.LegendItem>
      </Widget.Legend>
    </Widget.Header>
    <Widget.Content>
      <LineChart
        data={requests.map((item, index) => ({
          date: item.date,
          input: item.requests * 80,
          output: item.requests * (25 + (index % 4)),
        }))}
        height={220}
      >
        <LineChart.Grid vertical={false} />
        <LineChart.XAxis
          dataKey="date"
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
            })
          }
          tickMargin={8}
        />
        <LineChart.YAxis
          tickFormatter={(value) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`
          }
          width={40}
        />
        <LineChart.Tooltip content={<LineChart.TooltipContent />} />
        <LineChart.Line
          dataKey="input"
          dot={false}
          name="Input"
          stroke="var(--chart-4)"
          strokeWidth={2}
          type="monotone"
        />
        <LineChart.Line
          dataKey="output"
          dot={false}
          name="Output"
          stroke="var(--chart-1)"
          strokeWidth={2}
          type="monotone"
        />
      </LineChart>
    </Widget.Content>
  </Widget>
);
