"use client";

// @demo-title Default
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

export const DemoDefaultExample = () => (
  <div className="border-border bg-background h-[400px] w-full overflow-hidden rounded-xl border">
    <Resizable orientation="horizontal">
      <Resizable.Panel
        defaultSize="180px"
        groupResizeBehavior="preserve-pixel-size"
        maxSize="260px"
        minSize="140px"
      >
        <Content>Sidebar</Content>
      </Resizable.Panel>
      <Resizable.Handle />
      <Resizable.Panel minSize={30}>
        <Content className="text-foreground">Main content</Content>
      </Resizable.Panel>
    </Resizable>
  </div>
);
