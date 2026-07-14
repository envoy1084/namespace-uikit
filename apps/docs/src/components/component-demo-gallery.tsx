"use client";

import type { ComponentType } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { SearchField, Sidebar, Spinner } from "@thenamespace/uikit";
import LinkRoot from "fumadocs-core/link";
import { ArrowUpRight } from "lucide-react";

import { galleryDemos } from "@/demos/gallery";

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
  const previewRef = useRef<HTMLDivElement>(null);
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

    if (previewRef.current) {
      previewRef.current.scrollLeft = 0;
      previewRef.current.scrollTop = 0;
    }
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
    <div className="bg-background border-border flex min-h-[42rem] w-full flex-1 overflow-hidden rounded-2xl border text-start">
      <Sidebar.Provider
        className="!min-h-0 max-md:flex-col"
        collapsible="none"
        toggleShortcut={false}
      >
        <Sidebar className="border-border !static !h-auto !min-h-0 !w-60 !min-w-60 border-r shadow-none max-md:!h-56 max-md:!w-full max-md:!min-w-0 max-md:border-r-0 max-md:border-b">
          <Sidebar.Header className="border-border gap-3 border-b !p-3">
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
          </Sidebar.Header>
          <Sidebar.Content className="!px-2 !pb-2">
            <Sidebar.Group>
              <Sidebar.Menu aria-label="Component demos" showGuideLines={false}>
                {filteredDemos.map((item) => {
                  const isSelected = item.component === selectedDemo.component;

                  return (
                    <Sidebar.MenuItem
                      key={item.component}
                      id={item.component}
                      isCurrent={isSelected}
                      textValue={componentLabel(item.component)}
                      onAction={() => setSelectedComponent(item.component)}
                    >
                      <Sidebar.MenuLabel>
                        {componentLabel(item.component)}
                      </Sidebar.MenuLabel>
                    </Sidebar.MenuItem>
                  );
                })}
                {filteredDemos.length === 0 ? (
                  <p className="text-muted px-2 py-6 text-center text-xs">
                    No components found.
                  </p>
                ) : null}
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar>

        <section
          className="flex min-h-0 min-w-0 flex-1 flex-col"
          data-gallery-component={selectedDemo.component}
          data-gallery-status={Demo ? "ready" : loadError ? "error" : "loading"}
        >
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
          <div
            ref={previewRef}
            className="relative min-h-0 min-w-0 flex-1 overflow-auto"
            data-gallery-preview=""
          >
            {Demo ? (
              <div className="flex min-h-full w-max min-w-full items-center justify-center p-4 sm:p-10">
                <div className="flex w-full min-w-0 items-center justify-center">
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
                <Spinner
                  aria-label={`Loading ${selectedDemo.component} demo`}
                />
              </div>
            )}
          </div>
        </section>
      </Sidebar.Provider>
    </div>
  );
}
