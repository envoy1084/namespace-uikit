"use client";

// @demo-title Disabled
import { Segment } from "@thenamespace/uikit";

const items = [
  { id: "dashboard", label: "Dashboard" },
  { id: "analytics", label: "Analytics" },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" },
];

const BasicItems = ({ separators = false }: { separators?: boolean }) => (
  <>
    {items.map((item) => (
      <Segment.Item id={item.id} key={item.id}>
        {separators ? <Segment.Separator /> : null}
        {item.label}
      </Segment.Item>
    ))}
  </>
);

export const ProDisabledExample = () => (
  <Segment isDisabled defaultSelectedKey="dashboard">
    <BasicItems />
  </Segment>
);
