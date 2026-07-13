"use client";

// @demo-title Default
import { KPI } from "@thenamespace/uikit";

const cards = [
  { change: "+33%", title: "Total Revenue", trend: "up", value: 228451 },
  { change: "+13.0%", title: "Total Expenses", trend: "down", value: 71887 },
  { change: "0.0%", title: "Total Profit", trend: "neutral", value: 156540 },
  { change: "+1.0%", title: "New Customers", trend: "up", value: 1234 },
] as const;

export const DemoDefaultExample = () => (
  <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-4">
    {cards.map((card) => (
      <KPI key={card.title}>
        <KPI.Header>
          <KPI.Title>{card.title}</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            currency={card.title.includes("Customer") ? undefined : "USD"}
            maximumFractionDigits={0}
            style={card.title.includes("Customer") ? "decimal" : "currency"}
            value={card.value}
          />
          <KPI.Trend trend={card.trend}>{card.change}</KPI.Trend>
        </KPI.Content>
      </KPI>
    ))}
  </div>
);
