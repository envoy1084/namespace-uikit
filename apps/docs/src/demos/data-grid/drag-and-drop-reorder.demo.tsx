"use client";

// @demo-title Drag And Drop Reorder
import { useState } from "react";

import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { Chip } from "@thenamespace/uikit/chip";

type Task = {
  assignee: string;
  id: string;
  priority: "high" | "low" | "medium";
  status: "done" | "in-progress" | "todo";
  title: string;
};

const tasks: Task[] = [
  {
    assignee: "Olivia",
    id: "task-1",
    priority: "high",
    status: "in-progress",
    title: "Design system audit",
  },
  {
    assignee: "Jackson",
    id: "task-2",
    priority: "high",
    status: "todo",
    title: "API rate limiting",
  },
  {
    assignee: "Isabella",
    id: "task-3",
    priority: "medium",
    status: "in-progress",
    title: "Onboarding flow redesign",
  },
  {
    assignee: "William",
    id: "task-4",
    priority: "high",
    status: "todo",
    title: "Database migration script",
  },
  {
    assignee: "Sofia",
    id: "task-5",
    priority: "low",
    status: "done",
    title: "Unit test coverage report",
  },
  {
    assignee: "Liam",
    id: "task-6",
    priority: "medium",
    status: "todo",
    title: "Performance profiling",
  },
  {
    assignee: "Emma",
    id: "task-7",
    priority: "medium",
    status: "in-progress",
    title: "Accessibility audit",
  },
  {
    assignee: "Noah",
    id: "task-8",
    priority: "low",
    status: "done",
    title: "CI pipeline optimization",
  },
];

const priorityColor = {
  high: "danger",
  low: "default",
  medium: "warning",
} as const;

const taskStatusColor = {
  done: "success",
  "in-progress": "warning",
  todo: "default",
} as const;

const taskStatusLabel = {
  done: "Done",
  "in-progress": "In Progress",
  todo: "To Do",
} as const;

const taskColumns: DataGridColumn<Task>[] = [
  {
    accessorKey: "title",
    header: "Task",
    id: "title",
    isRowHeader: true,
  },
  {
    accessorKey: "priority",
    cell: (task) => (
      <Chip color={priorityColor[task.priority]} size="sm" variant="soft">
        <Chip.Label className="capitalize">{task.priority}</Chip.Label>
      </Chip>
    ),
    header: "Priority",
    id: "priority",
  },
  { accessorKey: "assignee", header: "Assignee", id: "assignee" },
  {
    accessorKey: "status",
    cell: (task) => (
      <Chip color={taskStatusColor[task.status]} size="sm" variant="soft">
        <Chip.Label>{taskStatusLabel[task.status]}</Chip.Label>
      </Chip>
    ),
    header: "Status",
    id: "status",
  },
];

export const DemoDragAndDropReorderExample = function Demo() {
  const [data, setData] = useState(tasks);
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <p className="text-muted text-sm">
        Drag rows to reorder. Use keyboard (Enter to grab, arrows to move, Enter
        to drop).
      </p>
      <DataGrid
        aria-label="Task backlog"
        columns={taskColumns}
        data={data}
        getRowId={(task) => task.id}
        variant="primary"
        onReorder={(event) => setData(event.reorderedData)}
      />
    </div>
  );
};
