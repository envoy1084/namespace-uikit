"use client";

// @demo-title Sizes
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

export const DemoSizesExample = () => (
  <div className="flex flex-col items-start gap-6">
    {(["sm", "md", "lg"] as const).map((size) => (
      <div className="flex flex-col gap-2" key={size}>
        <span className="text-muted text-xs">{size}</span>
        <Segment defaultSelectedKey="dashboard" size={size}>
          <BasicItems />
        </Segment>
      </div>
    ))}
  </div>
);
