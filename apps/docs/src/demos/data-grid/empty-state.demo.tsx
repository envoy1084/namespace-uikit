"use client";

// @demo-title Empty State
import {
  Add01Icon,
  FolderOpenIcon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { EmptyState as EmptyStateComponent } from "@thenamespace/uikit/empty-state";

function StoryIcon({ icon }: { icon: typeof MoreVerticalIcon }) {
  return <HugeiconsIcon className="size-4" icon={icon} strokeWidth={2} />;
}

type EmptyProject = {
  files: number;
  id: string;
  name: string;
  owner: string;
  updatedAt: string;
};

const emptyProjectColumns: DataGridColumn<EmptyProject>[] = [
  {
    accessorKey: "name",
    cellClassName: "font-medium",
    header: "Project",
    id: "name",
    isRowHeader: true,
  },
  { accessorKey: "owner", header: "Owner", id: "owner" },
  {
    accessorKey: "files",
    align: "center",
    header: "Files",
    id: "files",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    id: "updatedAt",
  },
];

export const DemoEmptyStateExample = () => (
  <div className="flex w-full max-w-4xl flex-col gap-4">
    <h2 className="text-xl font-bold">Projects</h2>
    <DataGrid
      aria-label="Projects"
      columns={emptyProjectColumns}
      data={[]}
      getRowId={(project) => project.id}
      renderEmptyState={() => (
        <div className="py-6">
          <EmptyStateComponent size="sm">
            <EmptyStateComponent.Header>
              <EmptyStateComponent.Media className="border" variant="icon">
                <StoryIcon icon={FolderOpenIcon} />
              </EmptyStateComponent.Media>
              <EmptyStateComponent.Title>
                No Projects Yet
              </EmptyStateComponent.Title>
              <EmptyStateComponent.Description>
                Get started by creating your first project. You can always
                import existing projects later.
              </EmptyStateComponent.Description>
            </EmptyStateComponent.Header>
            <EmptyStateComponent.Content className="flex-row gap-2">
              <Button variant="outline">
                <StoryIcon icon={Add01Icon} />
                Create Project
              </Button>
            </EmptyStateComponent.Content>
          </EmptyStateComponent>
        </div>
      )}
    />
  </div>
);
