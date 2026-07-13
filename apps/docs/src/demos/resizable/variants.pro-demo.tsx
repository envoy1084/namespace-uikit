"use client";

// @demo-title Variants
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

export const ProVariantsExample = () => (
  <div className="flex w-full flex-col gap-6">
    {[
      {
        bg: "bg-background",
        fg: "text-foreground",
        label: "primary — background",
        variant: "primary",
      },
      {
        bg: "bg-surface",
        fg: "text-surface-foreground",
        label: "secondary — surface",
        variant: "secondary",
      },
      {
        bg: "bg-surface-secondary",
        fg: "text-surface-secondary-foreground",
        label: "tertiary — surface secondary",
        variant: "tertiary",
      },
    ].map((item) => (
      <div className="flex flex-col gap-2" key={item.variant}>
        <span className="text-muted text-xs font-medium tracking-wide uppercase">
          {item.label}
        </span>
        <div
          className={`${item.bg} border-border h-[180px] w-full overflow-hidden rounded-xl border`}
        >
          <Resizable>
            <Resizable.Panel defaultSize={50}>
              <Content className={item.fg}>Left</Content>
            </Resizable.Panel>
            <Resizable.Handle
              variant={item.variant as "primary" | "secondary" | "tertiary"}
            />
            <Resizable.Panel defaultSize={50}>
              <Content className={item.fg}>Right</Content>
            </Resizable.Panel>
          </Resizable>
        </div>
      </div>
    ))}
  </div>
);
