"use client";

// @demo-title Types
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

export const ProTypesExample = () => (
  <div className="flex w-full flex-col gap-6">
    {(["line", "drag", "pill", "handle"] as const).map((type) => (
      <div className="flex flex-col gap-2" key={type}>
        <span className="text-muted text-xs font-medium tracking-wide uppercase">
          {type}
        </span>
        <div className="border-border bg-background h-[200px] w-full overflow-hidden rounded-xl border">
          <Resizable>
            <Resizable.Panel defaultSize={50} minSize={20}>
              <Content className="bg-surface text-surface-foreground">
                Left
              </Content>
            </Resizable.Panel>
            <Resizable.Handle type={type} />
            <Resizable.Panel defaultSize={50} minSize={20}>
              <Content className="text-foreground">Right</Content>
            </Resizable.Panel>
          </Resizable>
        </div>
      </div>
    ))}
  </div>
);
