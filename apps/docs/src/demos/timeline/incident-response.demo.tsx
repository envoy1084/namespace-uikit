"use client";

// @demo-title Incident Response
import {
  Attachment01Icon,
  BadgeCheckIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Flag02Icon,
  Mail01Icon,
  Megaphone02Icon,
  Message01Icon,
  SecurityWarningIcon,
  User02Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Timeline } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";
import { Card } from "@thenamespace/uikit/card";
import { Chip } from "@thenamespace/uikit/chip";
import { Input } from "@thenamespace/uikit/input";
import { Link } from "@thenamespace/uikit/link";

const TimelineGlyph = ({ icon }: { icon: IconSvgElement }) => (
  <HugeiconsIcon aria-hidden icon={icon} strokeWidth={2} />
);

const incidentAvatars = {
  blue: "/assets/avatars/blue.jpg",
  green: "/assets/avatars/green.jpg",
  orange: "/assets/avatars/orange.jpg",
};

const incident = [
  {
    actor: "Kaito Reed",
    avatar: incidentAvatars.orange,
    icon: ZapIcon,
    prefix: "Escalation acknowledged by",
    status: "warning",
    time: "2:24 AM",
  },
  {
    actor: "Mira Stone",
    avatar: incidentAvatars.green,
    icon: User02Icon,
    prefix: "Incident channel joined by",
    status: "default",
    time: "2:23 AM",
  },
  {
    icon: Mail01Icon,
    recipient: "finance-ops",
    status: "default",
    text: "Customer update sent to",
    time: "2:21 AM",
  },
  {
    icon: CheckmarkCircle02Icon,
    status: "success",
    target: "export-worker-3",
    text: "Mitigation deployed to",
    time: "2:18 AM",
  },
  {
    icon: Clock01Icon,
    status: "muted",
    text: "Postmortem reminder",
    time: "2:14 AM",
    trailingText: "scheduled",
  },
] as const;

const split = [
  {
    description: (
      <>
        Invoice copy, empty states, and seat-change messages passed the{" "}
        <Link className="text-xs" href="#">
          annotation review
        </Link>
        .
      </>
    ),
    icon: Flag02Icon,
    lane: "Design",
    laneColor: "default",
    metrics: [
      { label: "Screens", value: "18" },
      { label: "Open notes", value: "2" },
    ],
    owner: "Nina Park",
    status: "default",
    time: "09:15",
    title: "Checkout language approved",
  },
  {
    description:
      "Fraud review added a manual hold rule for high-value upgrades during the first rollout window.",
    icon: SecurityWarningIcon,
    lane: "Risk",
    laneColor: "warning",
    metrics: [
      { label: "Threshold", value: "$750" },
      { label: "Review SLA", value: "4 h" },
    ],
    owner: "Omar Lee",
    status: "warning",
    time: "10:40",
    title: "Upgrade holds confirmed",
  },
  {
    description:
      "Billing telemetry is flowing into the release dashboard with workspace and plan dimensions.",
    icon: CheckmarkCircle02Icon,
    lane: "Data",
    laneColor: "accent",
    metrics: [
      { label: "Events", value: "12" },
      { label: "Lag", value: "42 s" },
    ],
    owner: "Maya Hart",
    status: "default",
    time: "12:05",
    title: "Metrics dashboard connected",
  },
  {
    description:
      "Support macros, changelog copy, and escalation routing are scheduled for the release window.",
    icon: Megaphone02Icon,
    lane: "Ops",
    laneColor: "default",
    metrics: [
      { label: "Macros", value: "6" },
      { label: "Regions", value: "3" },
    ],
    owner: "Priya Shah",
    status: "default",
    time: "13:30",
    title: "Customer messaging staged",
  },
  {
    description:
      "The rollback owner, dashboard links, and launch channel are pinned for the final go-live check.",
    icon: BadgeCheckIcon,
    lane: "Launch",
    laneColor: "success",
    metrics: [
      { label: "Checks", value: "9/9" },
      { label: "Window", value: "15 min" },
    ],
    owner: "Eli Wong",
    status: "success",
    time: "15:00",
    title: "Release checklist signed",
  },
] as const;

