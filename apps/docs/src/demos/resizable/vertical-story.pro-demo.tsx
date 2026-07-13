"use client";

// @demo-title Vertical
import { Resizable } from "@thenamespace/uikit";

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

export const ProVerticalStoryExample = () => (
  <div className="border-border bg-background h-[400px] w-full overflow-hidden rounded-xl border">
    <Resizable orientation="vertical">
      <Resizable.Panel defaultSize={60} minSize={20}>
        <Content className="text-foreground">Top</Content>
      </Resizable.Panel>
      <Resizable.Handle />
      <Resizable.Panel defaultSize={40} minSize={20}>
        <Content>Bottom</Content>
      </Resizable.Panel>
    </Resizable>
  </div>
);
