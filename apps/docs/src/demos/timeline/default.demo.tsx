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

const icons = [
  Flag02Icon,
  CheckmarkCircle02Icon,
  SecurityWarningIcon,
  Megaphone02Icon,
  Clock01Icon,
  BadgeCheckIcon,
];

const TimelineGlyph = ({ icon }: { icon: IconSvgElement }) => (
  <HugeiconsIcon aria-hidden icon={icon} strokeWidth={2} />
);

const statuses: TimelineStatus[] = [
  "default",
  "current",
  "warning",
  "default",
  "muted",
  "success",
];

const rollout = [
  [
    "Feature flag created",
    "Created checkout-redesign for the billing workspace.",
    "Owner assigned",
    "09:12",
  ],
  [
    "Canary rollout started",
    "Enabled for 5% of workspaces with session replay sampling on.",
    "Canary",
    "09:34",
  ],
  [
    "Regional guardrail tripped",
    "Latency climbed in eu-central-1; rollout is holding while routing warms.",
    "Paused",
    "09:51",
  ],
  [
    "Customer messaging prepared",
    "Support macro and changelog draft are ready in Launch notes.",
    "Docs",
    "10:05",
  ],
  [
    "Launch window scheduled",
    "Full rollout waits for the next error-budget sweep.",
    "Queued",
    "10:30",
  ],
  [
    "Release checklist verified",
    "Rollback owner and dashboard checks are recorded in the release audit.",
    "Ready",
    "10:42",
  ],
];

export const DemoDefaultExample = () => (
  <div className="w-full max-w-[560px] min-w-0">
    <div className="mb-4">
      <p className="text-muted m-0 text-xs font-medium">Rollout audit</p>
      <h3 className="text-foreground m-0 text-base font-semibold">
        Checkout redesign
      </h3>
    </div>
    <Timeline density="compact" size="sm">
      {rollout.map(([title, description, label, time], index) => (
        <Timeline.Item align="center" key={title} status={statuses[index]}>
          <Timeline.Marker aria-hidden="true">
            <TimelineGlyph icon={icons[index]!} />
          </Timeline.Marker>
          <Timeline.Content>
            <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h3 className="text-foreground m-0 text-xs leading-5 font-medium">
                    {title}
                  </h3>
                  <Chip
                    color={
                      index === 1
                        ? "accent"
                        : index === 2
                          ? "warning"
                          : index === 5
                            ? "success"
                            : "default"
                    }
                    size="sm"
                    variant="soft"
                  >
                    {label}
                  </Chip>
                </div>
                <p className="text-muted m-0 mt-1 text-xs leading-5">
                  {description}
                </p>
              </div>
              <time className="text-muted shrink-0 text-xs leading-5">
                {time}
              </time>
            </div>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  </div>
);
