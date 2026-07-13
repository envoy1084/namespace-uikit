"use client";

// @demo-title With Line Chart
import { Widget } from "@thenamespace/uikit";
import { LineChart } from "@thenamespace/uikit/line-chart";

const months = [
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
];

const traffic = months.map((month, index) => ({
  month,
  organic: [
    2000, 15000, 8000, 14000, 15000, 8000, 18000, 18000, 20000, 17000, 22000,
    15000,
  ][index],
  paidAds: [
    1000, 10000, 12000, 14000, 8000, 9000, 12000, 10000, 5000, 12000, 18000,
    9000,
  ][index],
}));

export const DemoWithLineChartExample = () => (
  <Widget className="w-full max-w-[520px]">
    <Widget.Header>
      <Widget.Title>Traffic Sources</Widget.Title>
      <Widget.Legend>
        <Widget.LegendItem color="var(--chart-3)">Organic</Widget.LegendItem>
        <Widget.LegendItem color="var(--chart-1)">Paid Ads</Widget.LegendItem>
      </Widget.Legend>
    </Widget.Header>
    <Widget.Content>
      <LineChart data={traffic} height={200}>
        <LineChart.Grid vertical={false} />
        <LineChart.XAxis dataKey="month" tickMargin={8} />
        <LineChart.YAxis
          tickFormatter={(value) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`
          }
          width={30}
        />
        <LineChart.Tooltip content={<LineChart.TooltipContent />} />
        <LineChart.Line
          dataKey="organic"
          dot={false}
          name="Organic"
          stroke="var(--chart-3)"
          strokeWidth={2}
          type="monotone"
        />
        <LineChart.Line
          dataKey="paidAds"
          dot={false}
          name="Paid Ads"
          stroke="var(--chart-1)"
          strokeWidth={2}
          type="monotone"
        />
      </LineChart>
    </Widget.Content>
  </Widget>
);
