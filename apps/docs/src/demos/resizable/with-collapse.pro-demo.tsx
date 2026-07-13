// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title With Collapse
import type { PanelImperativeHandle } from "@thenamespace/uikit";

import { useRef, useState } from "react";

import { Resizable } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

const Content = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => (
  <div className={`flex h-full items-center justify-center p-6 ${className}`}>
    <span className="text-sm font-medium">{children}</span>
  </div>
);

export const ProWithCollapseExample = function Demo() {
  const panelRef = useRef<PanelImperativeHandle | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            collapsed
              ? panelRef.current?.expand()
              : panelRef.current?.collapse()
          }
        >
          {collapsed ? "Expand" : "Collapse"} sidebar
        </Button>
      </div>
      <div className="border-border bg-background h-[400px] w-full overflow-hidden rounded-xl border">
        <Resizable orientation="horizontal">
          <Resizable.Panel
            collapsible
            collapsedSize={0}
            defaultSize={25}
            handleRef={panelRef}
            id="sidebar"
            minSize={15}
            onCollapse={() => setCollapsed(true)}
            onExpand={() => setCollapsed(false)}
          >
            <Content className="bg-surface text-surface-foreground">
              Sidebar
            </Content>
          </Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel defaultSize={75} id="main">
            <Content className="text-foreground">Main content</Content>
          </Resizable.Panel>
        </Resizable>
      </div>
    </div>
  );
};
