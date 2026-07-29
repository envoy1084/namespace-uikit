"use client";

// @demo-title Virtualized
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import { FloatingToc } from "@thenamespace/uikit";
import { ListBox, ListBoxItem, ListLayout, Virtualizer } from "react-aria-components";

const manyItems = (() => {
  const sectionNames = [
    "Introduction",
    "Architecture",
    "Components",
    "State Management",
    "Routing",
    "Data Fetching",
    "Authentication",
    "Authorization",
    "Testing",
    "Performance",
    "Deployment",
    "Monitoring",
    "Error Handling",
    "Logging",
    "Caching",
    "Security",
    "Accessibility",
    "Internationalization",
    "Theming",
    "Animation",
  ];
  const items: Array<{ id: string; label: string; level: number }> = [];
  let index = 0;
  for (const [sectionIndex, label] of sectionNames.entries()) {
    items.push({ id: `v-${index++}`, label, level: 1 });
    const childCount = 2 + (sectionIndex % 3);
    for (let childIndex = 0; childIndex < childCount; childIndex++) {
      items.push({
        id: `v-${index++}`,
        label: `${label} — Part ${childIndex + 1}`,
        level: 2,
      });
      if (childIndex % 2 === 0)
        items.push({
          id: `v-${index++}`,
          label: "Implementation details",
          level: 3,
        });
    }
  }
  return items;
})();
const topLevelItems = manyItems.filter((item) => item.level === 1);
const parentById = (() => {
  const parents = new Map<string, string>();
  let parent = "";
  for (const item of manyItems) {
    if (item.level === 1) parent = item.id;
    parents.set(item.id, parent);
  }
  return parents;
})();

function LargeList() {
  const [active, setActive] = useState(manyItems[0]?.id ?? "v-0");
  const selectedKeys = useMemo(() => new Set([active]), [active]);
  const activeParent = parentById.get(active) ?? active;
  return (
    <div className="px-10 py-10">
      <FloatingToc triggerMode="press">
        <FloatingToc.Trigger aria-label="Table of contents">
          {topLevelItems.map((item) => (
            <FloatingToc.Bar active={item.id === activeParent} key={item.id} />
          ))}
        </FloatingToc.Trigger>
        <FloatingToc.Content className="w-72 overflow-hidden !p-0">
          <span className="text-muted block px-3 pt-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase">
            Contents ({manyItems.length} items)
          </span>
          <Virtualizer layout={ListLayout} layoutOptions={{ estimatedRowHeight: 32, padding: 6 }}>
            <ListBox
              aria-label="Table of contents"
              className="block h-[320px] overflow-auto outline-none"
              items={manyItems}
              selectedKeys={selectedKeys}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const key = [...keys][0];
                if (key) setActive(String(key));
              }}
            >
              {(item) => (
                <ListBoxItem
                  className="floating-toc__item"
                  data-active={item.id === active || undefined}
                  style={
                    item.level > 1
                      ? ({
                          "--floating-toc-level": item.level,
                        } as CSSProperties)
                      : undefined
                  }
                  textValue={item.label}
                >
                  {item.label}
                </ListBoxItem>
              )}
            </ListBox>
          </Virtualizer>
        </FloatingToc.Content>
      </FloatingToc>
    </div>
  );
}

export const DemoVirtualizedExample = () => <LargeList />;
