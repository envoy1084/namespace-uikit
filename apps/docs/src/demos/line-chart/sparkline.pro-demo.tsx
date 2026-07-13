"use client";

// @demo-title Sparkline
import { LineChart } from "@thenamespace/uikit";

const sparkUp = [30, 35, 28, 42, 38, 45, 50, 48, 55, 60, 58, 65].map(
  (value) => ({ value }),
);

const sparkDown = [65, 60, 62, 55, 58, 52, 50, 48, 45, 42, 44, 40].map(
  (value) => ({ value }),
);

export const ProSparklineExample = () => (
  <div className="flex items-center gap-6">
    {[
      { color: "var(--color-success)", data: sparkUp, label: "Revenue" },
      { color: "var(--color-danger)", data: sparkDown, label: "Churn" },
      { color: "var(--chart-3)", data: sparkUp, label: "Users" },
    ].map((item) => (
      <div className="flex flex-col gap-1" key={item.label}>
        <span className="text-muted text-xs">{item.label}</span>
        <div className="w-[120px]">
          <LineChart
            data={item.data}
            height={40}
            margin={{ bottom: 0, left: 0, right: 0, top: 2 }}
          >
            <LineChart.Line
              dataKey="value"
              dot={false}
              stroke={item.color}
              strokeWidth={1.5}
              type="monotone"
            />
          </LineChart>
        </div>
      </div>
    ))}
  </div>
);
