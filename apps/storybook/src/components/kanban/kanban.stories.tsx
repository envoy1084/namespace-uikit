import type { Meta, StoryObj } from "@storybook/react";

import {
  Add01Icon,
  Attachment01Icon,
  CancelCircleIcon,
  CircleCheckIcon,
  Clock01Icon,
  Comment01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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

interface Ticket {
  assignees?: { avatar: string; name: string }[];
  attachments?: number;
  comments?: number;
  description: string;
  id: string;
  image?: string;
  progress?: number;
  status: "Closed" | "In Progress" | "Open";
  tags?: {
    color: "accent" | "danger" | "success" | "warning";
    label: string;
  }[];
  title: string;
}

const ticketAvatars = {
  Anna: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
  Dave: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
  Lena: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
  Mike: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/white.jpg",
  Nina: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
  Omar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
} as const;
const assignee = (name: keyof typeof ticketAvatars) => ({
  avatar: ticketAvatars[name],
  name,
});
const tickets: Ticket[] = [
  {
    assignees: [assignee("Anna"), assignee("Mike")],
    attachments: 3,
    comments: 8,
    description: "Integrate Third-Party API Services",
    id: "1",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg",
    progress: 0,
    status: "Open",
    tags: [
      { color: "success", label: "Low Priority" },
      { color: "warning", label: "In Progress" },
    ],
    title: "Develop API for User Profiles",
  },
  {
    assignees: [assignee("Lena")],
    comments: 3,
    description: "Redesign the login flow for better conversion",
    id: "2",
    status: "Open",
    tags: [{ color: "danger", label: "High Priority" }],
    title: "Login Page Redesign",
  },
  {
    assignees: [assignee("Dave"), assignee("Nina")],
    attachments: 2,
    comments: 12,
    description: "Create reusable component library for the design system",
    id: "3",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg",
    progress: 45,
    status: "In Progress",
    tags: [
      { color: "accent", label: "Design" },
      { color: "warning", label: "In Progress" },
    ],
    title: "Component Library Setup",
  },
  {
    assignees: [assignee("Omar")],
    comments: 5,
    description: "Implement dark mode with system preference detection",
    id: "4",
    progress: 20,
    status: "Open",
    tags: [{ color: "accent", label: "Feature" }],
    title: "Feature: Dark Mode",
  },
  {
    assignees: [assignee("Mike"), assignee("Anna"), assignee("Lena")],
    attachments: 4,
    comments: 15,
    description: "Fix intermittent connection errors on the staging database",
    id: "5",
    progress: 70,
    status: "In Progress",
    tags: [
      { color: "danger", label: "Bug" },
      { color: "danger", label: "High Priority" },
    ],
    title: "Database Connection Error",
  },
  {
    assignees: [assignee("Nina")],
    comments: 2,
    description: "Optimize lazy loading and reduce initial bundle size",
    id: "6",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg",
    progress: 100,
    status: "Closed",
    tags: [{ color: "success", label: "Done" }],
    title: "Performance Optimization",
  },
  {
    assignees: [assignee("Dave")],
    description: "Broken homepage link returns 404 for new visitors",
    id: "7",
    status: "Open",
    tags: [{ color: "danger", label: "Bug" }],
    title: "Broken Link on Homepage",
  },
  {
    assignees: [assignee("Omar"), assignee("Anna")],
    attachments: 1,
    comments: 7,
    description: "Allow users to export reports and data as PDF files",
    id: "8",
    progress: 100,
    status: "Closed",
    tags: [
      { color: "accent", label: "Feature" },
      { color: "success", label: "Done" },
    ],
    title: "Feature: Export to PDF",
  },
];

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

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <>
      {ticket.image ? (
        <img
          alt=""
          className="h-32 w-full rounded-lg object-cover"
          draggable={false}
          src={ticket.image}
        />
      ) : null}
      <div className="flex flex-col gap-2">
        <span className="text-foreground leading-snug font-semibold">
          {ticket.title}
        </span>
        <span className="text-muted line-clamp-2 text-sm">
          {ticket.description}
        </span>
        {ticket.tags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {ticket.tags.map((tag) => (
              <Chip color={tag.color} key={tag.label} size="sm" variant="soft">
                {tag.label}
              </Chip>
            ))}
          </div>
        ) : null}
        {ticket.progress != null ? (
          <div className="flex items-center gap-2">
            <ProgressBar
              aria-label="Progress"
              className="flex-1"
              color="accent"
              size="sm"
              value={ticket.progress}
            >
              <ProgressBar.Track>
                <ProgressBar.Fill />
              </ProgressBar.Track>
            </ProgressBar>
            <span className="text-muted text-xs tabular-nums">
              {ticket.progress}%
            </span>
          </div>
        ) : null}
        {ticket.assignees || ticket.comments || ticket.attachments ? (
          <div className="mt-0.5 flex items-center justify-between">
            {ticket.assignees?.length ? (
              <div className="flex -space-x-2">
                {ticket.assignees.slice(0, 3).map((person) => (
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
            ) : (
              <span />
            )}
            {ticket.comments || ticket.attachments ? (
              <div className="text-muted flex items-center gap-2.5 text-xs">
                {ticket.comments ? (
                  <span className="flex items-center gap-1">
                    <HugeiconsIcon
                      aria-hidden
                      className="size-3.5"
                      icon={Comment01Icon}
                    />
                    {ticket.comments}
                  </span>
                ) : null}
                {ticket.attachments ? (
                  <span className="flex items-center gap-1">
                    <HugeiconsIcon
                      aria-hidden
                      className="size-3.5"
                      icon={Attachment01Icon}
                    />
                    {ticket.attachments}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}

function TicketColumn({
  column,
  kanban,
}: {
  column: Ticket["status"];
  kanban: UseKanbanReturn<Ticket>;
}) {
  const { renderDropIndicator } = useKanbanDropIndicator({
    renderIndicator: (target) => <Kanban.DropIndicator target={target} />,
  });
  const { dragAndDropHooks, items } = useKanbanColumn(kanban, column, {
    renderDropIndicator,
  });
  const indicator = {
    Closed: { color: "text-danger", icon: CancelCircleIcon },
    "In Progress": { color: "text-warning", icon: Clock01Icon },
    Open: { color: "text-success", icon: CircleCheckIcon },
  }[column];
  return (
    <Kanban.Column>
      <Kanban.ColumnHeader>
        <Kanban.ColumnIndicator className={indicator.color}>
          <HugeiconsIcon aria-hidden icon={indicator.icon} />
        </Kanban.ColumnIndicator>
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
        <Kanban.ScrollShadow className="max-h-[600px]">
          <Kanban.CardList
            aria-label={column}
            dragAndDropHooks={dragAndDropHooks}
            items={items}
          >
            {(ticket) => (
              <Kanban.Card
                className="[&>[data-slot=kanban-card-content]]:gap-0 [&>[data-slot=kanban-card-content]]:p-0"
                textValue={`${ticket.title} ${ticket.description}`}
              >
                <TicketCard ticket={ticket} />
              </Kanban.Card>
            )}
          </Kanban.CardList>
        </Kanban.ScrollShadow>
        <div className="p-2">
          <Button fullWidth variant="outline">
            <HugeiconsIcon icon={Add01Icon} />
            Add a task
          </Button>
        </div>
      </Kanban.ColumnBody>
    </Kanban.Column>
  );
}

function DefaultBoard() {
  const kanban = useKanban({
    getColumn: (ticket) => ticket.status,
    initialItems: tickets,
    setColumn: (ticket, status) => ({
      ...ticket,
      status: status as Ticket["status"],
    }),
  });
  return (
    <Kanban>
      {(["Open", "In Progress", "Closed"] as const).map((column) => (
        <TicketColumn column={column} kanban={kanban} key={column} />
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
