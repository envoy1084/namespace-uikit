"use client";

// @demo-title Outline
import { EmptyState } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

function OutlineDemo() {
  return (
    <div className="w-[420px]">
      <EmptyState className="border-border rounded-2xl border border-dashed">
        <EmptyState.Header>
          <EmptyState.Media variant="icon">
            <Icon icon="lucide:cloud" />
          </EmptyState.Media>
          <EmptyState.Title>Cloud Storage Empty</EmptyState.Title>
          <EmptyState.Description>
            Upload files to your cloud storage to access them anywhere.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content>
          <Button size="sm" variant="outline">
            Upload Files
          </Button>
        </EmptyState.Content>
      </EmptyState>
    </div>
  );
}

export const ProOutlineExample = () => <OutlineDemo />;
