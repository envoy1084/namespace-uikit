"use client";

// @demo-title Notion Board
import {
  Add01Icon,
  Calendar03Icon,
  FlashIcon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Kanban,
  useKanban,
  useKanbanColumn,
  useKanbanDropIndicator,
  type UseKanbanReturn,
} from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";

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

type NotionStatus = "Done" | "In Progress" | "To Document" | "Todo";

interface NotionTask {
  assignees: { avatar: string; name: string }[];
  categories: string[];
  dueDate?: string;
  epic: string;
  id: string;
  priority: "High" | "Low" | "Medium";
  size: "L" | "M" | "S" | "XL";
  status: NotionStatus;
  title: string;
}

const notionAssignee = (
  name: "Alex" | "Diego" | "Emily" | "Jake" | "Maria" | "Sam",
) => ({ avatar: avatar(name), name });

const notionTasks: NotionTask[] = [
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "Block"],
    epic: "Pro Native (Alpha)",
    id: "n1",
    priority: "High",
    size: "M",
    status: "Todo",
    title: "Calendar Blocks",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Launch", "New Component"],
    dueDate: "Mar 5, 2026",
    epic: "Pro Native (Alpha)",
    id: "n2",
    priority: "High",
    size: "M",
    status: "Todo",
    title: "Pro badge on the Expo Go app",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    epic: "Pro Native (Alpha)",
    id: "n3",
    priority: "Medium",
    size: "M",
    status: "Todo",
    title: "FeedCarousel",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    epic: "Pro Native (Alpha)",
    id: "n4",
    priority: "Medium",
    size: "M",
    status: "Todo",
    title: "FlipCard",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    epic: "Pro Native (Alpha)",
    id: "n5",
    priority: "Medium",
    size: "M",
    status: "Todo",
    title: "NumberPad",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    epic: "Pro Native (Alpha)",
    id: "n6",
    priority: "Medium",
    size: "M",
    status: "Todo",
    title: "Phone Number Input",
  },
  {
    assignees: [notionAssignee("Maria")],
    categories: ["Mobile", "Block"],
    epic: "Pro Native (Alpha)",
    id: "n7",
    priority: "Medium",
    size: "M",
    status: "Todo",
    title: "Bottom Sheet Blocks",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    dueDate: "Mar 29, 2026",
    epic: "Pro Native (Alpha)",
    id: "n8",
    priority: "High",
    size: "L",
    status: "In Progress",
    title: "MorphButton",
  },
  {
    assignees: [notionAssignee("Sam")],
    categories: ["Mobile", "Block"],
    epic: "Pro Native (Alpha)",
    id: "n9",
    priority: "Low",
    size: "S",
    status: "In Progress",
    title: "Create Password",
  },
  {
    assignees: [notionAssignee("Sam"), notionAssignee("Jake")],
    categories: ["Mobile", "Block"],
    epic: "Pro Native (Alpha)",
    id: "n10",
    priority: "Low",
    size: "S",
    status: "In Progress",
    title: "OTP Verification",
  },
  {
    assignees: [notionAssignee("Sam")],
    categories: ["Mobile", "Block"],
    epic: "Pro Native (Alpha)",
    id: "n11",
    priority: "Low",
    size: "S",
    status: "In Progress",
    title: "Login / Sign up",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    dueDate: "Apr 5, 2026",
    epic: "Pro Native (Alpha)",
    id: "n12",
    priority: "High",
    size: "L",
    status: "To Document",
    title: "ProgressButton",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    dueDate: "Apr 5, 2026",
    epic: "Pro Native (Alpha)",
    id: "n13",
    priority: "High",
    size: "L",
    status: "To Document",
    title: "SlideButton",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    dueDate: "Apr 5, 2026",
    epic: "Pro Native (Alpha)",
    id: "n14",
    priority: "High",
    size: "M",
    status: "To Document",
    title: "NumberField",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    dueDate: "Apr 10, 2026",
    epic: "Pro Native (Alpha)",
    id: "n15",
    priority: "High",
    size: "L",
    status: "To Document",
    title: "RadioButtonGroup",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Launch", "New Component"],
    dueDate: "Apr 9, 2026",
    epic: "Pro Native (Alpha)",
    id: "n16",
    priority: "High",
    size: "XL",
    status: "To Document",
    title: "Calendar",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "Block"],
    dueDate: "Mar 29, 2026",
    epic: "Pro Native (Alpha)",
    id: "n17",
    priority: "Medium",
    size: "L",
    status: "To Document",
    title: "Multi Step Bottom Sheet",
  },
  {
    assignees: [notionAssignee("Diego")],
    categories: ["Mobile", "New Component"],
    epic: "Pro Native (Alpha)",
    id: "n18",
    priority: "Medium",
    size: "M",
    status: "To Document",
    title: "Stepper",
  },
  {
    assignees: [notionAssignee("Emily"), notionAssignee("Alex")],
    categories: ["Mobile"],
    dueDate: "Mar 10, 2026",
    epic: "Pro Native (Alpha)",
    id: "n19",
    priority: "High",
    size: "S",
    status: "Done",
    title: "Pre-release in-app message",
  },
  {
    assignees: [notionAssignee("Sam"), notionAssignee("Diego")],
    categories: ["Mobile", "Improvement"],
    epic: "Pro Native (Alpha)",
    id: "n20",
    priority: "Medium",
    size: "S",
    status: "Done",
    title: "OSS ↔ PRO Sync",
  },
];