export const DemoIncidentResponseExample = () => (
  <div className="mx-auto w-[calc(100%-2rem)] max-w-[720px] min-w-0 sm:w-full">
    <div className="mb-5">
      <p className="text-muted m-0 text-xs font-medium">Incident response</p>
      <h3 className="text-foreground m-0 text-base font-semibold">
        Export queue degradation
      </h3>
    </div>
    <Timeline density="compact" size="sm">
      <Timeline.Item align="center">
        <Timeline.Rail className="items-center">
          <Timeline.Marker
            aria-hidden="true"
            className="size-7 overflow-hidden border-0 p-0 shadow-none"
          >
            <Avatar className="size-full" size="lg">
              <Avatar.Image alt="Nora Vazquez" src={incidentAvatars.blue} />
              <Avatar.Fallback>NV</Avatar.Fallback>
            </Avatar>
          </Timeline.Marker>
          <Timeline.Connector className="top-[calc(50%+var(--spacing)*3.5)]" />
        </Timeline.Rail>
        <Timeline.Content>
          <div className="flex items-center gap-2 sm:gap-3">
            <Input
              aria-label="Add incident update"
              className="min-w-0 flex-1"
              defaultValue="Queue depth is falling after the worker pool restart."
              variant="secondary"
            />
            <Button className="shrink-0" size="sm" type="button">
              Post
            </Button>
          </div>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item status="current">
        <Timeline.Marker aria-hidden="true">
          <TimelineGlyph icon={Message01Icon} />
        </Timeline.Marker>
        <Timeline.Content className="gap-2.5">
          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="text-muted text-xs leading-5">Update from</span>
              <Avatar className="size-4" size="sm">
                <Avatar.Image alt="Nora Vazquez" src={incidentAvatars.blue} />
                <Avatar.Fallback>NV</Avatar.Fallback>
              </Avatar>
              <h3 className="text-foreground m-0 text-xs leading-5 font-medium">
                Nora Vazquez
              </h3>
              <Chip size="sm" variant="soft">
                On-call
              </Chip>
            </div>
            <time className="text-muted shrink-0 text-xs leading-5">
              2:28 AM
            </time>
          </div>
          <Card
            className="!border-border w-full !border !border-solid p-3"
            variant="transparent"
          >
            <p className="text-foreground m-0 text-sm leading-relaxed">
              Confirmed the delay is isolated to scheduled exports. API requests
              and dashboard reads are healthy while the backlog drains.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Chip size="sm" variant="secondary">
                <HugeiconsIcon aria-hidden icon={Attachment01Icon} width={12} />
                <Chip.Label>worker-trace.har - 42 KB</Chip.Label>
              </Chip>
              <Link className="text-xs" href="#">
                Open runbook
                <Link.Icon />
              </Link>
            </div>
          </Card>
        </Timeline.Content>
      </Timeline.Item>
      {incident.map((item) => (
        <Timeline.Item
          align="center"
          key={`${"prefix" in item ? item.prefix : item.text}-${item.time}`}
          status={item.status}
        >
          <Timeline.Marker aria-hidden="true">
            <TimelineGlyph icon={item.icon} />
          </Timeline.Marker>
          <Timeline.Content>
            <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="text-muted m-0 min-w-0 text-xs leading-5">
                {"actor" in item ? (
                  <>
                    {item.prefix}{" "}
                    <span className="inline-flex align-middle whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Avatar className="size-4" size="sm">
                          <Avatar.Image alt={item.actor} src={item.avatar} />
                          <Avatar.Fallback>
                            {item.actor
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </Avatar.Fallback>
                        </Avatar>
                        <span className="text-foreground font-medium">
                          {item.actor}
                        </span>
                      </span>
                    </span>
                  </>
                ) : "recipient" in item ? (
                  <>
                    {item.text}{" "}
                    <Link className="truncate text-xs" href="#">
                      {item.recipient}
                    </Link>
                  </>
                ) : "trailingText" in item ? (
                  <>
                    <span className="text-foreground font-medium">
                      {item.text}
                    </span>{" "}
                    {item.trailingText}
                  </>
                ) : "target" in item ? (
                  <>
                    {item.text}{" "}
                    <span className="text-foreground font-medium">
                      {item.target}
                    </span>
                  </>
                ) : null}
              </p>
              <time className="text-muted shrink-0 text-xs leading-5">
                {item.time}
              </time>
            </div>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  </div>
);
