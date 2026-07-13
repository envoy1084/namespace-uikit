"use client";

// @demo-title Compact
import { Comment01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChatListView } from "@thenamespace/uikit";

const chats = [
  {
    id: "1",
    preview: "Can you help me draft a launch checklist?",
    title: "Product launch planning",
    updatedAt: "2h ago",
  },
  {
    id: "2",
    preview: "Summarize the customer feedback from last week.",
    title: "Customer feedback review",
    updatedAt: "Yesterday",
  },
  {
    id: "3",
    preview: "Rewrite this paragraph to sound more concise.",
    title: "Copy editing help",
    updatedAt: "Mon",
  },
];

function CompactDemo() {
  return (
    <div className="w-[280px]">
      <ChatListView aria-label="Recent chats" density="compact" items={chats}>
        {(chat) => (
          <ChatListView.Item id={chat.id} textValue={chat.title}>
            <ChatListView.ItemContent>
              <ChatListView.Icon>
                <HugeiconsIcon icon={Comment01Icon} />
              </ChatListView.Icon>
              <ChatListView.Text>
                <ChatListView.Title>{chat.title}</ChatListView.Title>
                <ChatListView.Preview>{chat.preview}</ChatListView.Preview>
              </ChatListView.Text>
              <ChatListView.Meta>{chat.updatedAt}</ChatListView.Meta>
            </ChatListView.ItemContent>
          </ChatListView.Item>
        )}
      </ChatListView>
    </div>
  );
}

export const ProCompactExample = () => <CompactDemo />;
