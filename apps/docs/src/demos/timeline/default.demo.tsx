"use client";

// @demo-title Default
import { Timeline, type TimelineStatus } from "@thenamespace/uikit";
import { Chip } from "@thenamespace/uikit/chip";
import {
  BadgeCheckIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Flag02Icon,
  Megaphone02Icon,
  SecurityWarningIcon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon, type IconSvgElement } from "@thenamespace/uikit/icons";
import { Link } from "@thenamespace/uikit/link";

const TimelineGlyph = ({ icon }: { icon: IconSvgElement }) => (
  <HugeiconsIcon aria-hidden icon={icon} strokeWidth={2} />
);

const rollout = [
  {
    description: (
      <>
        Created <span className="text-foreground font-medium">checkout-redesign</span> for the
        billing workspace.
      </>
    ),
    icon: Flag02Icon,
    meta: "Owner assigned",
    metaColor: "default",
    status: "default",
    time: "09:12",
    title: "Feature flag created",
  },
  {
    description: (
      <>
        Enabled for <span className="text-foreground font-medium">5% of workspaces</span> with
        session replay sampling on.
      </>
    ),
    icon: CheckmarkCircle02Icon,
    meta: "Canary",
    metaColor: "accent",
    status: "current",
    time: "09:34",
    title: "Canary rollout started",
  },
  {
    description: (
      <>
        Latency climbed in <span className="text-foreground font-medium">eu-central-1</span>;
        rollout is holding while routing warms.
      </>
    ),
    icon: SecurityWarningIcon,
    meta: "Paused",
    metaColor: "warning",
    status: "warning",
    time: "09:51",
    title: "Regional guardrail tripped",
  },
  {
    description: (
      <>
        Support macro and changelog draft are ready in{" "}
        <Link className="text-xs" href="#">
          Launch notes
        </Link>
        .
      </>
    ),
    icon: Megaphone02Icon,
    meta: "Docs",
    metaColor: "default",
    status: "default",
    time: "10:05",
    title: "Customer messaging prepared",
  },
  {
    description: "Full rollout waits for the next error-budget sweep.",
    icon: Clock01Icon,
    meta: "Queued",
    metaColor: "default",
    status: "muted",
    time: "10:30",
    title: "Launch window scheduled",
  },
  {
    description: <>Rollback owner and dashboard checks are recorded in the release audit.</>,
    icon: BadgeCheckIcon,
    meta: "Ready",
    metaColor: "success",
    status: "success",
    time: "10:42",
    title: "Release checklist verified",
  },
] as const;

export const DemoDefaultExample = () => (
  <div className="w-full max-w-[560px] min-w-0">
    <div className="mb-4">
      <p className="text-muted m-0 text-xs font-medium">Rollout audit</p>
      <h3 className="text-foreground m-0 text-base font-semibold">Checkout redesign</h3>
    </div>
    <Timeline density="compact" size="sm">
      {rollout.map((item) => (
        <Timeline.Item align="center" key={item.title} status={item.status as TimelineStatus}>
          <Timeline.Marker aria-hidden="true">
            <TimelineGlyph icon={item.icon} />
          </Timeline.Marker>
          <Timeline.Content>
            <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h3 className="text-foreground m-0 text-xs leading-5 font-medium">
                    {item.title}
                  </h3>
                  <Chip color={item.metaColor} size="sm" variant="soft">
                    {item.meta}
                  </Chip>
                </div>
                <p className="text-muted m-0 mt-1 text-xs leading-5">{item.description}</p>
              </div>
              <time className="text-muted shrink-0 text-xs leading-5">{item.time}</time>
            </div>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  </div>
);
