"use client";

import type { Color } from "react-aria-components";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Palette } from "@gravity-ui/icons";
import {
  ColorSwatchPicker,
  Spinner,
  Tabs,
  Tooltip,
  buttonVariants,
} from "@thenamespace/uikit";
import LinkRoot from "fumadocs-core/link";
import { useTheme } from "next-themes";

import { DemoComponents } from "@/components/demo";
import { cn } from "@/utils/cn";

const tabs = ["components", "dashboard", "mail", "chat", "finances"] as const;

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

export function DemoShowcase() {
  const [selectedTab, setSelectedTab] = useState("components");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { resolvedTheme } = useTheme();

  const accentVars = useMemo(() => {
    if (!selectedColor) return {};

    const accent = selectedColor.toString("css");

    return { "--accent": accent, "--focus": accent };
  }, [selectedColor]);

  const sendMessageToIframe = useCallback(() => {
    const iframe = iframeRef.current;

    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
      { theme: resolvedTheme ?? "dark", type: "heroui-theme" },
      "*",
    );
    iframe.contentWindow.postMessage(
      { type: "heroui-accent", vars: accentVars },
      "*",
    );
  }, [accentVars, resolvedTheme]);

  useEffect(() => {
    sendMessageToIframe();
  }, [sendMessageToIframe]);

  const handleIframeLoad = useCallback(() => {
    sendMessageToIframe();
    window.setTimeout(() => setIframeLoading(false), 250);
  }, [sendMessageToIframe]);

  return (
    <div className="flex min-h-0 w-full max-w-[1200px] flex-1 flex-col py-6 lg:py-10">
      <div className="mb-4 hidden w-full flex-col justify-between gap-4 px-2 lg:flex lg:flex-row lg:items-center">
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
                <Palette className="size-4" />
              </LinkRoot>
            </Tooltip.Trigger>
            <Tooltip.Content className="py-0">
              Open theme builder
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>
      <div
        className="flex min-h-[420px] max-w-[1200px] flex-1 flex-col"
        style={accentVars as CSSProperties}
      >
        <div className="bg-background flex w-full justify-center rounded-2xl py-8 lg:hidden">
          <DemoComponents />
        </div>
        <div className="relative hidden min-h-0 flex-1 lg:flex lg:flex-col">
          <div
            className={cn(
              "border-border/50 bg-background flex flex-1 justify-center overflow-x-hidden overflow-y-auto rounded-2xl border py-8",
              selectedTab !== "components" && "invisible",
            )}
          >
            <div className="my-auto">
              <DemoComponents />
            </div>
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
