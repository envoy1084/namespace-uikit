"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";

import {
  Button,
  SearchField,
  ScrollShadow,
  Spinner,
} from "@thenamespace/uikit";
import LinkRoot from "fumadocs-core/link";
import { ArrowUpRight } from "lucide-react";

import { galleryDemos } from "@/demos/gallery";
import { cn } from "@/utils/cn";

function componentLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ComponentDemoGallery() {
  const [selectedComponent, setSelectedComponent] = useState("button");
  const [query, setQuery] = useState("");
  const [Demo, setDemo] = useState<ComponentType | null>(null);
  const [loadError, setLoadError] = useState(false);
  const selectedDemo =
    galleryDemos.find((item) => item.component === selectedComponent) ??
    galleryDemos[0]!;
  const filteredDemos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase().replaceAll(/\s+/g, "-");

    if (!normalizedQuery) return galleryDemos;

    return galleryDemos.filter((item) =>
      item.component.includes(normalizedQuery),
    );
  }, [query]);

  useEffect(() => {
    let isCurrent = true;

    setDemo(null);
    setLoadError(false);
    void (async () => {
      try {
        const component = await selectedDemo.loader();

        if (isCurrent) setDemo(() => component);
      } catch {
        if (isCurrent) setLoadError(true);
      }
    })();

    return () => {
      isCurrent = false;
    };
  }, [selectedDemo]);

  return (
    <div className="bg-background border-border grid h-[min(42rem,calc(100dvh-10rem))] min-h-[32rem] w-full overflow-hidden rounded-2xl border text-start md:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="border-border flex min-h-0 flex-col border-b md:border-r md:border-b-0">
        <div className="border-border space-y-3 border-b p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Components</p>
            <span className="bg-default text-muted rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums">
              {galleryDemos.length}
            </span>
          </div>
          <SearchField
            fullWidth
            aria-label="Find a component"
            value={query}
            onChange={setQuery}
          >
            <SearchField.Group className="w-full">
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Find a component…" />
              <SearchField.ClearButton className="self-center" />
            </SearchField.Group>
          </SearchField>
        </div>
        <ScrollShadow
          hideScrollBar
          className="max-h-48 min-h-0 flex-1 p-2 md:max-h-none"
          size={24}
        >
          <div className="grid gap-0.5">
            {filteredDemos.map((item) => {
              const isSelected = item.component === selectedDemo.component;

              return (
                <Button
                  key={item.component}
                  className={cn(
                    "h-8 w-full justify-start rounded-lg px-2.5 text-xs",
                    isSelected && "bg-default text-foreground",
                  )}
                  size="sm"
                  variant="ghost"
                  onPress={() => setSelectedComponent(item.component)}
                >
                  {componentLabel(item.component)}
                </Button>
              );
            })}
            {filteredDemos.length === 0 ? (
              <p className="text-muted px-2 py-6 text-center text-xs">
                No components found.
              </p>
            ) : null}
          </div>
        </ScrollShadow>
      </aside>

      <section className="flex min-h-0 min-w-0 flex-col">
        <div className="border-border flex min-h-14 items-center justify-between gap-3 border-b px-4 py-3">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">
              {componentLabel(selectedDemo.component)}
            </h2>
            <p className="text-muted truncate font-mono text-[10px]">
              {selectedDemo.demo}
            </p>
          </div>
          <LinkRoot
            className="text-muted hover:text-foreground flex shrink-0 items-center gap-1 text-xs transition-colors"
            href={`/docs/components/${selectedDemo.component}`}
          >
            Docs
            <ArrowUpRight className="size-3.5" />
          </LinkRoot>
        </div>
        <div className="relative min-h-0 min-w-0 flex-1 overflow-auto">
          {Demo ? (
            <div className="grid min-h-full w-max min-w-full place-items-center p-4 sm:p-6">
              <div className="max-w-full min-w-0">
                <Demo />
              </div>
            </div>
          ) : loadError ? (
            <div className="grid min-h-full min-w-full place-items-center p-4 sm:p-6">
              <div className="border-danger/30 bg-danger-soft text-danger-soft-foreground rounded-xl border px-4 py-3 text-sm">
                This demo could not be loaded.
              </div>
            </div>
          ) : (
            <div className="grid min-h-full min-w-full place-items-center p-4 sm:p-6">
              <Spinner aria-label={`Loading ${selectedDemo.component} demo`} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
