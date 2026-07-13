"use client";

// @demo-title Portfolio
import React from "react";

import { LineChart } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const portfolioRanges = {
  "1H": {
    balance: "$24,801.32",
    change: "$42.10 (0.17%)",
    data: [
      24759, 24820, 24690, 24780, 24650, 24730, 24860, 24710, 24840, 24770,
      24900, 24680, 24810, 24750, 24801,
    ],
  },
  "1D": {
    balance: "$24,801.32",
    change: "$312.55 (1.28%)",
    data: [
      24490, 24680, 24350, 24520, 24750, 24410, 24600, 24380, 24720, 24550,
      24830, 24460, 24690, 24580, 24801,
    ],
  },
  "1W": {
    balance: "$24,801.32",
    change: "$842.18 (3.51%)",
    data: [
      23960, 24100, 23850, 24200, 24050, 24350, 24500, 24400, 24650, 24801,
    ],
  },
  "1M": {
    balance: "$24,801.32",
    change: "$1,242.77 (5.32%)",
    data: [
      18000, 17500, 17800, 18200, 19000, 18500, 19200, 20500, 20000, 21000,
      20800, 22000, 21500, 22800, 24801,
    ],
  },
  "1Y": {
    balance: "$24,801.32",
    change: "$8,401.32 (51.2%)",
    data: [
      16400, 15200, 17100, 16800, 18500, 19200, 18000, 20100, 21500, 19800,
      22400, 23100, 21800, 24200, 24801,
    ],
  },
  ALL: {
    balance: "$24,801.32",
    change: "$19,801.32 (396%)",
    data: [
      5000, 6200, 5800, 7500, 9200, 8400, 11000, 12800, 14500, 13200, 16800,
      18500, 20100, 22400, 24801,
    ],
  },
} as const;

function PortfolioExample() {
  const [range, setRange] = React.useState<keyof typeof portfolioRanges>("1M");
  const current = portfolioRanges[range];

  return (
    <Card className="w-[520px] rounded-2xl">
      <Card.Header className="flex-row items-start justify-between pb-0">
        <div className="flex flex-col gap-3">
          <Card.Title className="text-base">Portfolio</Card.Title>
          <div className="flex flex-col gap-0.5">
            <span className="text-muted text-xs">Total balance</span>
            <span className="text-foreground text-2xl font-semibold">
              {current.balance}
            </span>
            <span className="text-xs font-medium text-green-500">
              {current.change}
            </span>
          </div>
        </div>
        <div className="bg-default flex rounded-lg p-0.5">
          {(
            Object.keys(portfolioRanges) as Array<keyof typeof portfolioRanges>
          ).map((key) => (
            <button
              className={
                range === key
                  ? "bg-surface text-foreground rounded-md px-2 py-1 text-xs shadow-sm"
                  : "text-muted rounded-md px-2 py-1 text-xs"
              }
              key={key}
              onClick={() => setRange(key)}
              type="button"
            >
              {key}
            </button>
          ))}
        </div>
      </Card.Header>
      <Card.Content>
        <LineChart
          data={current.data.map((value) => ({ value }))}
          height={182}
          margin={{ bottom: 0, left: 0, right: 0, top: 4 }}
        >
          <LineChart.YAxis domain={["dataMin - 1000", "dataMax + 1000"]} hide />
          <LineChart.Line
            dataKey="value"
            dot={false}
            stroke="var(--chart-3)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </Card.Content>
    </Card>
  );
}

export const DemoPortfolioExample = () => <PortfolioExample />;
