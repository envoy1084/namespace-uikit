"use client";

// @demo-title Sizes
import type { FormEvent, ReactNode } from "react";
import { createContext, useContext, useRef, useState } from "react";

import {
  Kanban,
  useKanban,
  useKanbanColumn,
  useKanbanDropIndicator,
  type KanbanSize,
  type UseKanbanReturn,
} from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { Dropdown } from "@thenamespace/uikit/dropdown";
import { Header } from "@thenamespace/uikit/header";
import {
  Add01Icon,
  ArrowRight01Icon,
  Attachment01Icon,
  Comment01Icon,
  Delete02Icon,
  MoreHorizontalIcon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";
import { Input } from "@thenamespace/uikit/input";
import { Label } from "@thenamespace/uikit/label";
import { Modal } from "@thenamespace/uikit/modal";
import { ProgressBar } from "@thenamespace/uikit/progress-bar";
import { Separator } from "@thenamespace/uikit/separator";
import { TextArea } from "@thenamespace/uikit/textarea";
import { TextField } from "@thenamespace/uikit/textfield";

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
  Anna: "/assets/avatars/red.jpg",
  Dave: "/assets/avatars/orange.jpg",
  Lena: "/assets/avatars/green.jpg",
  Mike: "/assets/avatars/white.jpg",
  Nina: "/assets/avatars/black.jpg",
  Omar: "/assets/avatars/red.jpg",
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
    image: "/assets/docs/cherries.jpeg",
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
    image: "/assets/docs/oranges.jpeg",
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
    image: "/assets/docs/robot1.jpeg",
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

let nextTicketId = 100;

const AddTaskContext = createContext({ open: () => {} });

function AddTaskProvider({
  children,
  column,
  kanban,
}: {
  children: ReactNode;
  column: Ticket["status"];
  kanban: UseKanbanReturn<Ticket>;
}) {
  const [isOpen, setOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const title = titleRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();
    if (!title) return;
    kanban.addItem({
      description: description ?? "",
      id: String(++nextTicketId),
      status: column,
      title,
    });
    setOpen(false);
  };
  return (
    <AddTaskContext value={{ open: () => setOpen(true) }}>
      {children}
      <Modal>
        <Modal.Backdrop isOpen={isOpen} onOpenChange={setOpen}>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[380px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Add task to {column}</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="flex flex-col gap-4 overflow-visible">
                <form
                  className="flex flex-col gap-4"
                  id="add-task-form"
                  onSubmit={submit}
                >
                  <TextField autoFocus name="title" variant="secondary">
                    <Label>Title</Label>
                    <Input ref={titleRef} placeholder="Task title" />
                  </TextField>
                  <TextField name="description" variant="secondary">
                    <Label>Description</Label>
                    <TextArea
                      ref={descriptionRef}
                      placeholder="Brief description"
                      rows={3}
                    />
                  </TextField>
                </form>
              </Modal.Body>
              <Modal.Footer className="gap-2">
                <Button slot="close" variant="ghost">
                  Cancel
                </Button>
                <Button form="add-task-form" type="submit">
                  Add task
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </AddTaskContext>
  );
}

const ticketColumns = ["Open", "In Progress", "Closed"] as const;

function ColumnOptions({
  column,
  kanban,
}: {
  column: Ticket["status"];
  kanban: UseKanbanReturn<Ticket>;
}) {
  const otherColumns = ticketColumns.filter((value) => value !== column);
  const columnItems = kanban.list.items.filter(
    (ticket) => ticket.status === column,
  );
  return (
    <Dropdown>
      <Button isIconOnly aria-label="More options" size="sm" variant="ghost">
        <HugeiconsIcon icon={MoreHorizontalIcon} />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Section>
            <Header>Column</Header>
            <Dropdown.Item
              textValue="Clear column"
              onAction={() => {
                for (const ticket of columnItems) kanban.removeItem(ticket.id);
              }}
            >
              <HugeiconsIcon className="text-danger" icon={Delete02Icon} />
              <Label className="text-danger">Clear all tasks</Label>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Move all to</Header>
            {otherColumns.map((destination) => (
              <Dropdown.Item
                key={destination}
                textValue={`Move all to ${destination}`}
                onAction={() => {
                  for (const ticket of columnItems)
                    kanban.moveItem(ticket.id, destination);
                }}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} />
                <Label>{destination}</Label>
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
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

function SizedTicketColumn({
  column,
  kanban,
}: {
  column: "In Progress" | "Open";
  kanban: UseKanbanReturn<Ticket>;
}) {
  const { open } = useContext(AddTaskContext);
  const { renderDropIndicator } = useKanbanDropIndicator({
    renderIndicator: (target) => <Kanban.DropIndicator target={target} />,
  });
  const { dragAndDropHooks, items } = useKanbanColumn(kanban, column, {
    renderDropIndicator,
  });
  return (
    <Kanban.Column>
      <Kanban.ColumnHeader>
        <Kanban.ColumnIndicator
          className={column === "Open" ? "bg-success" : "bg-warning"}
        />
        <Kanban.ColumnTitle>{column}</Kanban.ColumnTitle>
        <Kanban.ColumnCount>{items.length}</Kanban.ColumnCount>
        <Kanban.ColumnActions>
          <Button
            isIconOnly
            aria-label="Add task"
            size="sm"
            variant="ghost"
            onPress={open}
          >
            <HugeiconsIcon icon={Add01Icon} />
          </Button>
          <ColumnOptions column={column} kanban={kanban} />
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
          <Button fullWidth variant="outline" onPress={open}>
            <HugeiconsIcon icon={Add01Icon} />
            Add a task
          </Button>
        </div>
      </Kanban.ColumnBody>
    </Kanban.Column>
  );
}

function SizedBoard({ size }: { size: KanbanSize }) {
  const kanban = useKanban({
    getColumn: (ticket) => ticket.status,
    initialItems: tickets.slice(0, 5),
    setColumn: (ticket, status) => ({
      ...ticket,
      status: status as Ticket["status"],
    }),
  });
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted text-xs font-medium">{size}</span>
      <Kanban size={size}>
        {(["Open", "In Progress"] as const).map((column) => (
          <AddTaskProvider column={column} kanban={kanban} key={column}>
            <SizedTicketColumn column={column} kanban={kanban} />
          </AddTaskProvider>
        ))}
      </Kanban>
    </div>
  );
}

export const DemoSizesExample = () => (
  <div className="flex flex-col gap-10">
    {(["sm", "md", "lg"] as const).map((size) => (
      <SizedBoard key={size} size={size} />
    ))}
  </div>
);
