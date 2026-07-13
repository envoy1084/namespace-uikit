"use client";

// @demo-title Compact Log
import {
  CheckmarkCircle02Icon,
  CreditCardIcon,
  ReceiptTextIcon,
  SecurityWarningIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Timeline, type TimelineStatus } from "@thenamespace/uikit";

const TimelineGlyph = ({ icon }: { icon: IconSvgElement }) => (
  <HugeiconsIcon aria-hidden icon={icon} strokeWidth={2} />
);

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

export const DemoCompactLogExample = () => (
  <div className="box-border w-full max-w-[520px] min-w-0 px-2 sm:px-0">
    <Timeline density="compact" size="sm">
      {compact.map((item, index) => (
        <Timeline.Item
          align={item[3] ? "start" : "center"}
          key={item[0]}
          status={item[2] as TimelineStatus}
        >
          <Timeline.Marker>
            <TimelineGlyph
              icon={
                [
                  SecurityWarningIcon,
                  CreditCardIcon,
                  CheckmarkCircle02Icon,
                  ReceiptTextIcon,
                ][index]!
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
);
