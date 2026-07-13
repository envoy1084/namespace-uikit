"use client";

// @demo-title Project Board
import { Add01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Kanban,
  useKanban,
  useKanbanColumn,
  type UseKanbanReturn,
} from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";
import { ProgressBar } from "@thenamespace/uikit/progress-bar";

const people: Record<string, string> = {
  Alex: "orange",
  Diego: "black",
  Emily: "white",
  Jake: "green",
  Maria: "red",
  Sam: "purple",
};

const avatar = (name: string) =>
  `/assets/avatars/${people[name] ?? "blue"}.jpg`;

type ProjectStatus = "Backlog" | "Done" | "In Progress" | "In Review" | "To Do";

interface ProjectTask {
  assignees: { avatar: string; name: string }[];
  category: string;
  categoryColor: string;
  dueDate?: string;
  id: string;
  status: ProjectStatus;
  subtasksCompleted?: number;
  subtasksTotal?: number;
  title: string;
}

const projectAvatars = {
  Alex: "/assets/avatars/orange.jpg",
  Emily: "/assets/avatars/white.jpg",
  Jake: "/assets/avatars/black.jpg",
  Maria: "/assets/avatars/green.jpg",
  Sam: "/assets/avatars/red.jpg",
  Sarah: "/assets/avatars/orange.jpg",
} as const;

const projectAssignee = (name: keyof typeof projectAvatars) => ({
  avatar: projectAvatars[name],
  name,
});

const projectTasks: ProjectTask[] = [
  {
    assignees: [projectAssignee("Sam")],
    category: "Research",
    categoryColor: "#8b5cf6",
    id: "p1",
    status: "Backlog",
    title: "Research competitor onboarding patterns",
  },
  {
    assignees: [projectAssignee("Alex")],
    category: "Engineering",
    categoryColor: "#3b82f6",
    id: "p2",
    status: "Backlog",
    title: "Audit analytics event naming",
  },
  {
    assignees: [projectAssignee("Emily"), projectAssignee("Maria")],
    category: "UX",
    categoryColor: "#ef4444",
    dueDate: "Jun 18",
    id: "p3",
    status: "To Do",
    title: "Design empty states for dashboard widgets",
  },
  {
    assignees: [projectAssignee("Jake"), projectAssignee("Sarah")],
    category: "Engineering",
    categoryColor: "#3b82f6",
    dueDate: "Jun 20",
    id: "p4",
    status: "To Do",
    title: "Set up CI/CD for staging environment",
  },
  {
    assignees: [projectAssignee("Maria")],
    category: "UX",
    categoryColor: "#ef4444",
    dueDate: "Jun 15",
    id: "p5",
    status: "In Progress",
    subtasksCompleted: 3,
    subtasksTotal: 7,
    title: "Redesign onboarding flow",
  },
  {
    assignees: [projectAssignee("Jake")],
    category: "Engineering",
    categoryColor: "#3b82f6",
    id: "p6",
    status: "In Progress",
    subtasksCompleted: 3,
    subtasksTotal: 5,
    title: "API rate limiting implementation",
  },
  {
    assignees: [projectAssignee("Sam")],
    category: "Research",
    categoryColor: "#8b5cf6",
    id: "p7",
    status: "In Progress",
    title: "Create user interview script for v2.5",
  },
  {
    assignees: [projectAssignee("Sarah"), projectAssignee("Emily")],
    category: "UX",
    categoryColor: "#ef4444",
    id: "p8",
    status: "In Review",
    title: "Push notification permission flow",
  },
  {
    assignees: [
      projectAssignee("Jake"),
      projectAssignee("Alex"),
      projectAssignee("Maria"),
    ],
    category: "Engineering",
    categoryColor: "#3b82f6",
    id: "p9",
    status: "In Review",
    title: "Database migration script for v2.4",
  },
  {
    assignees: [projectAssignee("Sam")],
    category: "Docs",
    categoryColor: "#06b6d4",
    id: "p10",
    status: "In Review",
    title: "Write release notes for v2.4",
  },
  {
    assignees: [projectAssignee("Maria")],
    category: "Engineering",
    categoryColor: "#3b82f6",
    id: "p11",
    status: "Done",
    title: "Implement dark mode toggle",
  },
  {
    assignees: [projectAssignee("Emily"), projectAssignee("Sarah")],
    category: "Engineering",
    categoryColor: "#3b82f6",
    id: "p12",
    status: "Done",
    title: "Fix pagination bug on search results",
  },
  {
    assignees: [projectAssignee("Alex")],
    category: "UX",
    categoryColor: "#ef4444",
    id: "p13",
    status: "Done",
    title: "Add skeleton loaders to dashboard",
  },
];

