"use client";

// @demo-title Default
import { BarChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
import { ChartTooltip } from "@thenamespace/uikit/chart-tooltip";
import { Chip } from "@thenamespace/uikit/chip";
import { ArrowUp02Icon, Icon } from "@thenamespace/uikit/icons";

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

export const DemoDefaultExample = () => (
  <Card className="w-full max-w-[480px] rounded-2xl">
    <Card.Header className="flex-row items-center justify-between">
      <div>
        <Card.Title className="text-base">Daily Sales</Card.Title>
        <Card.Description className="text-muted text-xs">
          Units sold per month
        </Card.Description>
      </div>
      <Chip color="success" size="sm" variant="soft">
        <Icon icon={ArrowUp02Icon} size={12} />
        <Chip.Label>12.5%</Chip.Label>
      </Chip>
    </Card.Header>
    <Card.Content>
      <BarChart data={sales} height={200}>
        <BarChart.Grid vertical={false} />
        <BarChart.XAxis dataKey="month" tickMargin={8} />
        <BarChart.YAxis width={30} />
        <BarChart.Bar
          barSize={16}
          dataKey="sales"
          fill="var(--accent)"
          radius={[24, 24, 24, 24]}
        />
        <BarChart.Tooltip
          content={({ active, label, payload }) =>
            !active || !payload?.length ? null : (
              <ChartTooltip>
                <ChartTooltip.Header>{label}</ChartTooltip.Header>
                {payload.map((entry) => (
                  <ChartTooltip.Item key={String(entry.dataKey)}>
                    <ChartTooltip.Indicator color={entry.color ?? entry.fill} />
                    <ChartTooltip.Label>
                      {entry.name ?? "Sales"}
                    </ChartTooltip.Label>
                    <ChartTooltip.Value>{entry.value} units</ChartTooltip.Value>
                  </ChartTooltip.Item>
                ))}
              </ChartTooltip>
            )
          }
        />
      </BarChart>
    </Card.Content>
  </Card>
);