const notionColumnStyles: Record<
  NotionStatus,
  {
    body: string;
    button: string;
    count: string;
    indicator: string;
    pill: string;
  }
> = {
  Done: {
    body: "bg-success/8",
    button: "text-success border-success/30 hover:bg-success/10",
    count: "text-success",
    indicator: "bg-success",
    pill: "bg-success/15",
  },
  "In Progress": {
    body: "bg-warning/8",
    button: "text-warning border-warning/30 hover:bg-warning/10",
    count: "text-warning",
    indicator: "bg-warning",
    pill: "bg-warning/15",
  },
  "To Document": {
    body: "bg-danger/8",
    button: "text-danger border-danger/30 hover:bg-danger/10",
    count: "text-danger",
    indicator: "bg-danger",
    pill: "bg-danger/15",
  },
  Todo: {
    body: "bg-accent/8",
    button: "text-accent border-accent/30 hover:bg-accent/10",
    count: "text-accent",
    indicator: "bg-accent",
    pill: "bg-accent/15",
  },
};

function NotionTaskCard({ task }: { task: NotionTask }) {
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
          className={`mt-1 size-2.5 shrink-0 rounded-sm ${task.priority === "High" ? "bg-danger" : task.priority === "Medium" ? "bg-warning" : "bg-success"}`}
        />
        <span className="text-foreground leading-snug font-semibold">
          {task.title}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip color={priorityColor} size="sm" variant="soft">
          {task.priority}
        </Chip>
        <Chip size="sm" variant="secondary">
          {task.size}
        </Chip>
        {task.assignees.map((person) => (
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
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted flex items-center gap-1 text-xs">
          <HugeiconsIcon
            aria-hidden
            className="text-warning size-3"
            icon={FlashIcon}
          />
          {task.epic}
        </span>
        {task.dueDate ? (
          <span className="text-muted flex shrink-0 items-center gap-1 text-xs">
            <HugeiconsIcon
              aria-hidden
              className="size-3"
              icon={Calendar03Icon}
            />
            {task.dueDate}
          </span>
        ) : null}
      </div>
      {task.categories.length ? (
        <div className="flex flex-wrap gap-1">
          {task.categories.map((category) => (
            <Chip key={category} size="sm" variant="secondary">
              {category}
            </Chip>
          ))}
        </div>
      ) : null}
    </>
  );
}

function NotionColumn({
  column,
  kanban,
}: {
  column: NotionStatus;
  kanban: UseKanbanReturn<NotionTask>;
}) {
  const { renderDropIndicator } = useKanbanDropIndicator({
    renderIndicator: (target) => <Kanban.DropIndicator target={target} />,
  });
  const { dragAndDropHooks, items } = useKanbanColumn(kanban, column, {
    renderDropIndicator,
  });
  const styles = notionColumnStyles[column];
  return (
    <Kanban.Column className="gap-0">
      <div className="bg-background sticky top-0 z-10 pt-2">
        <Kanban.ColumnHeader
          className={`rounded-t-[calc(var(--radius-2xl)_+_var(--radius-sm))] px-3 py-2.5 ${styles.body}`}
        >
          <span
            className={`flex items-center gap-2 rounded-[calc(var(--radius)*infinity)] px-3 py-1 ${styles.pill}`}
          >
            <Kanban.ColumnIndicator className={styles.indicator} />
            <Kanban.ColumnTitle>{column}</Kanban.ColumnTitle>
          </span>
          <Kanban.ColumnCount className={styles.count}>
            {items.length}
          </Kanban.ColumnCount>
          <Kanban.ColumnActions>
            <Button
              isIconOnly
              aria-label="Add task"
              className={styles.count}
              size="sm"
              variant="ghost"
            >
              <HugeiconsIcon icon={Add01Icon} />
            </Button>
            <Button
              isIconOnly
              aria-label="More options"
              className={styles.count}
              size="sm"
              variant="ghost"
            >
              <HugeiconsIcon icon={MoreHorizontalIcon} />
            </Button>
          </Kanban.ColumnActions>
        </Kanban.ColumnHeader>
      </div>
      <Kanban.ColumnBody className={`rounded-t-none ${styles.body}`}>
        <Kanban.CardList
          aria-label={column}
          className="pt-0 pb-2"
          dragAndDropHooks={dragAndDropHooks}
          items={items}
          renderEmptyState={() => "No tasks yet."}
        >
          {(task) => (
            <Kanban.Card textValue={task.title}>
              <NotionTaskCard task={task} />
            </Kanban.Card>
          )}
        </Kanban.CardList>
        <div className="p-2 pt-0">
          <Button fullWidth className={styles.button} variant="outline">
            <HugeiconsIcon icon={Add01Icon} />
            New task
          </Button>
        </div>
      </Kanban.ColumnBody>
    </Kanban.Column>
  );
}

function NotionBoardDemo() {
  const kanban = useKanban({
    getColumn: (task) => task.status,
    initialItems: notionTasks,
    setColumn: (task, status) => ({ ...task, status: status as NotionStatus }),
  });
  return (
    <div className="w-full pr-3">
      <Kanban
        className="items-start overflow-visible"
        hideScrollBar
        isEnabled={false}
      >
        {(["Todo", "In Progress", "To Document", "Done"] as const).map(
          (column) => (
            <NotionColumn column={column} kanban={kanban} key={column} />
          ),
        )}
      </Kanban>
    </div>
  );
}

export const DemoNotionBoardExample = () => <NotionBoardDemo />;
