"use client";

// @demo-title Version History
import { Timeline, type TimelineStatus } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Card } from "@thenamespace/uikit/card";
import { Chip } from "@thenamespace/uikit/chip";
import { CloseButton } from "@thenamespace/uikit/close-button";

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

const revisionAvatars: Record<string, string> = {
  "Eli Wong": "/assets/avatars/orange.jpg",
  "Maya Chen": "/assets/avatars/blue.jpg",
  "Nora Vazquez": "/assets/avatars/green.jpg",
};

export const ProVersionHistoryExample = () => (
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
              <div className="flex min-h-5 min-w-0 items-center gap-2">
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
              <div className="flex items-center gap-2">
                <Avatar className="size-4" size="sm">
                  <Avatar.Image alt={item[2]} src={revisionAvatars[item[2]]} />
                  <Avatar.Fallback>{item[2][0]}</Avatar.Fallback>
                </Avatar>
                <span className="text-muted text-xs leading-5">{item[2]}</span>
                <span className="text-muted text-xs leading-5">-</span>
                <time className="text-muted text-xs leading-5">{item[3]}</time>
              </div>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card.Content>
  </Card>
);
