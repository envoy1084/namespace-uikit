"use client";

// @demo-title Full Height
import { EmptyState } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

function FullHeightDemo() {
  return (
    <div className="border-border flex h-[400px] w-[500px] items-center justify-center rounded-2xl border border-dashed">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Media variant="icon">
            <Icon icon="lucide:user" />
          </EmptyState.Media>
          <EmptyState.Title>No Results Found</EmptyState.Title>
          <EmptyState.Description className="max-w-xs text-pretty">
            We couldn&apos;t find anything matching your search. Try adjusting
            your filters.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content>
          <Button size="sm" variant="outline">
            Clear Filters
          </Button>
        </EmptyState.Content>
      </EmptyState>
    </div>
  );
}

export const ProFullHeightExample = () => <FullHeightDemo />;
