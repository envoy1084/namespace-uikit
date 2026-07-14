"use client";

import type {
  SearchItemType,
  SharedProps,
} from "fumadocs-ui/components/dialog/search";

import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

import { Button, Kbd } from "@thenamespace/uikit";
import { useDocsSearch } from "fumadocs-core/search/client";
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogList,
  SearchDialogOverlay,
  useSearch,
} from "fumadocs-ui/components/dialog/search";
import { Blocks, BookOpen, Palette, Rocket, X } from "lucide-react";

export default function CustomSearchDialog(props: SharedProps) {
  const { query, search, setSearch } = useDocsSearch({ type: "fetch" });
  const router = useRouter();
  const { onOpenChange, ...rest } = props;
  const suggestions: SearchItemType[] = [
    ["Introduction", "/docs/getting-started", <BookOpen className="size-4" />],
    [
      "Quick Start",
      "/docs/getting-started/quick-start",
      <Rocket className="size-4" />,
    ],
    ["All Components", "/docs/components", <Blocks className="size-4" />],
    [
      "Theming",
      "/docs/getting-started/theming",
      <Palette className="size-4" />,
    ],
  ].map(([title, url, icon]) => ({
    id: `suggestion-${url}`,
    node: (
      <div className="inline-flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
    ),
    onSelect: () => router.push(url as string),
    type: "action",
  }));

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
        <SearchDialogHeader className="border-separator flex items-center gap-2 border-b">
          <SearchDialogIcon />
          <SearchInput placeholder="Search Namespace UIKit documentation" />
          <SearchClose />
        </SearchDialogHeader>
        <SearchDialogList
          className="**:aria-selected:bg-default **:aria-selected:text-foreground"
          items={
            search.length === 0
              ? suggestions
              : query.data === "empty"
                ? null
                : query.data
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

function SearchClose() {
  const { onOpenChange } = useSearch();

  return (
    <Button
      aria-label="Close search"
      className="h-8 shrink-0 gap-1.5 px-2"
      size="sm"
      variant="ghost"
      onPress={() => onOpenChange(false)}
    >
      <X aria-hidden="true" className="size-4 sm:hidden" />
      <Kbd className="pointer-events-none hidden sm:inline-flex">
        <Kbd.Content>ESC</Kbd.Content>
      </Kbd>
    </Button>
  );
}
