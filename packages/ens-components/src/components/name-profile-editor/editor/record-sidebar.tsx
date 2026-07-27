"use client";

import type { NameProfileEditorCategory } from "#/components/name-profile-editor/editor/types";

import { Button, cn } from "@thenamespace/uikit";

import { nameProfileEditorCategories } from "#/components/name-profile-editor/editor/catalog";

export function RecordSidebar({
  activeCategory,
  counts,
  onChange,
}: {
  activeCategory: NameProfileEditorCategory;
  counts: Readonly<Record<NameProfileEditorCategory, number>>;
  onChange: (category: NameProfileEditorCategory) => void;
}) {
  return (
    <nav
      aria-label="Profile record categories"
      className="flex gap-1 overflow-x-auto pb-1 md:w-36 md:shrink-0 md:flex-col md:overflow-visible md:pb-0"
    >
      {nameProfileEditorCategories.map((category) => {
        const isActive = category.id === activeCategory;
        return (
          <Button
            key={category.id}
            className={
              cn(
                "h-10 min-w-fit justify-between rounded-xl px-3 text-sm",
                isActive && "bg-default text-foreground",
              ) ?? ""
            }
            size="sm"
            variant={isActive ? "secondary" : "ghost"}
            onPress={() => onChange(category.id)}
          >
            {category.label}
            {counts[category.id] > 0 && (
              <span
                className={cn(
                  "ml-2 min-w-5 rounded-full px-1.5 text-center text-[11px]",
                  isActive
                    ? "bg-background text-foreground"
                    : "bg-default text-muted",
                )}
              >
                {counts[category.id]}
              </span>
            )}
          </Button>
        );
      })}
    </nav>
  );
}
