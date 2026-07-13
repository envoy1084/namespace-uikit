"use client";

// @demo-title Streaming
import { ChatMessage, ChatTool } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const ProStreamingExample = () => (
  <Assistant>
    <ChatTool
      defaultExpanded
      argsText='{"query":"Namespace UIKit'
      state="input-streaming"
      toolName="searchDocs"
      triggerPrefix="Running tool: "
    />
  </Assistant>
);
