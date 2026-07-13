"use client";

// @demo-title Dashboard Grid
import { Widget } from "@thenamespace/uikit";
import { AreaChart } from "@thenamespace/uikit/area-chart";
import { BarChart } from "@thenamespace/uikit/bar-chart";
import { LineChart } from "@thenamespace/uikit/line-chart";
import { TrendChip } from "@thenamespace/uikit/trend-chip";

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

const revenue = months.map((month, index) => ({
  month,
  revenue: [
    4200, 5800, 4900, 7200, 6100, 8400, 7800, 9200, 8600, 10200, 9800, 11500,
  ][index],
}));

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

export const ProDashboardGridExample = () => (
  <div className="grid w-full max-w-[960px] grid-cols-1 gap-3 md:grid-cols-2">
    <Widget className="md:col-span-2">
      <Widget.Header>
        <Widget.Title>Overview</Widget.Title>
      </Widget.Header>
      <Widget.Content className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { title: "Revenue", value: "$228K", trend: "up", change: "12.5%" },
          { title: "Orders", value: "1,234", trend: "up", change: "8.2%" },
          { title: "Customers", value: "8,921", trend: "up", change: "3.1%" },
          {
            title: "Conversion",
            value: "3.2%",
            trend: "down",
            change: "0.4%",
          },
        ].map((item) => (
          <div className="flex flex-col gap-1" key={item.title}>
            <span className="text-muted text-xs">{item.title}</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground text-xl font-semibold">
                {item.value}
              </span>
              <TrendChip trend={item.trend as "down" | "up"} variant="soft">
                {item.change}
              </TrendChip>
            </div>
          </div>
        ))}
      </Widget.Content>
    </Widget>
    <Widget>
      <Widget.Header>
        <Widget.Title>Revenue</Widget.Title>
        <TrendChip trend="up" variant="tertiary">
          12.5%
        </TrendChip>
      </Widget.Header>
      <Widget.Content>
        <AreaChart data={revenue} height={180}>
          <AreaChart.Grid vertical={false} />
          <AreaChart.XAxis dataKey="month" tickMargin={8} />
          <AreaChart.YAxis width={40} />
          <AreaChart.Area
            dataKey="revenue"
            dot={false}
            fill="var(--chart-3)"
            stroke="var(--chart-3)"
          />
        </AreaChart>
      </Widget.Content>
    </Widget>
    <Widget>
      <Widget.Header>
        <Widget.Title>Traffic</Widget.Title>
        <Widget.Legend>
          <Widget.LegendItem color="var(--chart-3)">Organic</Widget.LegendItem>
          <Widget.LegendItem color="var(--chart-1)">Paid</Widget.LegendItem>
        </Widget.Legend>
      </Widget.Header>
      <Widget.Content>
        <LineChart data={traffic.slice(0, 6)} height={180}>
          <LineChart.Grid vertical={false} />
          <LineChart.XAxis dataKey="month" />
          <LineChart.YAxis width={30} />
          <LineChart.Line
            dataKey="organic"
            dot={false}
            stroke="var(--chart-3)"
          />
          <LineChart.Line
            dataKey="paidAds"
            dot={false}
            stroke="var(--chart-1)"
          />
        </LineChart>
      </Widget.Content>
    </Widget>
    <Widget className="md:col-span-2">
      <Widget.Header>
        <Widget.Title>Monthly Sales</Widget.Title>
        <Widget.Description>Units sold — Jan to Dec 2025</Widget.Description>
      </Widget.Header>
      <Widget.Content>
        <BarChart
          data={months.map((month, index) => ({
            month,
            sales: [18, 32, 28, 45, 38, 52, 42, 55, 48, 60, 53, 58][index],
          }))}
          height={180}
        >
          <BarChart.Grid vertical={false} />
          <BarChart.XAxis dataKey="month" />
          <BarChart.YAxis width={30} />
          <BarChart.Bar
            barSize={20}
            dataKey="sales"
            fill="var(--accent)"
            radius={[24, 24, 24, 24]}
          />
        </BarChart>
      </Widget.Content>
    </Widget>
  </div>
);
