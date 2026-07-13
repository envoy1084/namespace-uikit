"use client";

// @demo-title Sizes
import { EmptyState } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

function SizesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="flex flex-col gap-2" key={size}>
          <span className="text-muted text-center text-xs">{size}</span>
          <div className="border-border w-[300px] rounded-2xl border border-dashed">
            <EmptyState size={size}>
              <EmptyState.Header>
                <EmptyState.Media variant="icon">
                  <Icon icon="lucide:folder-open" />
                </EmptyState.Media>
                <EmptyState.Title>No Projects Yet</EmptyState.Title>
                <EmptyState.Description>
                  You haven&apos;t created any projects yet. Get started by
                  creating your first project.
                </EmptyState.Description>
              </EmptyState.Header>
              <EmptyState.Content className="flex-row gap-2">
                <Button size={size}>Create Project</Button>
                <Button size={size} variant="outline">
                  Import Project
                </Button>
              </EmptyState.Content>
            </EmptyState>
          </div>
        </div>
      ))}
    </div>
  );
}

export const ProSizesExample = () => <SizesDemo />;
