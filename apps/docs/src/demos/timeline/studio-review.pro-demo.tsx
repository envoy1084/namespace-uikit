"use client";

// @demo-title Studio Review
import {
  BadgeCheckIcon,
  CheckmarkCircle02Icon,
  Flag02Icon,
  Megaphone02Icon,
  SecurityWarningIcon,
} from "@hugeicons/core-free-icons";
import { Timeline, type TimelineStatus } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Card } from "@thenamespace/uikit/card";
import { Chip } from "@thenamespace/uikit/chip";
import { Link } from "@thenamespace/uikit/link";

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

export const ProStudioReviewExample = () => (
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
                src={`/assets/avatars/${avatars[index]}.jpg`}
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
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <h3 className="text-foreground m-0 text-xs leading-5 font-medium">
                  {item[0]}
                </h3>
                {item[4] === "asset" ? (
                  <Chip color="accent" size="sm" variant="soft">
                    Review
                  </Chip>
                ) : null}
              </div>
              <div className="text-muted flex shrink-0 items-center gap-2 text-xs leading-5">
                <span>{item[1]}</span>
                <time>{item[2]}</time>
              </div>
            </div>
            {item[4] === "asset" ? (
              <Card
                className="!border-border w-full overflow-hidden !border !border-solid p-0"
                variant="transparent"
              >
                <div className="grid min-w-0 gap-0 sm:grid-cols-[140px_minmax(0,1fr)]">
                  <img
                    alt="Side profile of the runner product asset"
                    className="aspect-[4/3] w-full object-cover select-none sm:aspect-auto sm:h-full"
                    draggable={false}
                    src="/assets/components-images/shoes/product-view/2.jpeg"
                  />
                  <div className="flex min-w-0 flex-col gap-3 p-3">
                    <p className="text-muted m-0 text-xs leading-5">
                      Final hero crop is ready for retouch review with the side
                      profile, lace detail, and marketplace thumbnail queued.
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip size="sm" variant="secondary">
                        PDP hero
                      </Chip>
                      <Chip size="sm" variant="secondary">
                        4 crops
                      </Chip>
                      <Link className="text-xs" href="#">
                        Open board
                        <Link.Icon />
                      </Link>
                    </div>
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
);
