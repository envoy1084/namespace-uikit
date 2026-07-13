"use client";

// @demo-title Grouped
import { ChatMessage, ChatTool, ChatToolGroup } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const DemoGroupedExample = () => (
  <Assistant>
    <ChatToolGroup defaultExpanded={false}>
      <ChatToolGroup.Trigger>2 tool calls</ChatToolGroup.Trigger>
      <ChatToolGroup.Content>
        {["searchDocs", "fetchPage"].map((toolName) => (
          <ChatTool
            defaultExpanded={false}
            key={toolName}
            state="output-available"
            toolName={toolName}
            triggerPrefix="Used tool: "
          />
        ))}
      </ChatToolGroup.Content>
    </ChatToolGroup>
  </Assistant>
);
