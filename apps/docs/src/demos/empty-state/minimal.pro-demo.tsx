"use client";

// @demo-title Minimal
import { EmptyState } from "@thenamespace/uikit";

function MinimalDemo() {
  return (
    <div className="w-[420px]">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Title>Nothing here yet</EmptyState.Title>
          <EmptyState.Description>
            Content will appear here once it becomes available.
          </EmptyState.Description>
        </EmptyState.Header>
      </EmptyState>
    </div>
  );
}

export const ProMinimalExample = () => <MinimalDemo />;
