"use client";

import type { Color } from "react-aria-components";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ColorSwatchPicker,
  Spinner,
  Tabs,
  Tooltip,
  buttonVariants,
} from "@thenamespace/uikit";
import { PaintBoardIcon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import LinkRoot from "fumadocs-core/link";
import { useTheme } from "next-themes";

import { ComponentDemoGallery } from "@/components/component-demo-gallery";
import { cn } from "@/utils/cn";

const tabs = ["dashboard", "mail", "chat", "finances", "components"] as const;

const labels: Record<(typeof tabs)[number], string> = {
  chat: "Chat",
  components: "Components",
  dashboard: "Dashboard",
  finances: "Finances",
  mail: "Mail",
};

const iframeTabs: Record<string, string> = {
  chat: "https://heroui.pro/templates/chat",
  dashboard: "https://heroui.pro/templates/dashboard",
  finances: "https://heroui.pro/templates/finances",
  mail: "https://heroui.pro/templates/email",
};

const colors = [
  "#FF81B9",
  "#FF8289",
  "#FF9A00",
  "#DCBE00",
  "#72DB5A",
  "#00D7FF",
  "#5DBFFF",
  "#A8ABFF",
];

export interface DemoShowcaseFont {
  cdnUrl: string;
  family: string;
  variable: string;
}

export interface DemoShowcaseProps {
  alwaysShowTabs?: boolean;
  className?: string;
  font?: DemoShowcaseFont;
  showPalette?: boolean;
  theme?: "dark" | "light";
  themeVars?: CSSProperties;
}

export function DemoShowcase({
  alwaysShowTabs = false,
  className,
  font,
  showPalette = true,
  theme,
  themeVars,
}: DemoShowcaseProps = {}) {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { resolvedTheme } = useTheme();
  const activeTheme = theme ?? resolvedTheme ?? "dark";

  const accentVars = useMemo(() => {
    if (!selectedColor) return {};

    const accent = selectedColor.toString("css");

    return { "--accent": accent, "--focus": accent };
  }, [selectedColor]);
  const previewVars = useMemo(
    () => ({ ...themeVars, ...accentVars }) as CSSProperties,
    [accentVars, themeVars],
  );
  const iframeThemeVars = useMemo(
    () =>
      font
        ? ({
            ...previewVars,
            "--font-sans": `var(${font.variable})`,
          } as CSSProperties)
        : previewVars,
    [font, previewVars],
  );

  const sendMessageToIframe = useCallback(() => {
    const iframe = iframeRef.current;

    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
      { theme: activeTheme, type: "heroui-theme" },
      "*",
    );
    iframe.contentWindow.postMessage(
      { type: "heroui-accent", vars: iframeThemeVars },
      "*",
    );
    if (font) {
      iframe.contentWindow.postMessage(
        {
          cdnUrl: font.cdnUrl,
          family: font.family,
          type: "heroui-font",
          variable: font.variable,
        },
        "*",
      );
    }
  }, [activeTheme, font, iframeThemeVars]);

  useEffect(() => {
    sendMessageToIframe();
  }, [sendMessageToIframe]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "heroui-ready") sendMessageToIframe();
    }

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, [sendMessageToIframe]);

  const handleIframeLoad = useCallback(() => {
    sendMessageToIframe();
    window.setTimeout(() => setIframeLoading(false), 250);
  }, [sendMessageToIframe]);

  return (
    <div
      className={cn(
        "flex min-h-0 w-full flex-1 flex-col py-6 lg:py-10",
        className,
      )}
    >
      <div
        className={cn(
          "mb-4 w-full flex-col justify-between gap-4 px-2 lg:flex-row lg:items-center",
          alwaysShowTabs ? "flex" : "hidden lg:flex",
        )}
      >
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => {
            setSelectedTab(key as string);
            setIframeLoading(true);
          }}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Showcase examples">
              {tabs.map((tab) => (
                <Tabs.Tab key={tab} className="whitespace-nowrap" id={tab}>
                  {labels[tab]}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
        {showPalette ? (
          <div className="flex items-center gap-1">
            <ColorSwatchPicker size="sm" onChange={setSelectedColor}>
              {colors.map((color) => (
                <ColorSwatchPicker.Item key={color} color={color}>
                  <ColorSwatchPicker.Swatch />
                  <ColorSwatchPicker.Indicator />
                </ColorSwatchPicker.Item>
              ))}
            </ColorSwatchPicker>
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <LinkRoot
                  className={buttonVariants({
                    className: "text-muted",
                    isIconOnly: true,
                    size: "sm",
                    variant: "ghost",
                  })}
                  href="/themes"
                >
                  <HugeiconsIcon icon={PaintBoardIcon} className="size-4" />
                </LinkRoot>
              </Tooltip.Trigger>
              <Tooltip.Content className="py-0">
                Open theme builder
              </Tooltip.Content>
            </Tooltip>
          </div>
        ) : null}
      </div>
      <div
        data-theme={theme}
        className={cn(
          "flex w-full flex-col font-sans",
          alwaysShowTabs
            ? "h-full min-h-0 flex-1"
            : "h-[42rem] min-h-[32rem] flex-none",
          theme === "dark" && "dark",
        )}
        style={previewVars}
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div
            className={cn(
              "bg-background flex min-h-0 flex-1 justify-center overflow-x-hidden overflow-y-auto rounded-2xl",
              selectedTab !== "components" && "invisible",
            )}
          >
            <ComponentDemoGallery />
          </div>
          {selectedTab !== "components" && iframeTabs[selectedTab] && (
            <div className="absolute inset-0">
              <iframe
                ref={iframeRef}
                className="border-border/50 absolute inset-0 h-full w-full rounded-2xl border"
                src={iframeTabs[selectedTab]}
                title={selectedTab}
                onLoad={handleIframeLoad}
              />
              <div
                className={cn(
                  "bg-background pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl transition-opacity duration-300",
                  iframeLoading ? "opacity-100" : "opacity-0",
                )}
              >
                <Spinner />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
