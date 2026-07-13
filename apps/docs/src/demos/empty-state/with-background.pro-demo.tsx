"use client";

// @demo-title With Background
import { EmptyState } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

function WithBackgroundDemo() {
  return (
    <div className="w-[420px]">
      <EmptyState className="bg-surface-secondary rounded-2xl">
        <EmptyState.Header>
          <EmptyState.Media
            className="bg-surface-tertiary border"
            variant="icon"
          >
            <Icon icon="lucide:bell" />
          </EmptyState.Media>
          <EmptyState.Title>No Notifications</EmptyState.Title>
          <EmptyState.Description className="max-w-xs text-pretty">
            You&apos;re all caught up. New notifications will appear here.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content>
          <Button variant="outline">Refresh</Button>
        </EmptyState.Content>
      </EmptyState>
    </div>
  );
}

export const ProWithBackgroundExample = () => <WithBackgroundDemo />;
