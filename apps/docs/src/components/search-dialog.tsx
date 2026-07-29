"use client";

/* oxlint-disable jsx-a11y/no-autofocus -- Opening the search dialog should focus its query input. */

import type { ComponentProps } from "react";
import { useMemo } from "react";

import { useRouter } from "next/navigation";

import { Kbd } from "@thenamespace/uikit";
import { useDocsSearch } from "fumadocs-core/search/client";
import type { SearchItemType, SharedProps } from "fumadocs-ui/components/dialog/search";
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogList,
  SearchDialogOverlay,
  useSearch,
} from "fumadocs-ui/components/dialog/search";
import { ArrowRight, Book, BookOpen, PaintBucket, Palette, Rocket } from "lucide-react";

export default function CustomSearchDialog(props: SharedProps) {
  const { query, search, setSearch } = useDocsSearch({ type: "fetch" });
  const router = useRouter();
  const { onOpenChange, ...rest } = props;
  const suggestions = useMemo<SearchItemType[]>(
    () =>
      [
        [
          "Introduction",
          "/docs/getting-started",
          <BookOpen className="size-4" key="introduction" />,
        ],
        [
          "Quick Start",
          "/docs/getting-started/quick-start",
          <Rocket className="size-4" key="quick-start" />,
        ],
        [
          "Design Principles",
          "/docs/getting-started/design-principles",
          <Book className="size-4" key="design-principles" />,
        ],
        ["Colors", "/docs/getting-started/colors", <PaintBucket className="size-4" key="colors" />],
        ["Theming", "/docs/getting-started/theming", <Palette className="size-4" key="theming" />],
      ].map(([title, url, icon]) => ({
        id: `suggestion-${url}`,
        node: (
          <div className="inline-flex items-center gap-2">
            {icon}
            <span>{title}</span>
          </div>
        ),
        onSelect: () => router.push(url as string),
        type: "action" as const,
      })),
    [router],
  );
  const queryData = Array.isArray(query.data) ? query.data : [];
  const normalizedSearch = search.trim().toLowerCase();
  const matchingPage = queryData.find((item) => {
    if (item.type !== "page") return false;

    return stripSearchMarkup(item.content).toLowerCase().startsWith(normalizedSearch);
  });
  const matchingPageTitle = matchingPage ? stripSearchMarkup(matchingPage.content) : "";
  const quickAction: SearchItemType | undefined =
    normalizedSearch && matchingPage
      ? {
          id: "quick-action",
          node: (
            <div className="text-fd-muted-foreground inline-flex items-center gap-2">
              <ArrowRight className="size-4" />
              <p>
                Jump to <span className="text-fd-foreground font-medium">{matchingPageTitle}</span>
              </p>
            </div>
          ),
          onSelect: () => router.push(matchingPage.url),
          type: "action",
        }
      : undefined;

  return (
    <SearchDialog
      {...rest}
      isLoading={query.isLoading}
      search={search}
      onOpenChange={(open) => {
        onOpenChange?.(open);
        if (!open) setSearch("");
      }}
      onSearchChange={setSearch}
    >
      <SearchDialogOverlay />
      <SearchDialogContent className="bg-surface border-none">
        <SearchDialogHeader className="border-separator border-b">
          <SearchDialogIcon />
          <SearchInput placeholder="What are you searching for?" />
          <SearchClose>ESC</SearchClose>
        </SearchDialogHeader>
        <SearchDialogList
          className="**:aria-selected:bg-default **:aria-selected:text-foreground"
          items={
            search.length === 0
              ? suggestions
              : queryData.length > 0 || quickAction
                ? [...(quickAction ? [quickAction] : []), ...queryData]
                : null
          }
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}

function SearchInput(props: ComponentProps<"input">) {
  const { onSearchChange, search } = useSearch();

  return (
    <input
      {...props}
      autoFocus
      className="placeholder:text-fd-muted-foreground w-0 flex-1 bg-transparent text-lg focus-visible:outline-none"
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  );
}

function SearchClose({
  children,
  className,
  ...props
}: ComponentProps<"kbd"> & { children: string }) {
  const { onOpenChange } = useSearch();

  return (
    <Kbd className={className} onClick={() => onOpenChange(false)} {...props}>
      <Kbd.Content>{children}</Kbd.Content>
    </Kbd>
  );
}

function stripSearchMarkup(value: string) {
  return value.replaceAll("<mark>", "").replaceAll("</mark>", "");
}
