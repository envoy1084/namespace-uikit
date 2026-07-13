"use client";

// @demo-title With Footer
import { KPI } from "@thenamespace/uikit";
import { Link } from "@thenamespace/uikit/link";

import { Icon } from "@/demos/pro-icon";

export const ProWithFooterExample = () => (
  <div className="grid w-[900px] grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2">
    {[
      {
        title: "Total Subscribers",
        value: 71897,
        change: "+122",
        status: "success",
        href: "View all",
      },
      {
        title: "Monthly Revenue",
        value: 45231,
        change: "+20.1%",
        status: "warning",
        href: "View report",
      },
    ].map((card) => (
      <KPI key={card.title}>
        <KPI.Header>
          <KPI.Icon status={card.status as "success" | "warning"}>
            <Icon icon="solar:users-group-rounded-linear" />
          </KPI.Icon>
          <KPI.Title>{card.title}</KPI.Title>
          <KPI.Trend className="ml-auto" trend="up">
            {card.change}
          </KPI.Trend>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            {...(card.title.includes("Revenue")
              ? { currency: "USD", style: "currency" as const }
              : {})}
            maximumFractionDigits={0}
            value={card.value}
          />
        </KPI.Content>
        <KPI.Footer>
          <Link className="text-sm" href="#">
            {card.href}
          </Link>
        </KPI.Footer>
      </KPI>
    ))}
  </div>
);
