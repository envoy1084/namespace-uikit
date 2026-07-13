"use client";

// @demo-title Icon Expand
import { Segment } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

export const DemoIconExpandExample = () => (
  <Segment defaultSelectedKey="meetings" variant="ghost">
    {[
      { icon: "lucide:house", id: "home", label: "Home" },
      { icon: "lucide:message-circle", id: "chat", label: "Chat" },
      { icon: "lucide:video", id: "meetings", label: "Meetings" },
      { icon: "lucide:inbox", id: "inbox", label: "Inbox" },
    ].map((item) => (
      <Segment.Item
        className="w-auto"
        id={item.id}
        key={item.id}
        style={{ gap: 0 }}
      >
        {({ isSelected }) => (
          <>
            <Icon icon={item.icon} />
            <span
              className="inline-grid transition-all duration-200"
              style={{
                gridTemplateColumns: isSelected ? "1fr" : "0fr",
                minWidth: 0,
                opacity: isSelected ? 1 : 0,
              }}
            >
              <span
                className="overflow-hidden whitespace-nowrap transition-[padding] duration-200"
                style={{
                  minWidth: 0,
                  paddingInlineStart: isSelected ? ".375rem" : 0,
                }}
              >
                {item.label}
              </span>
            </span>
          </>
        )}
      </Segment.Item>
    ))}
  </Segment>
);
