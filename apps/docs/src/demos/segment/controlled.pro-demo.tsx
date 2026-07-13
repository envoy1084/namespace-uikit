"use client";

// @demo-title Controlled
import type { Key } from "react-aria-components";

import { useState } from "react";

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

function ControlledDemo() {
  const [selected, setSelected] = useState<Key>("analytics");
  return (
    <div className="flex flex-col items-start gap-4">
      <Segment selectedKey={selected} onSelectionChange={setSelected}>
        <BasicItems />
      </Segment>
      <span className="text-muted text-sm">
        Selected:{" "}
        <strong className="text-foreground">{String(selected)}</strong>
      </span>
    </div>
  );
}

export const ProControlledExample = () => <ControlledDemo />;
