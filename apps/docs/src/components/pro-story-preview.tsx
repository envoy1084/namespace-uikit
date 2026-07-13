"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";

import { ComponentPreviewCode } from "@/components/component-preview-code";
import { proStoryLoaders } from "@/generated/pro-story-loaders";

type Story =
  | ComponentType<Record<string, unknown>>
  | {
      args?: Record<string, unknown>;
      render?: ComponentType<Record<string, unknown>>;
    };

export function ProStoryPreview({
  code,
  component,
}: {
  code: string;
  component: string;
}) {
  const [Preview, setPreview] = useState<ComponentType<
    Record<string, unknown>
  > | null>(null);
  const [previewProps, setPreviewProps] = useState<Record<string, unknown>>({});

  useEffect(() => {
    let active = true;

    proStoryLoaders[component]?.().then((storyModule) => {
      if (!active) return undefined;
      const story = (storyModule.Default ??
        Object.entries(storyModule).find(
          ([name, value]) =>
            name !== "default" &&
            (typeof value === "function" ||
              (typeof value === "object" && value !== null)),
        )?.[1]) as Story | undefined;
      const meta = storyModule.default as
        | { component?: ComponentType<Record<string, unknown>> }
        | undefined;
      const Render =
        typeof story === "function"
          ? story
          : (story?.render ?? meta?.component);

      if (Render) {
        setPreview(() => Render);
        setPreviewProps(typeof story === "object" ? (story.args ?? {}) : {});
      }

      return undefined;
    });

    return () => {
      active = false;
    };
  }, [component]);

  return (
    <div className="component-preview-container group relative w-full">
      <div className="preview not-prose border-separator relative flex min-h-[350px] w-full items-center justify-center overflow-hidden rounded-t-xl border-t border-r border-l p-4 sm:p-10">
        {Preview ? (
          <Preview {...previewProps} />
        ) : (
          <div className="bg-default size-8 animate-pulse rounded-full" />
        )}
      </div>
      <ComponentPreviewCode code={code} />
    </div>
  );
}
