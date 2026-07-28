"use client";

import type { NameProfileEditorCategory } from "#/components/name-profile-editor/editor/types";

import { Button, cn } from "@thenamespace/uikit";

import { nameProfileEditorCategories } from "#/components/name-profile-editor/editor/catalog";

export function RecordSidebar({
  activeCategory,
  onChange,
}: {
  activeCategory: NameProfileEditorCategory;
  onChange: (category: NameProfileEditorCategory) => void;
}) {
  return (
    <nav
      aria-label="Profile record categories"
      className="flex gap-1 overflow-x-auto pb-1 @min-[400px]:w-24 @min-[400px]:shrink-0 @min-[400px]:flex-col @min-[400px]:overflow-visible @min-[400px]:pb-0 @min-[580px]:w-32 @min-[800px]:w-52"
    >
      {nameProfileEditorCategories.map((category) => {
        const isActive = category.id === activeCategory;
        return (
          <Button
            key={category.id}
            className={
              cn(
                "h-12 min-w-fit justify-start rounded-xl px-3 text-base font-normal @min-[800px]:h-16 @min-[800px]:px-4 @min-[800px]:text-xl",
                isActive && "bg-default text-foreground",
              ) ?? ""
            }
            size="sm"
            variant={isActive ? "secondary" : "ghost"}
            onPress={() => onChange(category.id)}
          >
            {category.label}
          </Button>
        );
      })}
    </nav>
  );
}
