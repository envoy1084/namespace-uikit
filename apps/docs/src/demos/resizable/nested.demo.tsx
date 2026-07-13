"use client";

// @demo-title Nested
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

export const DemoNestedExample = () => (
  <div className="border-border bg-background h-[500px] w-full overflow-hidden rounded-xl border">
    <Resizable orientation="horizontal">
      <Resizable.Panel defaultSize={25} minSize={15}>
        <Content className="bg-surface text-surface-foreground">
          Sidebar
        </Content>
      </Resizable.Panel>
      <Resizable.Handle />
      <Resizable.Panel defaultSize={75}>
        <Resizable orientation="vertical">
          <Resizable.Panel defaultSize={65} minSize={20}>
            <Content className="text-foreground">Editor</Content>
          </Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel defaultSize={35} minSize={15}>
            <Content className="bg-surface-secondary text-surface-secondary-foreground">
              Terminal
            </Content>
          </Resizable.Panel>
        </Resizable>
      </Resizable.Panel>
    </Resizable>
  </div>
);
