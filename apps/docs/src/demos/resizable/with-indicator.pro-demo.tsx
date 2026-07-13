"use client";

// @demo-title With Indicator
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

export const ProWithIndicatorExample = () => (
  <div className="border-border bg-background h-[400px] w-full overflow-hidden rounded-xl border">
    <Resizable orientation="horizontal">
      <Resizable.Panel defaultSize={40} minSize={15}>
        <Content className="bg-surface text-surface-foreground">Left</Content>
      </Resizable.Panel>
      <Resizable.Handle type="line" withIndicator />
      <Resizable.Panel defaultSize={60}>
        <Content className="text-foreground">Right</Content>
      </Resizable.Panel>
    </Resizable>
  </div>
);
