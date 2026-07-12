import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "@iconify/react";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { ProgressBar } from "@thenamespace/uikit/progress-bar";

import {
  Kanban,
  useKanban,
  useKanbanColumn,
  useKanbanDropIndicator,
  type KanbanSize,
  type UseKanbanReturn,
} from "./index";

const meta = {
  component: Kanban,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  title: "Components/Kanban",
} satisfies Meta<typeof Kanban>;
export default meta;
type Story = StoryObj<typeof meta>;

interface Task {
  assignees: string[];
  category: string;
  categoryColor: string;
  dueDate?: string;
  id: string;
  priority: "High" | "Low" | "Medium";
  status: string;
  subtasksCompleted?: number;
  subtasksTotal?: number;
  title: string;
}
const people: Record<string, string> = {
  Alex: "orange",
  Diego: "black",
  Emily: "white",
  Jake: "green",
  Maria: "red",
  Sam: "purple",
};
const tasks: Task[] = [
  {
    assignees: ["Diego"],
    category: "Mobile",
    categoryColor: "#3b82f6",
    id: "1",
    priority: "High",
    status: "Open",
    title: "Calendar Blocks",
  },
  {
    assignees: ["Diego"],
    category: "Launch",
    categoryColor: "#8b5cf6",
    dueDate: "Mar 5",
    id: "2",
    priority: "High",
    status: "Open",
    title: "Pro badge on the Expo Go app",
  },
  {
    assignees: ["Maria"],
    category: "Mobile",
    categoryColor: "#ef4444",
    id: "3",
    priority: "Medium",
    status: "Open",
    title: "Bottom Sheet Blocks",
  },
  {
    assignees: ["Diego"],
    category: "Engineering",
    categoryColor: "#3b82f6",
    dueDate: "Mar 29",
    id: "4",
    priority: "High",
    status: "In Progress",
    subtasksCompleted: 3,
    subtasksTotal: 7,
    title: "MorphButton",
  },
  {
    assignees: ["Sam"],
    category: "Block",
    categoryColor: "#f59e0b",
    id: "5",
    priority: "Low",
    status: "In Progress",
    title: "Create Password",
  },
  {
    assignees: ["Sam", "Jake"],
    category: "Mobile",
    categoryColor: "#3b82f6",
    id: "6",
    priority: "Low",
    status: "In Progress",
    title: "OTP Verification",
  },
  {
    assignees: ["Diego"],
    category: "Docs",
    categoryColor: "#06b6d4",
    dueDate: "Apr 5",
    id: "7",
    priority: "High",
    status: "Closed",
    title: "ProgressButton",
  },
  {
    assignees: ["Emily", "Alex"],
    category: "Launch",
    categoryColor: "#8b5cf6",
    id: "8",
    priority: "High",
    status: "Closed",
    title: "Pre-release in-app message",
  },
  {
    assignees: ["Alex"],
    category: "Research",
    categoryColor: "#8b5cf6",
    id: "9",
    priority: "Low",
    status: "Backlog",
    title: "Research competitor onboarding patterns",
  },
  {
    assignees: ["Emily", "Maria"],
    category: "UX",
    categoryColor: "#ef4444",
    dueDate: "Jun 18",
    id: "10",
    priority: "Medium",
    status: "To Do",
    title: "Design empty states for dashboard widgets",
  },
  {
    assignees: ["Jake"],
    category: "Engineering",
    categoryColor: "#3b82f6",
    id: "11",
    priority: "High",
    status: "In Review",
    title: "Database migration script for v2.4",
  },
  {
    assignees: ["Maria"],
    category: "Engineering",
    categoryColor: "#3b82f6",
    id: "12",
    priority: "Medium",
    status: "Done",
    title: "Implement dark mode toggle",
  },
];
const avatar = (name: string) =>
  `https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/${people[name] ?? "blue"}.jpg`;

function TaskCard({
  detailed = false,
  task,
}: {
  detailed?: boolean;
  task: Task;
}) {
  const priorityColor =
    task.priority === "High"
      ? "danger"
      : task.priority === "Medium"
        ? "warning"
        : "success";
  return (
    <>
      <div className="flex items-start gap-2">
        <span
          className="mt-1 size-2.5 shrink-0 rounded-sm"
          style={{ backgroundColor: task.categoryColor }}
        />
        <span className="text-foreground leading-snug font-semibold">
          {task.title}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip color={priorityColor} size="sm" variant="soft">
          {task.priority}
        </Chip>
        {task.assignees.map((name) => (
          <Avatar
            className="ring-background size-5 ring-2"
            key={name}
            size="sm"
          >
            <Avatar.Image alt={name} src={avatar(name)} />
            <Avatar.Fallback>{name[0]}</Avatar.Fallback>
          </Avatar>
        ))}
      </div>
      {detailed ? (
        <span className="flex items-center gap-1.5">
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: task.categoryColor }}
          />
          <span className="text-muted text-xs">{task.category}</span>
        </span>
      ) : null}
      {task.subtasksTotal != null ? (
        <div className="flex items-center gap-2">
          <ProgressBar
            aria-label="Subtasks"
            className="flex-1"
            color="accent"
            size="sm"
            value={(task.subtasksCompleted! / task.subtasksTotal) * 100}
          >
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
          <span className="text-muted text-xs">
            {task.subtasksCompleted}/{task.subtasksTotal}
          </span>
        </div>
      ) : null}
      {task.dueDate ? (
        <span className="text-muted flex items-center gap-1 text-xs">
          <Icon icon="lucide:calendar" />
          {task.dueDate}
        </span>
      ) : null}
    </>
  );
}

