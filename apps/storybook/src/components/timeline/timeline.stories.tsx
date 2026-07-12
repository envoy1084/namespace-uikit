import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "@iconify/react";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Card } from "@thenamespace/uikit/card";
import { Chip } from "@thenamespace/uikit/chip";
import { CloseButton } from "@thenamespace/uikit/close-button";
import { Link } from "@thenamespace/uikit/link";

import { Timeline, type TimelineStatus } from "./index";

const meta = {
  component: Timeline,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/Timeline",
} satisfies Meta<typeof Timeline>;
export default meta;
type Story = StoryObj<typeof meta>;

const icons = [
  "lucide:flag",
  "lucide:circle-check",
  "lucide:shield-alert",
  "lucide:megaphone",
  "lucide:clock",
  "lucide:badge-check",
];
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
export const Default: Story = {
  render: () => (
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
              <Icon icon={icons[index]} />
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
  ),
};

const milestones = [
  [
    "Private beta",
    "Jan 2026",
    "Research",
    "24 teams",
    "Invited design partners to stress-test billing, permissions, and reporting workflows.",
  ],
  [
    "Usage-based pricing",
    "Mar 2026",
    "Billing",
    "3 plans",
    "Metered plans went live for sandbox workspaces after invoice previews cleared review.",
  ],
  [
    "Regional launch",
    "May 2026",
    "Expansion",
    "2 regions",
    "Opened the EU data boundary with local support coverage and a launch brief.",
  ],
  [
    "Partner network",
    "Aug 2026",
    "Marketplace",
    "8 partners",
    "First integrations shipped with shared certification notes and co-marketing assets.",
  ],
  [
    "Enterprise controls",
    "Oct 2026",
    "Governance",
    "5 controls",
    "Audit logs, SSO handoff, and incident exports were bundled into the admin rollout.",
  ],
  [
    "Scale motion",
    "Dec 2026",
    "Adoption",
    "12 touchpoints",
    "Customer education, lifecycle emails, and release notes moved into one launch calendar.",
  ],
];
const MilestoneContent = ({ milestone }: { milestone: string[] }) => (
  <>
    <div className="flex flex-wrap items-center gap-2">
      <time className="text-muted text-xs leading-5">{milestone[1]}</time>
      <Chip size="sm" variant="soft">
        {milestone[2]}
      </Chip>
    </div>
    <h3 className="text-foreground m-0 text-sm leading-5 font-medium">
      {milestone[0]}
    </h3>
    <p className="text-muted m-0 text-xs leading-5">{milestone[4]}</p>
    <span className="text-muted text-xs leading-5">{milestone[3]}</span>
  </>
);
export const CenteredMilestones: Story = {
  render: () => (
    <div className="w-full max-w-[700px] min-w-0 py-4">
      <div className="mb-5 flex items-center justify-center gap-3">
        <div className="bg-separator h-px flex-1" />
        <Chip color="accent" size="sm" variant="soft">
          2026 expansion
        </Chip>
        <div className="bg-separator h-px flex-1" />
      </div>
      <div className="sm:hidden">
        <Timeline density="compact" size="sm">
          {milestones.map((milestone, index) => (
            <Timeline.Item key={milestone[0]}>
              <Timeline.Marker>
                <Icon icon={icons[index]} />
              </Timeline.Marker>
              <Timeline.Content className="gap-1.5">
                <MilestoneContent milestone={milestone} />
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
      <div className="hidden sm:block">
        <Timeline
          axis="center"
          itemAlign="center"
          placement="alternate"
          size="sm"
        >
          {milestones.map((milestone, index) => (
            <Timeline.Item key={milestone[0]}>
              <Timeline.Marker>
                <Icon icon={icons[index]} />
              </Timeline.Marker>
              <Timeline.Content className="max-w-[260px] gap-1.5">
                <MilestoneContent milestone={milestone} />
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  ),
};

const avatars = ["blue", "orange", "green", "blue"];
const studio = [
  ["Product asset uploaded", "Mina Sol", "10:18 AM", "current", "asset"],
  [
    "Lighting pass reviewed",
    "Orin Vale",
    "10:27 AM",
    "warning",
    "The side profile reads clearly on the landing page. Keep the outsole shadow soft so the sole texture stays visible.",
  ],
  [
    "Copy note resolved",
    "Paz Kim",
    "10:43 AM",
    "default",
    "Updated the launch tile copy and aligned the product badge with the approved campaign language.",
  ],
  [
    "Review package ready",
    "Mina Sol",
    "11:06 AM",
    "success",
    "Exported the square crop, PDP detail view, and marketplace thumbnail for final QA.",
  ],
];
export const StudioReview: Story = {
  render: () => (
    <div className="w-full max-w-[620px] min-w-0">
      <div className="mb-4">
        <p className="text-muted m-0 text-xs font-medium">Studio review</p>
        <h3 className="text-foreground m-0 text-base font-semibold">
          Runner launch assets
        </h3>
      </div>
      <Timeline density="compact" size="sm">
        {studio.map((item, index) => (
          <Timeline.Item
            align="center"
            key={item[0]}
            status={item[3] as TimelineStatus}
          >
            <Timeline.Marker className="size-6 overflow-hidden border-0 p-0 shadow-none">
              <Avatar className="size-full" size="sm">
                <Avatar.Image
                  alt=""
                  src={`https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/${avatars[index]}.jpg`}
                />
                <Avatar.Fallback>
                  {item[1]
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </Avatar.Fallback>
              </Avatar>
            </Timeline.Marker>
            <Timeline.Content className="gap-2">
              <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-foreground m-0 text-xs leading-5 font-medium">
                    {item[0]}
                  </h3>
                  {item[4] === "asset" ? (
                    <Chip color="accent" size="sm" variant="soft">
                      Review
                    </Chip>
                  ) : null}
                </div>
                <div className="text-muted flex gap-2 text-xs">
                  <span>{item[1]}</span>
                  <time>{item[2]}</time>
                </div>
              </div>
              {item[4] === "asset" ? (
                <Card
                  className="w-full overflow-hidden p-0"
                  variant="transparent"
                >
                  <div className="grid sm:grid-cols-[140px_minmax(0,1fr)]">
                    <img
                      alt="Side profile of the runner product asset"
                      className="aspect-[4/3] w-full object-cover"
                      src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/2.jpeg"
                    />
                    <div className="flex flex-col gap-3 p-3">
                      <p className="text-muted m-0 text-xs leading-5">
                        Final hero crop is ready for retouch review with the
                        side profile and marketplace thumbnail queued.
                      </p>
                      <Link className="text-xs" href="#">
                        Open board
                        <Link.Icon />
                      </Link>
                    </div>
                  </div>
                </Card>
              ) : (
                <p className="text-muted m-0 text-xs leading-5">{item[4]}</p>
              )}
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  ),
};

const compact = [
  [
    "Chargeback case opened",
    "Mar 6, 10:34 AM",
    "warning",
    "The customer disputed a renewal charge, and the finance team has seven days to submit evidence.",
  ],
  ["Payment captured", "Mar 6, 10:21 AM", "success", ""],
  ["Payment authorized", "Mar 6, 10:21 AM", "default", ""],
  ["Invoice generated", "Mar 6, 10:20 AM", "muted", ""],
];
export const CompactLog: Story = {
  render: () => (
    <div className="box-border w-full max-w-[520px] min-w-0 px-2 sm:px-0">
      <Timeline density="compact" size="sm">
        {compact.map((item, index) => (
          <Timeline.Item
            align={item[3] ? "start" : "center"}
            key={item[0]}
            status={item[2] as TimelineStatus}
          >
            <Timeline.Marker>
              <Icon
                icon={
                  [
                    "lucide:shield-alert",
                    "lucide:credit-card",
                    "lucide:circle-check",
                    "lucide:receipt",
                  ][index]
                }
              />
            </Timeline.Marker>
            <Timeline.Content className="gap-1">
              <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:justify-between">
                <h3 className="text-foreground m-0 text-xs font-medium">
                  {item[0]}
                </h3>
                <time className="text-muted shrink-0 text-xs">{item[1]}</time>
              </div>
              {item[3] ? (
                <p className="text-muted m-0 text-xs leading-snug">{item[3]}</p>
              ) : null}
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  ),
};

const incident = [
  ["Escalation acknowledged by Kaito Reed", "2:24 AM", "warning", "lucide:zap"],
  [
    "Incident channel joined by Mira Stone",
    "2:23 AM",
    "default",
    "lucide:user",
  ],
  ["Customer update sent to finance-ops", "2:21 AM", "default", "lucide:mail"],
  [
    "Mitigation deployed to export-worker-3",
    "2:18 AM",
    "success",
    "lucide:circle-check",
  ],
  ["Postmortem reminder scheduled", "2:14 AM", "muted", "lucide:clock"],
];
export const IncidentResponse: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-[720px] min-w-0">
      <div className="mb-5">
        <p className="text-muted m-0 text-xs font-medium">Incident response</p>
        <h3 className="text-foreground m-0 text-base font-semibold">
          Export queue degradation
        </h3>
      </div>
      <Timeline density="compact" size="sm">
        <Timeline.Item status="current">
          <Timeline.Marker>
            <Icon icon="lucide:message-circle" />
          </Timeline.Marker>
          <Timeline.Content className="gap-2.5">
            <div className="flex justify-between">
              <h3 className="text-foreground m-0 text-xs font-medium">
                Update from Nora Vazquez
              </h3>
              <time className="text-muted text-xs">2:28 AM</time>
            </div>
            <Card className="p-3" variant="transparent">
              <p className="text-foreground m-0 text-sm">
                Confirmed the delay is isolated to scheduled exports. API
                requests and dashboard reads are healthy while the backlog
                drains.
              </p>
            </Card>
          </Timeline.Content>
        </Timeline.Item>
        {incident.map((item) => (
          <Timeline.Item
            align="center"
            key={item[0]}
            status={item[2] as TimelineStatus}
          >
            <Timeline.Marker>
              <Icon icon={item[3]} />
            </Timeline.Marker>
            <Timeline.Content>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <p className="text-muted m-0 text-xs">{item[0]}</p>
                <time className="text-muted text-xs">{item[1]}</time>
              </div>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  ),
};

const revisions = [
  [
    "v8",
    "Prepared billing copy, tax preview states, and the final approval checklist.",
    "Maya Chen",
    "Current",
    "current",
  ],
  [
    "v7",
    "Published the pricing table refresh after support macros cleared review.",
    "Nora Vazquez",
    "May 22, 2026, 11:18 AM",
    "success",
  ],
  [
    "v6",
    "Added regional tax notes and restored the upgrade confirmation banner.",
    "Eli Wong",
    "May 21, 2026, 04:42 PM",
    "default",
  ],
  [
    "v5",
    "Reworked mobile spacing for plan cards and invoice preview rows.",
    "Maya Chen",
    "May 20, 2026, 09:06 AM",
    "muted",
  ],
  [
    "v4",
    "Imported partner terms and archived the legacy enterprise copy block.",
    "Nora Vazquez",
    "May 18, 2026, 02:31 PM",
    "muted",
  ],
  [
    "v3",
    "Captured the first internal draft from the launch planning workspace.",
    "Eli Wong",
    "May 16, 2026, 10:14 AM",
    "muted",
  ],
];
export const VersionHistory: Story = {
  render: () => (
    <Card className="w-full max-w-[420px] gap-0 overflow-hidden p-0">
      <Card.Header className="border-border flex-row items-center justify-between border-b px-5 py-4">
        <h3 className="text-foreground m-0 text-base font-semibold">
          Version history
        </h3>
        <CloseButton aria-label="Close revision history" />
      </Card.Header>
      <Card.Content className="px-5 py-4">
        <Timeline density="compact" size="sm">
          {revisions.map((item) => (
            <Timeline.Item key={item[0]} status={item[4] as TimelineStatus}>
              <Timeline.Marker />
              <Timeline.Content className="gap-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-foreground m-0 text-xs font-medium">
                    {item[0]}
                  </h4>
                  {item[0] === "v8" ? (
                    <Chip color="accent" size="sm" variant="soft">
                      Draft
                    </Chip>
                  ) : item[0] === "v7" ? (
                    <Chip color="success" size="sm" variant="soft">
                      Live
                    </Chip>
                  ) : null}
                </div>
                <p className="text-muted m-0 text-xs leading-5">{item[1]}</p>
                <div className="text-muted flex items-center gap-2 text-xs">
                  <Avatar className="size-4" size="sm">
                    <Avatar.Fallback>{item[2][0]}</Avatar.Fallback>
                  </Avatar>
                  <span>{item[2]}</span>
                  <span>-</span>
                  <time>{item[3]}</time>
                </div>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card.Content>
    </Card>
  ),
};

const activity = [
  [
    "Committed across 4 product workspaces",
    "Rina Sol",
    "success",
    "lucide:git-commit-horizontal",
  ],
  [
    "Merged a pull request in lumenforge/interface",
    "Theo Park",
    "current",
    "lucide:git-merge",
  ],
  [
    "Opened 31 issues across 3 workspaces",
    "Iris Moon",
    "warning",
    "lucide:circle-plus",
  ],
  [
    "Reviewed 51 pull requests in 4 workspaces",
    "Mara Voss",
    "default",
    "lucide:eye",
  ],
];
export const RepositoryActivity: Story = {
  render: () => (
    <div className="w-full max-w-[620px] min-w-0">
      <div className="mb-4 flex items-center gap-4">
        <h3 className="text-foreground m-0 text-sm font-semibold">May 2026</h3>
        <div className="bg-separator h-px flex-1" />
      </div>
      <Timeline size="sm">
        {activity.map((item, index) => (
          <Timeline.Item key={item[0]} status={item[2] as TimelineStatus}>
            <Timeline.Marker>
              <Icon icon={item[3]} />
            </Timeline.Marker>
            <Timeline.Content className="gap-2.5">
              <div>
                <h3 className="text-foreground m-0 text-sm font-medium">
                  {item[0]}
                </h3>
                <p className="text-muted m-0 text-xs">{item[1]}</p>
              </div>
              {index === 1 ? (
                <Card className="p-3">
                  <Card.Title>
                    Tighten keyboard states in reporting grids
                  </Card.Title>
                  <Card.Description>
                    Reworked focus rings, empty states, and column resize
                    handles for audit tables.
                  </Card.Description>
                </Card>
              ) : (
                <div className="grid gap-1">
                  {[
                    "lumenforge/interface",
                    "mistral-bench/checkout",
                    "pixelwell/cli",
                  ].map((repo) => (
                    <div className="flex gap-3" key={repo}>
                      <Link className="text-xs" href="#">
                        {repo}
                      </Link>
                      <span className="text-muted text-xs">
                        {index === 0 ? "126 commits" : "16 reviews"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  ),
};

const split = [
  [
    "Checkout language approved",
    "09:15",
    "Design",
    "Nina Park",
    "default",
    "Invoice copy, empty states, and seat-change messages passed the annotation review.",
  ],
  [
    "Upgrade holds confirmed",
    "10:40",
    "Risk",
    "Omar Lee",
    "warning",
    "Fraud review added a manual hold rule for high-value upgrades during the first rollout window.",
  ],
  [
    "Metrics dashboard connected",
    "12:05",
    "Data",
    "Maya Hart",
    "default",
    "Billing telemetry is flowing into the release dashboard with workspace and plan dimensions.",
  ],
  [
    "Customer messaging staged",
    "13:30",
    "Ops",
    "Priya Shah",
    "default",
    "Support macros, changelog copy, and escalation routing are scheduled for the release window.",
  ],
  [
    "Release checklist signed",
    "15:00",
    "Launch",
    "Eli Wong",
    "success",
    "The rollback owner, dashboard links, and launch channel are pinned for the final go-live check.",
  ],
];
export const SplitContent: Story = {
  render: () => (
    <div className="w-full max-w-[680px] min-w-0 py-4">
      <div className="mx-auto mb-5 text-center">
        <p className="text-muted m-0 text-xs font-medium">Launch review</p>
        <h3 className="text-foreground m-0 text-base font-semibold">
          Billing rollout
        </h3>
      </div>
      <Timeline axis="center" placement="end" size="sm">
        {split.map((item, index) => (
          <Timeline.Item key={item[0]} status={item[4] as TimelineStatus}>
            <Timeline.Content className="max-w-[180px] gap-1.5" side="start">
              <div className="flex items-center justify-end gap-2">
                <time className="text-foreground text-xs font-medium">
                  {item[1]}
                </time>
                <Chip size="sm" variant="soft">
                  {item[2]}
                </Chip>
              </div>
              <span className="text-muted text-xs">{item[3]}</span>
            </Timeline.Content>
            <Timeline.Marker>
              <Icon icon={icons[index]} />
            </Timeline.Marker>
            <Timeline.Content className="max-w-[320px] gap-2" side="end">
              <h3 className="text-foreground m-0 text-sm font-medium">
                {item[0]}
              </h3>
              <Card className="p-3" variant="transparent">
                <p className="text-muted m-0 text-xs leading-5">{item[5]}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted block text-[11px]">Checks</span>
                    <span className="text-foreground text-xs font-medium">
                      9/9
                    </span>
                  </div>
                  <div>
                    <span className="text-muted block text-[11px]">Window</span>
                    <span className="text-foreground text-xs font-medium">
                      15 min
                    </span>
                  </div>
                </div>
              </Card>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  ),
};