const projectIndicator: Record<ProjectStatus, string> = {
  Backlog: "bg-default",
  Done: "bg-success",
  "In Progress": "bg-warning",
  "In Review": "bg-danger",
  "To Do": "bg-accent",
};

function ProjectColumn({
  column,
  kanban,
}: {
  column: ProjectStatus;
  kanban: UseKanbanReturn<ProjectTask>;
}) {
  const { dragAndDropHooks, items } = useKanbanColumn(kanban, column);
  return (
    <Kanban.Column>
      <Kanban.ColumnHeader>
        <Kanban.ColumnIndicator className={projectIndicator[column]} />
        <Kanban.ColumnTitle>{column}</Kanban.ColumnTitle>
        <Kanban.ColumnCount>{items.length}</Kanban.ColumnCount>
        <Kanban.ColumnActions>
          <Button isIconOnly aria-label="Add task" size="sm" variant="ghost">
            <HugeiconsIcon icon={Add01Icon} />
          </Button>
          <Button
            isIconOnly
            aria-label="More options"
            size="sm"
            variant="ghost"
          >
            <HugeiconsIcon icon={MoreHorizontalIcon} />
          </Button>
        </Kanban.ColumnActions>
      </Kanban.ColumnHeader>
      <Kanban.ColumnBody>
        <Kanban.ScrollShadow className="max-h-[480px]">
          <Kanban.CardList
            aria-label={column}
            dragAndDropHooks={dragAndDropHooks}
            items={items}
            renderEmptyState={() => "No tasks."}
          >
            {(task) => (
              <Kanban.Card textValue={task.title}>
                <span
                  className={`text-foreground leading-snug font-semibold ${column === "Done" ? "line-through opacity-60" : ""}`}
                >
                  {task.title}
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: task.categoryColor }}
                  />
                  <span className="text-muted text-xs">{task.category}</span>
                </span>
                {task.subtasksTotal != null ? (
                  <div className="flex items-center gap-2">
                    <ProgressBar
                      aria-label="Subtasks"
                      className="flex-1"
                      color="accent"
                      size="sm"
                      value={
                        (task.subtasksCompleted! / task.subtasksTotal) * 100
                      }
                    >
                      <ProgressBar.Track>
                        <ProgressBar.Fill />
                      </ProgressBar.Track>
                    </ProgressBar>
                    <span className="text-muted text-xs tabular-nums">
                      {task.subtasksCompleted}/{task.subtasksTotal}
                    </span>
                  </div>
                ) : null}
                <div className="mt-0.5 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {task.assignees.slice(0, 3).map((person) => (
                      <Avatar
                        className="ring-background size-5 ring-2"
                        key={person.name}
                        size="sm"
                      >
                        <Avatar.Image alt={person.name} src={person.avatar} />
                        <Avatar.Fallback>{person.name[0]}</Avatar.Fallback>
                      </Avatar>
                    ))}
                  </div>
                  {task.dueDate ? (
                    <span className="text-muted text-xs">{task.dueDate}</span>
                  ) : null}
                </div>
              </Kanban.Card>
            )}
          </Kanban.CardList>
        </Kanban.ScrollShadow>
      </Kanban.ColumnBody>
    </Kanban.Column>
  );
}

function ProjectBoardDemo() {
  const kanban = useKanban({
    getColumn: (task) => task.status,
    initialItems: projectTasks,
    setColumn: (task, status) => ({ ...task, status: status as ProjectStatus }),
  });
  return (
    <Kanban>
      {(["Backlog", "To Do", "In Progress", "In Review", "Done"] as const).map(
        (column) => (
          <ProjectColumn column={column} kanban={kanban} key={column} />
        ),
      )}
    </Kanban>
  );
}

export const DemoProjectBoardExample = () => <ProjectBoardDemo />;