function BoardColumn({
  column,
  detailed = false,
  kanban,
  notion = false,
}: {
  column: string;
  detailed?: boolean;
  kanban: UseKanbanReturn<Task>;
  notion?: boolean;
}) {
  const { renderDropIndicator } = useKanbanDropIndicator({
    renderIndicator: (target) => <Kanban.DropIndicator target={target} />,
  });
  const { dragAndDropHooks, items } = useKanbanColumn(kanban, column, {
    renderDropIndicator,
  });
  const indicator =
    column === "Open" || column === "Backlog"
      ? "bg-default"
      : column === "In Progress"
        ? "bg-warning"
        : column === "Closed" || column === "Done"
          ? "bg-success"
          : column === "To Do"
            ? "bg-accent"
            : "bg-danger";
  return (
    <Kanban.Column className={notion ? "gap-0" : undefined}>
      <Kanban.ColumnHeader
        className={
          notion ? "bg-default/40 rounded-t-2xl px-3 py-2.5" : undefined
        }
      >
        <Kanban.ColumnIndicator className={indicator} />
        <Kanban.ColumnTitle>{column}</Kanban.ColumnTitle>
        <Kanban.ColumnCount>{items.length}</Kanban.ColumnCount>
        <Kanban.ColumnActions>
          <Button isIconOnly aria-label="Add task" size="sm" variant="ghost">
            <Icon icon="lucide:plus" />
          </Button>
          <Button
            isIconOnly
            aria-label="More options"
            size="sm"
            variant="ghost"
          >
            <Icon icon="lucide:ellipsis" />
          </Button>
        </Kanban.ColumnActions>
      </Kanban.ColumnHeader>
      <Kanban.ColumnBody className={notion ? "rounded-t-none" : undefined}>
        <Kanban.ScrollShadow className={notion ? undefined : "max-h-[480px]"}>
          <Kanban.CardList
            aria-label={column}
            dragAndDropHooks={dragAndDropHooks}
            items={items}
            renderEmptyState={() => "No tasks yet."}
          >
            {(task) => (
              <Kanban.Card textValue={task.title}>
                <Kanban.DragHandle />{" "}
                <TaskCard detailed={detailed} task={task} />
              </Kanban.Card>
            )}
          </Kanban.CardList>
        </Kanban.ScrollShadow>
        {notion ? (
          <div className="p-2 pt-0">
            <Button fullWidth variant="outline">
              <Icon icon="lucide:plus" />
              New task
            </Button>
          </div>
        ) : null}
      </Kanban.ColumnBody>
    </Kanban.Column>
  );
}

function DefaultBoard() {
  const kanban = useKanban({
    getColumn: (task) => task.status,
    initialItems: tasks.slice(0, 8),
    setColumn: (task, status) => ({ ...task, status }),
  });
  return (
    <Kanban>
      {["Open", "In Progress", "Closed"].map((column) => (
        <BoardColumn column={column} kanban={kanban} key={column} />
      ))}
    </Kanban>
  );
}
export const Default: Story = { render: () => <DefaultBoard /> };

function NotionBoardDemo() {
  const notionTasks = tasks.slice(0, 8).map((task, index) =>
    Object.assign({}, task, {
      status: ["Todo", "In Progress", "To Document", "Done"][index % 4],
    }),
  );
  const kanban = useKanban({
    getColumn: (task) => task.status,
    initialItems: notionTasks,
    setColumn: (task, status) => ({ ...task, status }),
  });
  return (
    <div className="w-full pr-3">
      <Kanban
        className="items-start overflow-visible"
        hideScrollBar
        isEnabled={false}
      >
        {["Todo", "In Progress", "To Document", "Done"].map((column) => (
          <BoardColumn column={column} kanban={kanban} key={column} notion />
        ))}
      </Kanban>
    </div>
  );
}
export const NotionBoard: Story = { render: () => <NotionBoardDemo /> };

function ProjectBoardDemo() {
  const projectTasks = tasks
    .slice(8)
    .concat(tasks.slice(3, 8))
    .map((task, index) =>
      Object.assign({}, task, {
        id: `project-${task.id}`,
        status: ["Backlog", "To Do", "In Progress", "In Review", "Done"][
          index % 5
        ],
      }),
    );
  const kanban = useKanban({
    getColumn: (task) => task.status,
    initialItems: projectTasks,
    setColumn: (task, status) => ({ ...task, status }),
  });
  return (
    <Kanban>
      {["Backlog", "To Do", "In Progress", "In Review", "Done"].map(
        (column) => (
          <BoardColumn column={column} detailed kanban={kanban} key={column} />
        ),
      )}
    </Kanban>
  );
}
export const ProjectBoard: Story = { render: () => <ProjectBoardDemo /> };

function SizedBoard({ size }: { size: KanbanSize }) {
  const kanban = useKanban({
    getColumn: (task) => task.status,
    initialItems: tasks.slice(0, 5),
    setColumn: (task, status) => ({ ...task, status }),
  });
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted text-xs font-medium">{size}</span>
      <Kanban size={size}>
        {["Open", "In Progress"].map((column) => (
          <BoardColumn column={column} kanban={kanban} key={column} />
        ))}
      </Kanban>
    </div>
  );
}
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <SizedBoard key={size} size={size} />
      ))}
    </div>
  ),
};
