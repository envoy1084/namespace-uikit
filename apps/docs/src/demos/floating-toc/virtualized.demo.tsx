"use client";

// @demo-title Virtualized
import { useState } from "react";

import { FloatingToc } from "@thenamespace/uikit";

const manyItems = Array.from({ length: 90 }, (_, index) => ({
  id: `v-${index}`,
  label:
    index % 4 === 0 ? `Section ${index / 4 + 1}` : "Implementation details",
  level: index % 4 === 0 ? 1 : index % 3 === 0 ? 3 : 2,
}));

function LargeList() {
  const [active, setActive] = useState("v-0");
  return (
    <div className="px-10 py-10">
      <FloatingToc triggerMode="press">
        <FloatingToc.Trigger aria-label="Table of contents">
          {manyItems
            .filter((item) => item.level === 1)
            .map((item) => (
              <FloatingToc.Bar active={item.id === active} key={item.id} />
            ))}
        </FloatingToc.Trigger>
        <FloatingToc.Content className="w-72 overflow-hidden !p-0">
          <span className="text-muted block px-3 pt-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase">
            Contents ({manyItems.length} items)
          </span>
          <div className="block h-[320px] overflow-auto p-1.5 outline-none">
            {manyItems.map((item) => (
              <FloatingToc.Item
                active={item.id === active}
                key={item.id}
                level={item.level}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </FloatingToc.Item>
            ))}
          </div>
        </FloatingToc.Content>
      </FloatingToc>
    </div>
  );
}

export const DemoVirtualizedExample = () => <LargeList />;
