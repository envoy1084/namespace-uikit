"use client";

// @demo-title With Icons
import { Segment } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

const iconItems = [
  { icon: "lucide:layout-dashboard", id: "dashboard", label: "Dashboard" },
  { icon: "lucide:chart-column", id: "analytics", label: "Analytics" },
  { icon: "lucide:users", id: "team", label: "Team" },
  { icon: "lucide:settings", id: "settings", label: "Settings" },
];

export const ProWithIconsExample = () => (
  <Segment defaultSelectedKey="dashboard">
    {iconItems.map((item) => (
      <Segment.Item id={item.id} key={item.id}>
        <Icon icon={item.icon} />
        {item.label}
      </Segment.Item>
    ))}
  </Segment>
);
